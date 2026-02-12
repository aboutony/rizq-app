import React from 'react';
type Params = { params: { locale?: string }, searchParams?: { from?: string } };

export default function CalendarPage({ params, searchParams }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const from = searchParams?.from || '';
  const backHref = from === 'tutor'
    ? `/${locale}/education/tutor/dashboard`
    : `/${locale}/education/student/lesson`;

  const t = {
    en: { title:'Select Date & Time', date:'Date', time:'Time Slot', student:'Student Name', book:'Confirm Booking', back:'Go Back' },
    ar: { title:'اختر التاريخ والوقت', date:'التاريخ', time:'الوقت', student:'اسم الطالب', book:'تأكيد الحجز', back:'رجوع' },
    fr: { title:'Choisir la date et l’heure', date:'Date', time:'Heure', student:'Nom de l’élève', book:'Confirmer', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const nextQuery = from === 'tutor' ? '?from=tutor' : '';

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .input, select{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:10px}
    .grid{display:grid;gap:12px}
  </style>
  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <form class="grid" method="post" action="/api/booking/create">
        <input type="hidden" name="locale" value="${locale}" />
        <input type="hidden" name="tutor_id" value="c2f8242e-34d2-4402-9d30-76d546120731" />
        <input type="hidden" name="from" value="${from}" />
        <label>${t.student}</label>
        <input class="input" name="student_name" placeholder="Demo Student" />
        <label>${t.date}</label>
        <input class="input" type="date" name="date" />
        <label>${t.time}</label>
        <select class="input" name="time">
          <option>16:00</option>
          <option>17:00</option>
          <option>18:00</option>
        </select>
        <button class="btn" type="submit">${t.book}</button>
      </form>
      <a class="btn ghost" href="${backHref}">${t.back}</a>
    </div>
  </div>
  `;
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
