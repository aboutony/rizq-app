import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intl = createMiddleware({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  // Allow root path to show the language selector
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  return intl(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/(ar|en|fr)/:path*'
  ]
};
