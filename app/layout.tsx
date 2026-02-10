import '../theme.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const script = `
    (function () {
      const root = document.documentElement;

      function applyTheme(theme) {
        root.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
      }

      const stored = localStorage.getItem('theme');
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(stored || (prefers ? 'dark' : 'light'));

      window.toggleTheme = function () {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      };
    })();
  `;

  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <button id="theme-toggle" onclick="window.toggleTheme()">🌙 Dark</button>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </body>
    </html>
  );
}
