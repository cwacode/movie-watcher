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

export default router;
