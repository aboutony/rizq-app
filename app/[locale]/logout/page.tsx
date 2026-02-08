'use client';

import { useTranslations } from 'next-intl';

export default function LogoutPage() {
  const t = useTranslations('Logout');

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    const locale = window.location.pathname.split('/')[1] || 'en';
    window.location.href = `/${locale}/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
        <p className="text-slate-600 mt-2">{t('subtitle')}</p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-3 rounded-2xl bg-slate-900 text-white font-semibold"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
}
