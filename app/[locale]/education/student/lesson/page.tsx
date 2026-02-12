import React from 'react';

type Params = { params: { locale?: string }, searchParams?: { from?: string } };

export default function StudentLesson({ params, searchParams }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const from = searchParams?.from || '';
  const backHref = from === 'tutor'
    ? `/${locale}/education/tutor/dashboard`
    : `/${locale}/education/student/dashboard`;

  const t = {
    en: { title:'Student Lesson', subtitle:'Lesson details', back:'Go Back' },
    ar: { title:'درس الطالب', subtitle:'تفاصيل الدرس', back:'رجوع' },
    fr: { title:'Leçon élève', subtitle:'Détails de la leçon', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center;margin-top:14px}
  </style>
  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.subtitle}</div>
      <a class="btn" href="${backHref}">${t.back}</a>
    </div>
  </div>
  `;
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
