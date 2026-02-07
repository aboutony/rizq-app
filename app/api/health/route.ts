export async function GET() {
  return Response.json({
    has_RIZQ_DB_URL: !!process.env.RIZQ_DB_URL,
    has_SUPABASE_POSTGRES_URL: !!process.env.SUPABASE_POSTGRES_URL,
    has_DATABASE_URL: !!process.env.DATABASE_URL,
  });
}
