import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorConfirm({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Tutor Confirmation',
      note:'Tutor confirms logistics (equipment + venue) before payment.',
      confirm:'Confirm Logistics',
      back:'Go Back'
    },
    ar: {
      title:'تأكيد المدرّس',
      note:'يقوم المدرّس بتأكيد اللوجستيات (المعدات + المكان) قبل الدفع.',
      confirm:'تأكيد اللوجستيات',
      back:'رجوع'
    },
    fr: {
      title:'Confirmation du tuteur',
      note:'Le tuteur confirme la logistique (matériel + lieu) avant le paiement.',
      confirm:'Confirmer la logistique',
      back:'Retour'
    }
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
      <a class="btn" href="/${locale}/education/booking/status">${t.confirm}</a>
      <a class="btn.ghost" href="/${locale}/education/booking/logistics">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
