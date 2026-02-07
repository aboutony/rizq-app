import { Pool } from 'pg';

const connectionString =
  process.env.RIZQ_DB_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing database connection string');
}

const pool = new Pool({ connectionString });

export default pool;
