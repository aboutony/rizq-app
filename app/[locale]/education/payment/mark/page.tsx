import React from 'react';

type Params = { params: { locale?: string } };

export default function PaymentMarkPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Mark Payment', note:'Mark payment as completed.', done:'Mark Paid', back:'Go Back' },
    ar: { title:'تأكيد الدفع', note:'تأكيد إتمام الدفع.', done:'تم الدفع', back:'رجوع' },
    fr: { title:'Marquer le paiement', note:'Marquer le paiement comme effectué.', done:'Marquer payé', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted);font-size:13px;margin-bottom:12px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:10px;padding:12px;border-radius:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.note}</div>
      <button class="btn">${t.done}</button>
      <a class="btn.ghost" href="/${locale}/education/payment">${t.back}</a>
    </div>
  </div>
  `;
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
