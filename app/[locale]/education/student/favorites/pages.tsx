import React from 'react';

type Params = { params: { locale?: string } };

export default function FavoritesPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'My Favorites', subtitle:'Saved tutors for quick booking.', view:'View Profile' },
    ar: { title:'المفضلة', subtitle:'المدرّسون المحفوظون للحجز السريع.', view:'عرض الملف' },
    fr: { title:'Mes favoris', subtitle:'Tuteurs enregistrés pour réservation rapide.', view:'Voir profil' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;max-width:900px;margin:0 auto}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted)}
    .grid{display:grid;gap:12px;margin-top:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
    .btn{background:var(--primary);color:#fff;border:none;padding:8px 10px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>
    <div class="muted">${t.subtitle}</div>

    <div class="grid">
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
            <div style="font-weight:800">Sarah Al‑Fayed</div>
            <div class="muted">Math & Physics · Beirut · 4.8 ★</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
