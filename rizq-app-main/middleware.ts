import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  matcher: [
    // Skip all internal files and static assets
    // NOTE: use .+ to avoid matching the root path “/” so we can show the language picker
    '/((?!api|_next|.*\\..*).+)',
    // Optional: Only run on these locales
    '/(ar|en|fr)/:path*'
  ]
};
