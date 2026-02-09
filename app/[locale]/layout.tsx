import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = ['en', 'ar', 'fr'].includes(params?.locale || '')
    ? (params.locale as string)
    : 'en';

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
