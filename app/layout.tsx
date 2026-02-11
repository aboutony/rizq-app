import '../theme.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  try {
    const key = 'rizq-theme';
    const stored = localStorage.getItem(key);
    if (stored) document.documentElement.setAttribute('data-theme', stored);
  } catch (e) {}
})();
            `
          }}
        />
      </head>
      <body className="antialiased">
        <button id="theme-toggle" className="theme-toggle" aria-label="Toggle theme">🌙</button>
        {children}
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
