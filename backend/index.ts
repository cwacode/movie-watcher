import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRouter.js';
import usersRouter from './src/routes/usersRouter.js';
import moviesRouter from './src/routes/moviesRouter.js';
import listRouter from './src/routes/listRouter.js';
import pg from 'pg';
dotenv.config();

const { Client } = pg;

const client = new Client({
    connectionString: 'postgres://postgres:yupter@localhost:5432/postgres'
});

client.connect()
    .then(() => {
        console.log('Connected successfully to PostgreSQL database');
        console.log(`Connected to database: ${client.database}`);
        console.log(`Using user: ${client.user}`);
        console.log(`Host: ${client.host}`);
        console.log(`Port: ${client.port}`);
    })
    .catch(e => console.error('Failed to connect to PostgreSQL database', e));

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/auth', authRouter);
app.use('/api/list', listRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
