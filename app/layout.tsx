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
        {children}
      </body>
    </html>
  );
}
