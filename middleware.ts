import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'fr'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (internal files)
    // - Static files (e.g. .svg, .jpg, .png)
    '/((?!api|_next|.*\\..*).*)',
    // Match all pathnames within locales
    '/(ar|en|fr)/:path*'
  ]
};
