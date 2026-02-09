export default function StudentDashboard() {
return
(
    <div style={{ minHeight: '100vh', background: '#F5F7F7', paddingBottom: 110 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280' }}>Logout</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Book a Lesson</span>
        <span style={{ fontSize: 22, color: '#9CA3AF' }}>⋮</span>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: 16, display: 'flex', gap: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👩‍🏫</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>Tutor</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Sarah Al‑Fayed</div>
            <div style={{ fontSize: 13, color: '#6B7280' }}>Math & Physics Expert</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>Student Name</div>
        <div style={{ background: '#fff', borderRadius: 16, padding: 12, display: 'flex', gap: 8, alignItems: 'center', border: '1px solid #F1F5F9' }}>
          <span style={{ color: '#94A3B8' }}>👤</span>
          <input placeholder="Enter full name" style={{ border: 'none', outline: 'none', width: '100%', fontSize: 14, color: '#334155', background: 'transparent' }} />
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 10 }}>Select Subject</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
          <button style={{ padding: '8px 18px', borderRadius: 9999, background: '#0F172A', color: '#fff', fontWeight: 600 }}>∑ Mathematics</button>
          <button style={{ padding: '8px 18px', borderRadius: 9999, background: '#fff', border: '1px solid #E2E8F0', color: '#334155', fontWeight: 600 }}>🧪 Physics</button>
          <button style={{ padding: '8px 18px', borderRadius: 9999, background: '#fff', border: '1px solid #E2E8F0', color: '#334155', fontWeight: 600 }}>🔬 Chemistry</button>
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>October 2023</div>
          <div style={{ fontSize: 20, color: '#9CA3AF' }}>‹ ›</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 24, padding: 14, border: '1px solid #F1F5F9' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontSize: 12, color: '#94A3B8', textAlign: 'center', marginBottom: 8 }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, textAlign: 'center', fontSize: 14, color: '#334155' }}>
            {['28','29','30','','','1','2','3','4','5','6','7','8','9','10','11','12','13','14'].map((d, i) => (
              <div key={i} style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9999, background: d === '8' ? '#34D399' : 'transparent', color: d === '8' ? '#fff' : '#334155', fontWeight: d === '8' ? 700 : 500 }}>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', m
arginBottom: 10 }}>Available Time</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
          <button style={{ padding: '10px 18px', borderRadius: 16, background: '#fff', border: '1px solid #E2E8F0', color: '#334155', fontWeight: 600 }}>04:00 PM</button>
          <button style={{ padding: '10px 18px', borderRadius: 16, background: '#34D399', color: '#fff', fontWeight: 700 }}>05:00 PM</button>
          <button style={{ padding: '10px 18px', borderRadius: 16, background: '#fff', border: '1px solid #E2E8F0', color: '#334155', fontWeight: 600 }}>06:30 PM</button>
        </div>
      </div>

      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Total</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>$45.00</div>
          </div>
          <button style={{ padding: '12px 22px', borderRadius: 16, background: '#34D399', color: '#fff', fontWeight: 700 }}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
