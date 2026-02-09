'use client';

import { useState } from 'react';

const copy = {
  en: {
    title: 'Login',
    subtitle: 'Log back in to manage your students and lessons with ease.',
    phoneLabel: 'Phone Number',
    sendOtp: 'Send OTP',
    otpLabel: 'OTP Code',
    verifyOtp: 'Verify OTP',
    sending: 'Sending...',
    verifying: 'Verifying...',
    roleTitle: 'Choose your role',
    roleSubtitle: 'Select how you want to use RIZQ',
    roleTutor: 'Tutor',
    roleStudent: 'Student / Parent'
  },
  ar: {
    title: 'تسجيل الدخول',
    subtitle: 'عد للتواصل مع طلابك وإدارة دروسك بكل سهولة.',
    phoneLabel: 'رقم الجوال',
    sendOtp: 'إرسال الرمز',
    otpLabel: 'رمز التحقق',
    verifyOtp: 'تحقق',
    sending: 'جارٍ الإرسال...',
    verifying: 'جارٍ التحقق...',
    roleTitle: 'اختر دورك',
    roleSubtitle: 'حدد كيف تريد استخدام رِزق',
    roleTutor: 'مدرّس',
    roleStudent: 'طالب / ولي أمر'
  },
  fr: {
    title: 'Connexion',
    subtitle: 'Reconnectez-vous pour gérer vos cours et vos élèves en toute simplicité.',
    phoneLabel: 'Numéro de téléphone',
    sendOtp: 'Envoyer le code',
    otpLabel: 'Code OTP',
    verifyOtp: 'Vérifier',
    sending: 'Envoi...',
    verifying: 'Vérification...',
    roleTitle: 'Choisissez votre rôle',
    roleSubtitle: 'Sélectionnez votre usage de RIZQ',
    roleTutor: 'Tuteur',
    roleStudent: 'Étudiant / Parent'
  }
};

type Step = 'phone' | 'otp' | 'role';

export default function LoginPage() {
  const locale = (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en') as 'en' | 'ar' | 'fr';
  const t = copy[locale] || copy.en;

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<Step>('phone');
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
      setStep('role');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const chooseRole = async (role: 'tutor' | 'student') => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/profile/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, role, vertical: 'education' })
      });
      if (!res.ok) throw new Error('Failed to set role');
      window.location.href = `/${locale}/education/${role}/dashboard`;
    } catch (err: any) {
      setError(err.message || 'Failed to set role');
    } finally {
      setLoading(false);
    }
  };
return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>RIZQ</div>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 6 }}>{t.subtitle}</div>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>{t.title}</h1>

        {error && <p style={{ marginTop: 8, color: '#ef4444', fontSize: 12 }}>{error}</p>}

        {step === 'phone' && (
          <form style={{ marginTop: 16, display: 'grid', gap: 12 }} onSubmit={sendOtp}>
            <label style={{ fontSize: 12, color: '#6B7280' }}>{t.phoneLabel}</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: 12, borderRadius: 14, border: '1px solid #e6e8ef' }}
            />
            <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 14, background: '#20c997', color: '#fff', fontWeight: 700, border: 'none' }}>
              {loading ? t.sending : t.sendOtp}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form style={{ marginTop: 16, display: 'grid', gap: 12 }} onSubmit={verifyOtp}>
            <label style={{ fontSize: 12, color: '#6B7280' }}>{t.otpLabel}</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ padding: 12, borderRadius: 14, border: '1px solid #e6e8ef' }}
            />
            <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 14, background: '#20c997', color: '#fff', fontWeight: 700, border: 'none' }}>
              {loading ? t.verifying : t.verifyOtp}
            </button>
          </form>
        )}

        {step === 'role' && (
          <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            <div style={{ fontWeight: 700 }}>{t.roleTitle}</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>{t.roleSubtitle}</div>
            <button onClick={() => chooseRole('tutor')} style={{ padding: 12, borderRadius: 14, background: '#20c997', color: '#fff', fontWeight: 700, border: 'none' }}>
              {t.roleTutor}
            </button>
            <button onClick={() => chooseRole('student')} style={{ padding: 12, borderRadius: 14, background: '#0F172A', color: '#fff', fontWeight: 700, border: 'none' }}>
              {t.roleStudent}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
