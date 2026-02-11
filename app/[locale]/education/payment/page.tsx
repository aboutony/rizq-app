import React from 'react';

type Params = { params: { locale?: string } };

export default function PaymentPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Payment Instructions',
      cash:'Cash Payment',
      cashText:'Pay tutor directly at session start.',
      transfer:'Money Transfer',
      transferText:'Send payment via Western Union / OMT / Whish Money or similar.',
      mark:'Mark Payment Completed',
      back:'Go Back'
    },
    ar: {
      title:'تعليمات الدفع',
      cash:'الدفع نقداً',
      cashText:'ادفع للمدرّس مباشرة عند بدء الجلسة.',
      transfer:'التحويل المالي',
      transferText:'أرسل الدفع عبر ويسترن يونيون / OMT / ويش موني أو غيرها.',
      mark:'تم الدفع',
      back:'رجوع'
    },
    fr: {
      title:'Instructions de paiement',
      cash:'Paiement en espèces',
      cashText:'Payez le tuteur مباشرة au début de la séance.',
      transfer:'Transfert d’argent',
      transferText:'Envoyez via Western Union / OMT / Whish Money ou similaire.',
      mark:'Paiement effectué',
      back:'Retour'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .section{margin-top:12px}
    .muted{color:var(--muted)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);margin-top:10px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>

      <div class="section">
        <strong>${t.cash}</strong>
        <p class="muted">${t.cashText}</p>
      </div>

      <div class="section">
        <strong>${t.transfer}</strong>
        <p class="muted">${t.transferText}</p>
      </div>

      <div class="section">
        <a class="btn" href="/${locale}/education/payment/mark">${t.mark}</a>
        <a class="btn ghost" href="/${locale}/education/reconfirm">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
