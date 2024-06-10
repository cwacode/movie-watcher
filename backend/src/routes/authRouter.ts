import { Router, Request, Response } from 'express';
import { Client } from 'pg';

interface User {
    username: string;
    password: string;
}

const router = Router();
const client = new Client({
    connectionString: process.env.PGURI
});

client.connect();

// Register User
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body as User;
    try {
        // Check if the user already exists
        const existsQuery = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existsQuery.rowCount && existsQuery.rowCount > 0) {
            return res.status(409).send('Username already taken');
        }

        // Insert new user if not exists
        const insertQuery = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json(insertQuery.rows[0]);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Registration failed');
    }
});

// Login User
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body as User;
    try {
        const loginQuery = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (loginQuery.rows.length > 0) {
            res.json({ message: "Login successful", user: loginQuery.rows[0] });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login failed');
    }
});

export default router;
