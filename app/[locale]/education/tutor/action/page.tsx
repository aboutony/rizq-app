import React from 'react';

type Params = { params: { locale?: string }, searchParams?: { action?: string; kind?: string } };

export default function TutorActionPage({ params, searchParams }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const action = searchParams?.action || 'approve';
  const kind = searchParams?.kind || 'request';

  const labels: any = {
    en: {
      approve:'Approved',
      reschedule:'Reschedule Requested',
      decline:'Declined',
      request:'Lesson Request',
      resReq:'Reschedule Request',
      back:'Go Back'
    },
    ar: {
      approve:'تمت الموافقة',
      reschedule:'طلب إعادة الجدولة',
      decline:'تم الرفض',
      request:'طلب درس',
      resReq:'طلب إعادة جدولة',
      back:'رجوع'
    },
    fr: {
      approve:'Approuvé',
      reschedule:'Replanification demandée',
      decline:'Refusé',
      request:'Demande de cours',
      resReq:'Demande de replanification',
      back:'Retour'
    }
  }[locale];

  const title =
    (action === 'approve' ? labels.approve :
     action === 'reschedule' ? labels.reschedule : labels.decline);

  const kindLabel = kind === 'reschedule' ? labels.resReq : labels.request;

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{width:100%;max-width:420px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05);text-align:center}
    .title{font-size:20px;font-weight:800;margin-bottom:10px}
    .muted{color:var(--muted)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center;margin-top:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${title}</div>
      <div class="muted">${kindLabel}</div>
      <a class="btn" href="/${locale}/education/tutor/dashboard">${labels.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
