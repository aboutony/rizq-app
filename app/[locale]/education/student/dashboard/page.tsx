export default function StudentDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F7F7', padding: '24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Student Dashboard</h1>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
          <p style={{ margin: 0, fontWeight: 600 }}>This page is working.</p>
          <p style={{ margin: '8px 0 0', color: '#666' }}>
            If you can see this, routing is fine and we can safely apply the full design next.
          </p>
        </div>
      </div>
    </div>
  );
}
