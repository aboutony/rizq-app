import React from 'react';

type Params = { params: { locale?: string }; searchParams?: { step?: string; phone?: string } };

export default function LoginPage({ params, searchParams }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const step = searchParams?.step || 'phone';
  const phone = searchParams?.phone || '';

  const t = {
    en: {
      title: 'Login',
      subtitle: 'Log back in to manage your students and lessons with ease.',
      countryLabel: 'Country',
      codeLabel: 'Code',
      numberLabel: 'Mobile Number',
      sendOtp: 'Send OTP',
      otpLabel: 'OTP Code',
      verifyOtp: 'Verify OTP',
      roleTitle: 'Choose your role',
      roleTutor: 'Tutor',
      roleStudent: 'Student / Parent'
    },
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'عد للتواصل مع طلابك وإدارة دروسك بكل سهولة.',
      countryLabel: 'الدولة',
      codeLabel: 'الرمز',
      numberLabel: 'رقم الجوال',
      sendOtp: 'إرسال الرمز',
      otpLabel: 'رمز التحقق',
      verifyOtp: 'تحقق',
      roleTitle: 'اختر دورك',
      roleTutor: 'مدرّس',
      roleStudent: 'طالب / ولي أمر'
    },
    fr: {
      title: 'Connexion',
      subtitle: 'Reconnectez-vous pour gérer vos cours et vos élèves en toute simplicité.',
      countryLabel: 'Pays',
      codeLabel: 'Indicatif',
      numberLabel: 'Numéro mobile',
      sendOtp: 'Envoyer le code',
      otpLabel: 'Code OTP',
      verifyOtp: 'Vérifier',
      roleTitle: 'Choisissez votre rôle',
      roleTutor: 'Tuteur',
      roleStudent: 'Étudiant / Parent'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{width:100%;max-width:420px;background:var(--card);border-radius:24px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,0.06);border:1px solid var(--border)}
    .title{font-size:20px;font-weight:700;color:var(--text)}
    .subtitle{font-size:13px;color:var(--muted);margin-top:6px}
    .label{font-size:12px;color:var(--muted);margin-bottom:6px}
    .input, select{width:100%;padding:12px;border-radius:14px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .btn{width:100%;padding:12px;border-radius:14px;background:var(--primary);color:#fff;font-weight:700;border:none}
    .btn-dark{background:var(--text);color:var(--card)}
    .row{display:grid;grid-template-columns:1fr 2fr;gap:8px}
    .stack{display:grid;gap:12px;margin-top:16px}
  </style>

  <div class="wrap">
    <div class="card">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:24px;font-weight:800;color:var(--text)">RIZQ</div>
        <div class="subtitle">${t.subtitle}</div>
      </div>

      <div class="title">${t.title}</div>

      ${step === 'phone' ? `
      <form class="stack" method="POST" action="/api/auth/otp/send">
        <input type="hidden" name="locale" value="${locale}">
        <label class="label">${t.countryLabel}</label>
        <select name="country">
          <option value="+961">🇱🇧 Lebanon (+961)</option>
          <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
          <option value="+971">🇦🇪 UAE (+971)</option>
          <option value="+974">🇶🇦 Qatar (+974)</option>
          <option value="+965">🇰🇼 Kuwait (+965)</option>
          <option value="+973">🇧🇭 Bahrain (+973)</option>
          <option value="+968">🇴🇲 Oman (+968)</option>
          <option value="+962">🇯🇴 Jordan (+962)</option>
          <option value="+20">🇪🇬 Egypt (+20)</option>
          <option value="+964">🇮🇶 Iraq (+964)</option>
          <option value="+212">🇲🇦 Morocco (+212)</option>
<option value="+213">🇩🇿 Algeria (+213)</option>
          <option value="+216">🇹🇳 Tunisia (+216)</option>
        </select>

        <div class="row">
          <div>
            <label class="label">${t.codeLabel}</label>
            <input class="input" name="code" value="+961"/>
          </div>
          <div>
            <label class="label">${t.numberLabel}</label>
            <input class="input" name="number" placeholder="03 123 456" required/>
          </div>
        </div>

        <button class="btn" type="submit">${t.sendOtp}</button>
      </form>` : ''}

      ${step === 'otp' ? `
      <form class="stack" method="POST" action="/api/auth/otp/verify">
        <input type="hidden" name="locale" value="${locale}">
        <input type="hidden" name="phone" value="${phone}">
        <label class="label">${t.otpLabel}</label>
        <input class="input" name="code" placeholder="123456" required/>
        <button class="btn" type="submit">${t.verifyOtp}</button>
      </form>` : ''}

      ${step === 'role' ? `
      <div class="stack">
        <div class="title">${t.roleTitle}</div>
        <form method="POST" action="/api/auth/profile/role">
          <input type="hidden" name="locale" value="${locale}">
          <input type="hidden" name="phone" value="${phone}">
          <input type="hidden" name="role" value="tutor">
          <input type="hidden" name="vertical" value="education">
          <button class="btn" type="submit">${t.roleTutor}</button>
        </form>
        <form method="POST" action="/api/auth/profile/role">
          <input type="hidden" name="locale" value="${locale}">
          <input type="hidden" name="phone" value="${phone}">
          <input type="hidden" name="role" value="student">
          <input type="hidden" name="vertical" value="education">
          <button class="btn btn-dark" type="submit">${t.roleStudent}</button>
        </form>
      </div>` : ''}
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
