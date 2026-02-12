import React from 'react';
type Params = { params: { locale?: string } };

export default function MarkPayment({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const t = {
    en: { title:'Mark Payment Completed', note:'I have completed the payment.', submit:'Submit', back:'Go Back' },
    ar: { title:'تأكيد الدفع', note:'لقد أكملت الدفع.', submit:'إرسال', back:'رجوع' },
    fr: { title:'Paiement effectué', note:'J’ai effectué le paiement.', submit:'Envoyer', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);margin-top:10px}
  </style>
  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <p>${t.note}</p>
      <a class="btn" href="/${locale}/education/booking/status" style="margin-top:10px">${t.submit}</a>
      <a class="btn ghost" href="/${locale}/education/tutor/dashboard">${t.back}</a>
    </div>
  </div>
  `;
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
