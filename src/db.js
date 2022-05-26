import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
})

export default db

/*const user = 'postgres';
const password = '99409879cel';
const host = 'localhost';
const port = 5432;
const database = 'boardcamp';

const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});*/