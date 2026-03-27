import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool, Client } = pg

export const client = new Pool()

client.query('SELECT NOW()', (err, res) => {
   if (err) {
    console.error('DB connection failed', err);
  } else {
    console.log('DB connected successfully');
  }
});
