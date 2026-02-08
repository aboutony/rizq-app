import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { phone, role, vertical } = await request.json();

    if (!phone || !role || !vertical) {
      return NextResponse.json({ message: 'phone, role, and vertical are required' }, { status: 400 });
    }

    if (!['tutor', 'student'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO user_profiles (phone, role, vertical)
         VALUES ($1, $2, $3)
         ON CONFLICT (phone) DO UPDATE SET role = $2, vertical = $3`,
        [phone, role, vertical]
      );

      return NextResponse.json({ role, vertical }, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Profile Role Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
