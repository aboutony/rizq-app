import '../theme.css';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`
(() => {
  try {
    const key = 'rizq-theme';
    const stored = localStorage.getItem(key);
    if (stored) document.documentElement.setAttribute('data-theme', stored);
  } catch (e) {}
})();
        `}</Script>
      </head>
      <body className="antialiased">
        <button id="theme-toggle" className="theme-toggle" aria-label="Toggle theme">🌙</button>
        {children}
        <Script id="theme-toggle-script">{`
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
        `}</Script>
      </body>
    </html>
  );
}
