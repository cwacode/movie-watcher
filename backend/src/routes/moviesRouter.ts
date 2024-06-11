import express, { Request, Response, Router } from 'express';
import pg from 'pg';
const { Client } = pg;


const router: Router = express.Router();
const client = new Client({
    connectionString: 'postgres://postgres:yupter@localhost:5432/postgres'
});
client.connect();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await client.query('SELECT * FROM movies');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        console.error('Error fetching movies:', error);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { name, year, genre } = req.body as { name: string; year: number; genre: string };
    const { name, year, genre } = req.body as { name: string; year: number; genre: string };
    try {
        const result = await client.query('INSERT INTO movies (name, year, genre) VALUES ($1, $2, $3) RETURNING *', [name, year, genre]);
        const result = await client.query('INSERT INTO movies (name, year, genre) VALUES ($1, $2, $3) RETURNING *', [name, year, genre]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating movie:', error);
        console.error('Error creating movie:', error);
        res.status(500).send('Server error');
    }
});
export default router;
