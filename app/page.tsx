export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>RIZQ</div>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 6 }}>Select your language</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <a href="/en/login" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 14, borderRadius: 16, background: '#20c997', color: '#fff', fontWeight: 700, textAlign: 'center' }}>English</div>
          </a>
          <a href="/ar/login" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 14, borderRadius: 16, background: '#0F172A', color: '#fff', fontWeight: 700, textAlign: 'center' }}>العربية</div>
          </a>
          <a href="/fr/login" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 14, borderRadius: 16, background: '#eaf9f3', color: '#0f7a5f', fontWeight: 700, textAlign: 'center', border: '1px solid #dff6ee' }}>Français</div>
          </a>
        </div>
      </div>
    </div>
  );
}
