import './theme.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const script = `
    (function () {
      const root = document.documentElement;
      const stored = localStorage.getItem('theme');
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (prefers ? 'dark' : 'light');
      root.dataset.theme = theme;

      const btn = document.getElementById('theme-toggle');
      if (btn) {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.onclick = function () {
          const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
          root.dataset.theme = next;
          localStorage.setItem('theme', next);
          btn.textContent = next === 'dark' ? '☀️' : '🌙';
        };
      }
    })();
  `;

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <button id="theme-toggle">🌙</button>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}
