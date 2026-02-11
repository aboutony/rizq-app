import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorDirectory({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Tutor Directory',
      subtitle:'Browse all tutors registered in the app.',
      search:'Search by name, subject, or location',
      all:'All Tutors',
      view:'View Profile'
    },
    ar: {
      title:'دليل المدرّسين',
      subtitle:'تصفح جميع المدرّسين المسجلين في التطبيق.',
      search:'ابحث بالاسم أو المادة أو الموقع',
      all:'جميع المدرّسين',
      view:'عرض الملف'
    },
    fr: {
      title:'Annuaire des tuteurs',
      subtitle:'Parcourez tous les tuteurs inscrits.',
      search:'Rechercher par nom, matière ou lieu',
      all:'Tous les tuteurs',
      view:'Voir profil'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;max-width:1100px;margin:0 auto}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted)}
    .input{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text);margin:12px 0}
    .grid{display:grid;gap:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
    .btn{background:var(--primary);color:#fff;border:none;padding:10px 12px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>
    <div class="muted">${t.subtitle}</div>

    <input class="input" placeholder="${t.search}" />

    <div class="grid">
      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Sarah Al‑Fayed</div>
            <div class="muted">Math & Physics · Beirut · 4.8 ★</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Tony P.</div>
            <div class="muted">Music · Tripoli · 4.6 ★</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Nadine K.</div>
            <div class="muted">French · Saida · 4.7 ★</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
