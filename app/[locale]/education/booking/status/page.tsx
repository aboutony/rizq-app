import React from 'react';

type Params = { params: { locale?: string } };

export default function BookingStatus({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Booking Status', pending:'Pending Payment', confirmed:'Confirmed', back:'Go Back' },
    ar: { title:'حالة الحجز', pending:'في انتظار الدفع', confirmed:'تم التأكيد', back:'رجوع' },
    fr: { title:'Statut de réservation', pending:'En attente de paiement', confirmed:'Confirmé', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .status{padding:10px;border-radius:12px;border:1px solid var(--border);margin-top:10px}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:12px;padding:10px;border-radius:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="status">${t.pending}</div>
      <div class="status">${t.confirmed}</div>
      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
