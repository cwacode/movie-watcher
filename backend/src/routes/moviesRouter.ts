import express, { Request, Response, Router } from 'express';
import client from '../database.js';

const router: Router = express.Router();

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
