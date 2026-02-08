'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send OTP');
      }
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      const role = data.role || 'tutor';
      const vertical = data.vertical || 'education';
      const locale = window.location.pathname.split('/')[1] || 'en';
      window.location.href = `/${locale}/${vertical}/${role}/dashboard`;
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };
return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center flex-1 px-8 py-12 sm:px-12 lg:flex-none lg:w-[500px]">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-2xl font-bold italic tracking-tighter text-slate-900">rizq</div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t('title')}</h1>
          <p className="mt-2 text-sm text-slate-600">{t('subtitle')}</p>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          {step === 'phone' && (
            <form className="mt-10 space-y-6" onSubmit={sendOtp}>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t('phoneLabel')}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full px-4 py-3 mt-2 border rounded-2xl border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-semibold text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? t('sending') : t('sendOtp')}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form className="mt-10 space-y-6" onSubmit={verifyOtp}>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t('otpLabel')}</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full px-4 py-3 mt-2 border rounded-2xl border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-semibold text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? t('verifying') : t('verifyOtp')}
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
          <h2 className="text-3xl font-bold mb-4">{t('heroTitle')}</h2>
          <p className="max-w-md text-slate-400">{t('heroSubtitle')}</p>
        </div>
      </div>
    </div>
  );
}
