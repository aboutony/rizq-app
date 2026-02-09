import { getRequestConfig } from 'next-intl/server';

const SUPPORTED = ['en', 'ar', 'fr'];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) || 'en';

  // Hard fallback if anything unexpected happens
  if (!SUPPORTED.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
