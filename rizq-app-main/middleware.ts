import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/(ar|en|fr)/:path*'
  ]
};
