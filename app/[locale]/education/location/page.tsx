import React from 'react';

type Params = { params: { locale?: string } };

export default function LocationPicker({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Choose Location', search:'Search city or area', use:'Use my location', recent:'Recent Locations', save:'Save Location', back:'Go Back' },
    ar: { title:'اختر الموقع', search:'ابحث عن مدينة أو منطقة', use:'استخدم موقعي', recent:'المواقع الأخيرة', save:'حفظ الموقع', back:'رجوع' },
    fr: { title:'Choisir la localisation', search:'Rechercher une ville ou une zone', use:'Utiliser ma position', recent:'Localisations récentes', save:'Enregistrer', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .input{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center}
    .list{margin-top:12px;display:grid;gap:8px}
    .item{padding:10px;border-radius:12px;border:1px solid var(--border)}
    .row{display:grid;gap:10px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="row">
        <input class="input" placeholder="${t.search}" />
        <button class="btn ghost">${t.use}</button>
      </div>

      <div style="margin-top:14px;font-weight:700">${t.recent}</div>
      <div class="list">
        <div class="item">Beirut, Lebanon</div>
        <div class="item">Tripoli, Lebanon</div>
        <div class="item">Saida, Lebanon</div>
      </div>

      <div style="margin-top:16px" class="row">
        <button class="btn">${t.save}</button>
        <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
