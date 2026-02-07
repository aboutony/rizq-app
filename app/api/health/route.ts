import pool from '@/lib/db';

export async function GET() {
  const source =
    process.env.SUPABASE_POSTGRES_URL
      ? 'SUPABASE_POSTGRES_URL'
      : process.env.POSTGRES_URL
      ? 'POSTGRES_URL'
      : 'none';

  try {
    const db = await pool.query(`
      SELECT
        current_database() AS db,
        current_user AS user,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') AS tables
    `);
    return Response.json({ ok: true, source, ...db.rows[0] });
  } catch (e: any) {
    return Response.json({ ok: false, source, error: e.message }, { status: 500 });
  }
}
