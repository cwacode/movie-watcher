import express, { Request, Response, Router } from 'express';
import pg from 'pg';
const { Client } = pg;


interface User {
    username: string;
    password: string;
}

const router: Router = express.Router();
const client = new Client({
    connectionString: 'postgres://postgres:yupter@localhost:5432/postgres'
});

client.connect();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body as User;
    try {
        const existsQuery = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existsQuery.rowCount && existsQuery.rowCount > 0) {
            return res.status(409).json({ message: 'Username already taken' });
        }
        const insertQuery = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return res.status(201).json(insertQuery.rows[0]);
    } catch (error: unknown) { 
        if (error instanceof Error) { 
    } catch (error: unknown) { 
        if (error instanceof Error) { 
            console.error('Registration error:', error);
            return res.status(500).json({ message: 'Registration failed', error: error.message });
        } else {
            console.error('Unexpected type of error:', error);
            return res.status(500).json({ message: 'Registration failed', error: 'Unknown error' });
        }
    }
});




router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body as User;
    try {
        const loginQuery = await client.query('SELECT user_id, username FROM users WHERE username = $1 AND password = $2', [username, password]);
        const loginQuery = await client.query('SELECT user_id, username FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (loginQuery.rows.length > 0) {
            const user = loginQuery.rows[0];
            res.json({
                message: "Login successful",
                userId: user.user_id,
                username: user.username 
            });
            const user = loginQuery.rows[0];
            res.json({
                message: "Login successful",
                userId: user.user_id,
                username: user.username 
            });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login failed');
    }
});

export default router;