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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <button id="theme-toggle" className="theme-toggle" aria-label="Toggle theme">🌙</button>
        <NextIntlClientProvider messages={messages}>
          <main className="min-h-screen">
            {children}
          </main>
        </NextIntlClientProvider>

        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  const root = document.documentElement;
  const key = 'rizq-theme';
  const stored = localStorage.getItem(key);
  if (stored) root.setAttribute('data-theme', stored);
  const btn = document.getElementById('theme-toggle');

  const setIcon = () => {
    const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (btn) btn.textContent = cur === 'dark' ? '☀️' : '🌙';
  };

  setIcon();

  btn && btn.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(key, next);
    setIcon();
  });
})();
            `
          }}
        />
      </body>
    </html>
  );
}
