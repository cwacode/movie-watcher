import express, { Request, Response, Router } from 'express';
import pg from 'pg';
import { User } from '../types';

const { Client } = pg;

const router: Router = express.Router();
const client = new Client({
    connectionString: 'postgres://postgres:yupter@localhost:5432/postgres'
});
client.connect();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await client.query('SELECT user_id, username, password FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body as User;
    try {
        const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json(result.rows[0]);
        console.log('User Added')
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

export default router;
