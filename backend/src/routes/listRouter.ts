import express, { Request, Response, Router } from 'express';
import pg from 'pg';
const { Client } = pg;


const router: Router = express.Router();
const client = new Client({
    connectionString: 'postgres://postgres:yupter@localhost:5432/postgres'
});
client.connect();


router.get('/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const { rows } = await client.query(
            'SELECT m.* FROM movies m JOIN user_movies um ON m.movie_id = um.movie_id WHERE um.user_id = $1',
            [userId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching user movies:', error);
        res.status(500).send('Server error');
    }
});



router.post('/:userId', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { movieId } = req.body as { movieId: number };
    if (isNaN(userId) || isNaN(movieId)) {
        return res.status(400).send('Invalid user ID or movie ID');
    }
    try {
        const result = await client.query(
            'INSERT INTO user_movies (user_id, movie_id) VALUES ($1, $2) RETURNING *',
            [userId, movieId] 
        );
        if (result.rowCount && result.rowCount > 0) {
            res.status(201).json(result.rows[0]);
        } else {
            res.status(404).send('Failed to add movie to user list');
        }
    } catch (error) {
        console.error('Error adding movie to user list:', error);
        res.status(500).send('Server error');
    }
});

router.delete('/:userId/:movieId', async (req: Request, res: Response) => {
    const { userId, movieId } = req.params;
    try {
        const result = await client.query(
            'DELETE FROM user_movies WHERE user_id = $1 AND movie_id = $2 RETURNING *',
            [parseInt(userId), parseInt(movieId)]
        );
        if (result.rows.length) {
            res.status(200).json({ message: "Movie removed from list successfully.", deletedMovie: result.rows[0] });
        } else {
            res.status(404).send('Movie not found in user list.');
        }
    } catch (error) {
        console.error('Error removing movie from user list:', error);
        res.status(500).send('Server error');
    }
});

export default router;