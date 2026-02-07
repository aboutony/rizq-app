import { Pool } from 'pg';

const connectionString = process.env.RIZQ_DB_URL;

if (!connectionString) {
  throw new Error('Missing RIZQ_DB_URL');
}

const pool = new Pool({ connectionString });

export default pool;
