import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import * as jose from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ message: 'Phone and code are required' }, { status: 400 });
    }

    const MOCK_OTP = '123456';
    if (code !== MOCK_OTP) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 401 });
    }

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT id FROM tutors WHERE phone = $1', [phone]);

      if (result.rows.length === 0) {
return NextResponse.json({ message: 'Tutor not found' }, { status: 404 });
      }

      const tutor = result.rows[0];

      // Ensure a profile exists
      await client.query(
        `INSERT INTO user_profiles (phone, role, vertical, tutor_id)
         VALUES ($1, 'tutor', 'education', $2)
         ON CONFLICT (phone) DO NOTHING`,
        [phone, tutor.id]
      );

      const profileRes = await client.query(
        'SELECT role, vertical FROM user_profiles WHERE phone = $1',
        [phone]
      );

      const profile = profileRes.rows[0] || { role: 'tutor', vertical: 'education' };

      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-for-dev');
      const alg = 'HS256';

      const token = await new jose.SignJWT({ tutorId: tutor.id })
        .setProtectedHeader({ alg })
        .setExpirationTime('24h')
        .setIssuedAt()
        .sign(secret);

      cookies().set('rizq_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      return NextResponse.json({
        message: 'Login successful',
        role: profile.role,
        vertical: profile.vertical
      }, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('OTP Verify Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
