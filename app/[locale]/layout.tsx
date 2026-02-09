import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../../theme.css';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locales = ['en', 'ar', 'fr'];
  if (!locales.includes(locale)) {
    notFound();
  }

  // ✅ Required by next-intl (fixes blank screen)
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased bg-slate-50 text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <main className="min-h-screen">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
