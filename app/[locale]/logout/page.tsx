'use client';

export default function LogoutPage() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    const locale = window.location.pathname.split('/')[1] || 'en';
    window.location.href = `/${locale}/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-slate-900">Log out</h1>
        <p className="text-slate-600 mt-2">You will be signed out of your account.</p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-3 rounded-2xl bg-slate-900 text-white font-semibold"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
}
