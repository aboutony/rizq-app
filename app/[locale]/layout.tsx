import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../../theme.css";

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

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <main className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </main>
    </NextIntlClientProvider>
  );
}
