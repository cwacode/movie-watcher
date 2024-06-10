import express, { Request, Response, Router } from 'express';
import { Client } from 'pg';

const router: Router = express.Router();
const client = new Client({
    connectionString: process.env.PGURI
});
client.connect();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await client.query('SELECT id, username, password FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };
    try {
        const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

export default router;
