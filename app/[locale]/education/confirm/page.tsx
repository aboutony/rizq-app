import React from 'react';

type Params = { params: { locale?: string } };

export default function ConfirmBooking({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Confirm Booking?', confirm:'Confirm', cancel:'Cancel' },
    ar: { title:'تأكيد الحجز؟', confirm:'تأكيد', cancel:'إلغاء' },
    fr: { title:'Confirmer la réservation ?', confirm:'Confirmer', cancel:'Annuler' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{width:100%;max-width:420px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05);text-align:center}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);margin-top:10px}
  </style>

  <div class="wrap">
    <div class="card">
      <h2>${t.title}</h2>
      <div style="margin-top:14px">
        <a class="btn" href="/${locale}/education/booking/logistics">${t.confirm}</a>
        <a class="btn ghost" href="/${locale}/education/calendar">${t.cancel}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
