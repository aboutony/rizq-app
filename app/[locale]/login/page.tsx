'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    setSent(true);
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code: otp }),
    });
    // TODO: route to dashboard after success
    window.location.href = `/${window.location.pathname.split('/')[1]}/dashboard`;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center flex-1 px-8 py-12 sm:px-12 lg:flex-none lg:w-[500px]">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-2xl font-bold italic tracking-tighter text-slate-900">rizq</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t('title')}</h1>
          <p className="mt-2 text-sm text-slate-600">{t('subtitle')}</p>

          {!sent ? (
            <form onSubmit={sendOtp} className="mt-10 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">{t('phoneLabel')}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+9665..."
                  className="block w-full px-4 py-3 mt-2 border rounded-2xl border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <button type="submit" className="w-full py-4 font-semibold text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800">
                {t('sendOtp')}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="mt-10 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">{t('otpLabel')}</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="block w-full px-4 py-3 mt-2 border rounded-2xl border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <button type="submit" className="w-full py-4 font-semibold text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800">
                {t('verifyOtp')}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block bg-slate-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="w-24 h-24 mb-8 bg-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center border border-white/20">
            <span className="text-4xl font-bold italic">r</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Empowering Lebanese Education</h2>
          <p className="max-w-md text-slate-400">Manage your tutoring schedule and payments in one secure place.</p>
        </div>
      </div>
    </div>
  );
}
