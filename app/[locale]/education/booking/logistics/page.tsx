import React from 'react';

type Params = { params: { locale?: string } };

export default function LogisticsPrompt({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Equipment & Venue Check',
      equip:'Confirm equipment availability (instruments, art tools, etc.)',
      venue:'Confirm venue reservation (studio, pool, court, etc.)',
      note:'This must be confirmed before payment.',
      next:'Proceed to Student Confirmation',
      back:'Go Back'
    },
    ar: {
      title:'تأكيد المعدات والمكان',
      equip:'تأكيد توفر المعدات (آلات موسيقية، أدوات فنون، إلخ)',
      venue:'تأكيد حجز المكان (استوديو، مسبح، ملعب، إلخ)',
      note:'يجب التأكيد قبل الدفع.',
      next:'الانتقال لتأكيد الطالب',
      back:'رجوع'
    },
    fr: {
      title:'Vérification matériel & lieu',
      equip:'Confirmer la disponibilité du matériel (instruments, outils artistiques, etc.)',
      venue:'Confirmer la réservation du lieu (studio, piscine, terrain, etc.)',
      note:'Doit être confirmé avant le paiement.',
      next:'Aller à la confirmation élève/parent',
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
    .check{display:flex;gap:10px;align-items:flex-start;padding:10px;border:1px solid var(--border);border-radius:12px;margin-bottom:10px}
    .check input{margin-top:4px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:10px;padding:12px;border-radius:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.note}</div>

      <label class="check">
        <input type="checkbox"/>
        <span>${t.equip}</span>
      </label>

      <label class="check">
        <input type="checkbox"/>
        <span>${t.venue}</span>
      </label>

      <a class="btn" href="/${locale}/education/booking/student-confirm">${t.next}</a>
      <a class="btn.ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
