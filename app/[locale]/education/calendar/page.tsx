import React from 'react';

type Params = { params: { locale?: string } };

export default function CalendarPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Select Date & Time', confirm:'Confirm Slot', back:'Go Back', mon:'Mon', tue:'Tue', wed:'Wed', thu:'Thu', fri:'Fri', sat:'Sat', sun:'Sun' },
    ar: { title:'اختر التاريخ والوقت', confirm:'تأكيد الموعد', back:'رجوع', mon:'الإث', tue:'الث', wed:'الأر', thu:'الخ', fri:'الج', sat:'السب', sun:'الأحد' },
    fr: { title:'Choisir la date et l’heure', confirm:'Confirmer le créneau', back:'Retour', mon:'Lun', tue:'Mar', wed:'Mer', thu:'Jeu', fri:'Ven', sat:'Sam', sun:'Dim' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center;font-size:13px;color:var(--text)}
    .day{height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px}
    .day.active{background:var(--primary);color:#fff;font-weight:700}
    .weekday{font-size:12px;color:var(--muted);text-align:center}
    .times{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
    .chip{padding:8px 12px;border-radius:999px;border:1px solid var(--border)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);margin-top:8px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>

      <div class="calendar" style="margin-bottom:8px">
        <div class="weekday">${t.mon}</div><div class="weekday">${t.tue}</div><div class="weekday">${t.wed}</div><div class="weekday">${t.thu}</div><div class="weekday">${t.fri}</div><div class="weekday">${t.sat}</div><div class="weekday">${t.sun}</div>
      </div>
      <div class="calendar">
        <div class="day">1</div><div class="day">2</div><div class="day">3</div><div class="day">4</div><div class="day">5</div><div class="day active">6</div><div class="day">7</div>
        <div class="day">8</div><div class="day">9</div><div class="day">10</div><div class="day">11</div><div class="day">12</div><div class="day">13</div><div class="day">14</div>
      </div>

      <div class="times">
        <span class="chip">04:00 PM</span>
        <span class="chip">05:00 PM</span>
        <span class="chip">06:30 PM</span>
      </div>

      <a class="btn" href="/${locale}/education/confirm" style="margin-top:14px">${t.confirm}</a>
      <a class="btn ghost" href="/${locale}/education/student/lesson">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
