export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--card)', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>RIZQ</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Select your language</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <a href="/en/login" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 14, borderRadius: 16, background: 'var(--primary)', color: '#fff', fontWeight: 700, textAlign: 'center' }}>English</div>
          </a>
          <a href="/ar/login" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 14, borderRadius: 16, background: 'var(--text)', color: 'var(--card)', fontWeight: 700, textAlign: 'center' }}>العربية</div>
          </a>
          <a href="/fr/login" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 14, borderRadius: 16, background: 'transparent', color: 'var(--text)', fontWeight: 700, textAlign: 'center', border: '1px solid var(--border)' }}>Français</div>
          </a>
        </div>
      </div>
    </div>
  );
}
