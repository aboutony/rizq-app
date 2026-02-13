import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const locale = String(form.get('locale') || 'en');
  const notes = String(form.get('homework_notes') || '');
  const homework = String(form.get('homework_text') || '');

  const client = await pool.connect();
  try {
    // Update the latest lesson for demo tutor
    await client.query(
      `UPDATE lessons
       SET homework_notes = $1, homework_text = $2
       WHERE tutor_id = $3
       ORDER BY created_at DESC
       LIMIT 1`,
      [notes, homework, 'c2f8242e-34d2-4402-9d30-76d546120731']
    );
  } finally {
    client.release();
  }

  return NextResponse.redirect(new URL(`/${locale}/education/tutor/dashboard`, req.url));
}
