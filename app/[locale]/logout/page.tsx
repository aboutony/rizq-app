'use client';

const copy = {
  en: { title: 'Log out', subtitle: 'You will be signed out of your account.', confirm: 'Confirm Logout' },
  ar: { title: 'تسجيل الخروج', subtitle: 'سيتم تسجيل خروجك من الحساب.', confirm: 'تأكيد الخروج' },
  fr: { title: 'Déconnexion', subtitle: 'Vous serez déconnecté de votre compte.', confirm: 'Confirmer la déconnexion' }
};

export default function LogoutPage() {
  const locale = (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en') as 'en' | 'ar' | 'fr';
  const t = copy[locale] || copy.en;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = `/${locale}/login`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--card)', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>RIZQ</div>
        <h1 style={{ marginTop: 12, fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{t.title}</h1>
        <p style={{ marginTop: 6, fontSize: 13, color: 'var(--muted)' }}>{t.subtitle}</p>
        <button onClick={handleLogout} style={{ marginTop: 20, width: '100%', padding: 12, borderRadius: 14, background: 'var(--primary)', color: '#fff', fontWeight: 700, border: 'none' }}>
          {t.confirm}
        </button>
      </div>
    </div>
  );
}
