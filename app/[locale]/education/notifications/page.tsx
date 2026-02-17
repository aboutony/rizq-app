import React from 'react';

type Params = { params: { locale?: string } };

export default function NotificationsPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Notifications',
      n1:'Booking created',
      n1s:'Pending payment',
      n2:'Payment marked',
      n2s:'Awaiting tutor confirmation',
      n3:'Booking confirmed',
      n3s:'Session added to calendar',
      back:'Go Back'
    },
    ar: {
      title:'الإشعارات',
      n1:'تم إنشاء الحجز',
      n1s:'بانتظار الدفع',
      n2:'تم تأكيد الدفع',
      n2s:'بانتظار تأكيد المدرّس',
      n3:'تم تأكيد الحجز',
      n3s:'تمت إضافة الجلسة إلى التقويم',
      back:'رجوع'
    },
    fr: {
      title:'Notifications',
      n1:'Réservation créée',
      n1s:'En attente de paiement',
      n2:'Paiement marqué',
      n2s:'En attente de confirmation du tuteur',
      n3:'Réservation confirmée',
      n3s:'Séance ajoutée au calendrier',
      back:'Retour'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px}
    .card{width:100%;max-width:520px;margin:0 auto;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .item{padding:12px;border-radius:12px;border:1px solid var(--border);margin-top:10px}
    .muted{color:var(--muted)}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:12px;padding:12px;border-radius:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
<div class="item"><strong>${t.n1}</strong><div class="muted">${t.n1s}</div></div>
      <div class="item"><strong>${t.n2}</strong><div class="muted">${t.n2s}</div></div>
      <div class="item"><strong>${t.n3}</strong><div class="muted">${t.n3s}</div></div>
      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
