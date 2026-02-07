import { Pool } from 'pg';

let pool: Pool;

const connectionString =
  process.env.SUPABASE_POSTGRES_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Missing database connection string');
}

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString,
  });
} else {
  if (!global._pgPool) {
    global._pgPool = new Pool({
      connectionString,
    });
  }
  pool = global._pgPool;
}

export default pool;
