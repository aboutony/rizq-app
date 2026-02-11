import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorDirectory({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Tutor Directory',
      subtitle:'Browse all tutors registered in the app.',
      search:'Search by name, subject, or location',
      grid:'Grid View',
      list:'List View',
      view:'View Profile',
      fav:'Favorite',
      backStudent:'Back to Student Dashboard',
      backTutor:'Back to Tutor Dashboard'
    },
    ar: {
      title:'دليل المدرّسين',
      subtitle:'تصفح جميع المدرّسين المسجلين في التطبيق.',
      search:'ابحث بالاسم أو المادة أو الموقع',
      grid:'عرض شبكي',
      list:'عرض قائمة',
      view:'عرض الملف',
      fav:'المفضلة',
      backStudent:'العودة إلى لوحة الطالب',
      backTutor:'العودة إلى لوحة المدرّس'
    },
    fr: {
      title:'Annuaire des tuteurs',
      subtitle:'Parcourez tous les tuteurs inscrits.',
      search:'Rechercher par nom, matière ou lieu',
      grid:'Vue Grille',
      list:'Vue Liste',
      view:'Voir profil',
      fav:'Favori',
      backStudent:'Retour au tableau Élève',
      backTutor:'Retour au tableau Tuteur'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;max-width:1100px;margin:0 auto}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted)}
    .input{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text);margin:12px 0}
    .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
    .tab{padding:8px 12px;border-radius:999px;border:1px solid var(--border);text-decoration:none;color:inherit;font-size:12px}
    .grid{display:grid;gap:12px}
    .grid.cards{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
    .btn{background:var(--primary);color:#fff;border:none;padding:8px 10px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
    .heart{border:1px solid var(--border);background:transparent;border-radius:10px;padding:6px 8px}
    .heart.on{background:#ffe5e5;color:#c81e1e;border-color:#ffc9c9}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>
    <div class="muted">${t.subtitle}</div>

    <input class="input" placeholder="${t.search}" />

    <div class="tabs">
      <a class="tab" href="#grid">${t.grid}</a>
      <a class="tab" href="#list">${t.list}</a>
    </div>

    <!-- GRID VIEW -->
    <div id="grid" class="grid cards">
      <div class="card">
        <div class="row">
          <div style="font-weight:800">Sarah Al‑Fayed</div>
          <button class="heart">♡</button>
        </div>
        <div class="muted">Math & Physics · Beirut · 4.8 ★</div>
        <div class="row" style="margin-top:10px">
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div style="font-weight:800">Tony P.</div>
          <button class="heart on">♥️</button>
        </div>
        <div class="muted">Music · Tripoli · 4.6 ★</div>
        <div class="row" style="margin-top:10px">
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>

      <div class="card">
        <div class="row">
<div style="font-weight:800">Nadine K.</div>
          <button class="heart">♡</button>
        </div>
        <div class="muted">French · Saida · 4.7 ★</div>
        <div class="row" style="margin-top:10px">
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>
    </div>

    <!-- LIST VIEW -->
    <div id="list" class="grid" style="margin-top:20px">
      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Sarah Al‑Fayed</div>
            <div class="muted">Math & Physics · Secondary · Beirut · 4.8 ★</div>
          </div>
          <div class="row">
            <button class="heart">♡</button>
            <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Tony P.</div>
            <div class="muted">Music · Undergraduate · Tripoli · 4.6 ★</div>
          </div>
          <div class="row">
            <button class="heart on">♥️</button>
            <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">Nadine K.</div>
            <div class="muted">French · Secondary · Saida · 4.7 ★</div>
          </div>
          <div class="row">
            <button class="heart">♡</button>
            <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:16px;display:grid;gap:8px">
      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.backStudent}</a>
      <a class="btn ghost" href="/${locale}/education/tutor/dashboard">${t.backTutor}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
