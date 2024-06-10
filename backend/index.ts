import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg';
import authRouter from './src/routes/authRouter';
import usersRouter from './src/routes/usersRouter';
import moviesRouter from './src/routes/moviesRouter';



const connectionString = process.env.PGURI;
if (!connectionString) {
    throw new Error("Database connection string 'PGURI' is missing in .env file");
}

const client = new Client({
    connectionString: connectionString
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

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/auth', authRouter);


app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
