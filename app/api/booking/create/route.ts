import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  const form = await request.formData();
  const locale = String(form.get('locale') || 'en');
  const tutor_id = String(form.get('tutor_id') || '');
  const student_name = String(form.get('student_name') || 'Demo Student');
  const date = String(form.get('date') || '');
  const time = String(form.get('time') || '16:00');

  if (!tutor_id || !date) {
    return NextResponse.redirect(new URL(`/${locale}/education/calendar`, request.url));
  }

  const client = await pool.connect();
  try {
    // ensure lesson type exists (create if missing)
    let lessonTypeId: string | null = null;

    const lt = await client.query(
      `select id from lesson_types where tutor_id = $1 and active = true limit 1`,
      [tutor_id]
    );
    if (lt.rows.length > 0) {
      lessonTypeId = lt.rows[0].id;
    } else {
const createLt = await client.query(
        `insert into lesson_types (tutor_id, category, label, active)
         values ($1, 'academic', 'General Lesson', true)
         returning id`,
        [tutor_id]
      );
      lessonTypeId = createLt.rows[0].id;

      await client.query(
        `insert into lesson_pricing (lesson_type_id, duration_minutes, price_amount, currency, active)
         values ($1, 60, 45.00, 'USD', true)`,
        [lessonTypeId]
      );
    }

    const requested_at_utc = new Date(`${date}T${time}:00.000Z`);

    await client.query(
      `insert into lessons
       (tutor_id, lesson_type_id, student_name, duration_minutes, price_amount, status, requested_start_at_utc)
       values ($1, $2, $3, 60, 45.00, 'requested', $4)`,
      [tutor_id, lessonTypeId, student_name, requested_at_utc]
    );

    await client.query(
      `insert into lesson_payments (lesson_id, payment_status)
       select id, 'unpaid' from lessons
       where tutor_id = $1
       order by created_at desc
       limit 1`,
      [tutor_id]
    );

  } finally {
    client.release();
  }

  return NextResponse.redirect(new URL(`/${locale}/education/booking/status`, request.url));
}
