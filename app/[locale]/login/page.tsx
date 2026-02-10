import React from 'react';

type Params = { params: { locale?: string } };

export default function LoginPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title: 'Login',
      subtitle: 'Log back in to manage your students and lessons with ease.',
      countryLabel: 'Country',
      codeLabel: 'Code',
      numberLabel: 'Mobile Number',
      sendOtp: 'Send OTP',
      otpLabel: 'OTP Code',
      verifyOtp: 'Verify OTP'
    },
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'عد للتواصل مع طلابك وإدارة دروسك بكل سهولة.',
      countryLabel: 'الدولة',
      codeLabel: 'الرمز',
      numberLabel: 'رقم الجوال',
      sendOtp: 'إرسال الرمز',
      otpLabel: 'رمز التحقق',
      verifyOtp: 'تحقق'
    },
    fr: {
      title: 'Connexion',
      subtitle: 'Reconnectez-vous pour gérer vos cours et vos élèves en toute simplicité.',
      countryLabel: 'Pays',
      codeLabel: 'Indicatif',
      numberLabel: 'Numéro mobile',
      sendOtp: 'Envoyer le code',
      otpLabel: 'Code OTP',
      verifyOtp: 'Vérifier'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    :root{--bg:#f6f7fb;--card:#fff;--text:#1b1b1f;--muted:#666a73;--primary:#20c997;--border:#e6e8ef;--radius:16px}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{width:100%;max-width:420px;background:#fff;border-radius:24px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,0.06)}
    .title{font-size:20px;font-weight:700;color:#0F172A}
    .subtitle{font-size:13px;color:#6B7280;margin-top:6px}
    .label{font-size:12px;color:#6B7280;margin-bottom:6px}
    .input, select{width:100%;padding:12px;border-radius:14px;border:1px solid #e6e8ef}
    .btn{width:100%;padding:12px;border-radius:14px;background:#20c997;color:#fff;font-weight:700;border:none}
    .row{display:grid;grid-template-columns:1fr 2fr;gap:8px}
  </style>

  <div class="wrap">
    <div class="card">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:24px;font-weight:800;color:#0F172A">RIZQ</div>
        <div class="subtitle">${t.subtitle}</div>
      </div>

      <div class="title">${t.title}</div>

      <div style="margin-top:16px;display:grid;gap:12px">
        <label class="label">${t.countryLabel}</label>
        <select>
          <option>🇱🇧 Lebanon (+961)</option>
          <option>🇸🇦 Saudi Arabia (+966)</option>
          <option>🇦🇪 UAE (+971)</option>
          <option>🇶🇦 Qatar (+974)</option>
          <option>🇰🇼 Kuwait (+965)</option>
          <option>🇧🇭 Bahrain (+973)</option>
          <option>🇴🇲 Oman (+968)</option>
          <option>🇯🇴 Jordan (+962)</option>
          <option>🇪🇬 Egypt (+20)</option>
          <option>🇮🇶 Iraq (+964)</option>
          <option>🇲🇦 Morocco (+212)</option>
          <option>🇩🇿 Algeria (+213)</option>
          <option>🇹🇳 Tunisia (+216)</option>
        </select>

        <div class="row">
          <div>
            <label class="label">${t.codeLabel}</label>
            <input class="input" value="+961"/>
          </div>
          <div>
            <label class="label">${t.numberLabel}</label>
            <input class="input" placeholder="03 123 456"/>
          </div>
        </div>

        <button class="btn">${t.sendOtp}</button>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
