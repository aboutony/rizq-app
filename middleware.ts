import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  matcher: [
    // Skip all internal files and static assets
    '/((?!api|_next|.*\\..*).*)',
    // Optional: Only run on these locales
    '/(ar|en|fr)/:path*'
  ]
};
