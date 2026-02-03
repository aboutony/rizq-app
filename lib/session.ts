
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function getTutorIdFromSession(): Promise<string | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('rizq_session')?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-for-dev');
    const { payload } = await jose.jwtVerify(token, secret);
    
    if (typeof payload.tutorId === 'string') {
      return payload.tutorId;
    }
    return null;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}
