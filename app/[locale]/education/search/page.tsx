import React from 'react';

type Params = { params: { locale?: string } };

export default function SearchPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Tutor Search Results', view:'View Profile' },
    ar: { title:'نتائج البحث عن المدرّسين', view:'عرض الملف' },
    fr: { title:'Résultats de recherche', view:'Voir profil' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .grid{display:grid;gap:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .muted{color:var(--muted)}
    .btn{background:var(--primary);color:#fff;border:none;padding:10px 12px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block}
    .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>

    <div class="grid">
      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Sarah Al‑Fayed</div>
            <div class="muted">Math & Physics · 4.8 ★ · $45</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Nadine K.</div>
            <div class="muted">French Language · 4.7 ★ · $35</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Omar H.</div>
            <div class="muted">Computer Science · 4.9 ★ · $50</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
