import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRouter.js';
import moviesRouter from './src/routes/moviesRouter.js';
import listRouter from './src/routes/listRouter.js';
dotenv.config();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/auth', authRouter);
app.use('/api/list', listRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
