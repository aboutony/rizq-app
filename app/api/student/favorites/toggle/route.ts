import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  const form = await req.formData();
  const tutorId = String(form.get('tutor_id') || '');
  const action = String(form.get('action') || 'add');
  const redirect = String(form.get('redirect') || '/');
  const studentId = 'demo-student';

  if (!tutorId) {
    return NextResponse.redirect(new URL(redirect, req.url));
  }

  const client = await pool.connect();
  try {
    if (action === 'remove') {
      await client.query(
        `DELETE FROM student_favorites WHERE student_id = $1 AND tutor_profile_id = $2`,
        [studentId, tutorId]
      );
    } else {
      await client.query(
        `INSERT INTO student_favorites (student_id, tutor_profile_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [studentId, tutorId]
      );
    }
  } finally {
    client.release();
  }

  const safeRedirect = redirect.startsWith('/') ? redirect : '/';
  return NextResponse.redirect(new URL(safeRedirect, req.url));
}
