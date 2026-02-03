
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('rizq_session');
  const { pathname } = request.nextUrl;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/tutor/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-for-dev');
    await jose.jwtVerify(sessionCookie.value, secret);
    return NextResponse.next();
  } catch (err) {
    // Token is invalid, redirect to login
    const response = NextResponse.redirect(new URL('/tutor/login', request.url));
    // Clear the invalid cookie
    response.cookies.delete('rizq_session');
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/tutor/dashboard/:path*', '/tutor/setup/:path*', '/tutor/reschedules/:path*', '/tutor/log/:path*'],
};
