import pool from '@/lib/db';

export async function GET() {
  try {
    const db = await pool.query(`
      SELECT
        current_database() AS db,
        current_user AS user,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') AS tables
    `);
    return Response.json({ ok: true, ...db.rows[0] });
  } catch (e: any) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}
