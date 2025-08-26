import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_PG_HOST,
    port: process.env.DB_PG_PORT ? parseInt(process.env.DB_PG_PORT, 10) : 5432,
    database: process.env.DB_PG_DATABASE,
    user: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

export default pool;