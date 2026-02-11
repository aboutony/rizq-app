import React from 'react';

type Params = { params: { locale?: string } };

export default function NotificationsPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Notifications', back:'Go Back' },
    ar: { title:'الإشعارات', back:'رجوع' },
    fr: { title:'Notifications', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .item{padding:10px;border-radius:12px;border:1px solid var(--border);margin-top:8px}
    .muted{color:var(--muted)}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:12px;padding:10px;border-radius:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="item"><strong>Booking created</strong><div class="muted">Pending payment</div></div>
      <div class="item"><strong>Payment marked</strong><div class="muted">Awaiting tutor confirmation</div></div>
      <div class="item"><strong>Booking confirmed</strong><div class="muted">Session added to calendar</div></div>

      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
