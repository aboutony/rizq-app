import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let phone = '';
    let role = '';
    let vertical = 'education';
    let locale = 'en';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      phone = body.phone || '';
      role = body.role || '';
      vertical = body.vertical || 'education';
      locale = body.locale || 'en';
    } else {
      const form = await request.formData();
      phone = (form.get('phone') || '').toString();
      role = (form.get('role') || '').toString();
      vertical = (form.get('vertical') || 'education').toString();
      locale = (form.get('locale') || 'en').toString();
    }

    if (!phone || !role) {
      return NextResponse.json({ message: 'Phone and role are required' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO user_profiles (phone, role, vertical)
         VALUES ($1, $2, $3)
         ON CONFLICT (phone) DO UPDATE SET role = EXCLUDED.role, vertical = EXCLUDED.vertical`,
        [phone, role, vertical]
      );
    } finally {
      client.release();
    }

    // Redirect to dashboard (form flow)
    return NextResponse.redirect(new URL(`/${locale}/${vertical}/${role}/dashboard`, request.url));
  } catch (error) {
    console.error('Role set error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
