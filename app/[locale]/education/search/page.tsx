import React from 'react';
import pool from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

type Params = { params: { locale?: string }, searchParams?: { q?: string; location?: string } };

function esc(s: any) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function SearchPage({ params, searchParams }: Params) {
  noStore();
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const q = String(searchParams?.q || '').trim();
  const location = String(searchParams?.location || '').trim();

  const t = {
    en: { title:'Tutor Search Results', view:'View Profile', back:'Back', search:'Search tutors or subjects', loc:'Location', fav:'Add to Favorites', chat:'Start Chat', empty:'No results found.' },
    ar: { title:'نتائج البحث عن المدرّسين', view:'عرض الملف', back:'رجوع', search:'ابحث عن مدرس أو مادة', loc:'الموقع', fav:'أضف إلى المفضلة', chat:'بدء المحادثة', empty:'لا توجد نتائج.' },
    fr: { title:'Résultats de recherche', view:'Voir profil', back:'Retour', search:'Rechercher tuteur ou matière', loc:'Localisation', fav:'Ajouter aux favoris', chat:'Démarrer le chat', empty:'Aucun résultat.' }
  }[locale as 'en'|'ar'|'fr'];

  const client = await pool.connect();
  let tutors: any[] = [];
  try {
    const res = await client.query(
      `SELECT t.id, t.slug,
              COALESCE(t.display_name_en, t.name) as display_name_en,
              COALESCE(t.display_name_ar, t.name) as display_name_ar,
              COALESCE(t.display_name_fr, t.name) as display_name_fr,
              tp.bio_en, tp.bio_ar, tp.bio_fr,
              STRING_AGG(DISTINCT tl.location, ', ') AS locations
       FROM tutors t
       LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
       LEFT JOIN tutor_locations tl ON tl.tutor_profile_id = t.id
       LEFT JOIN student_favorites sf
         ON sf.tutor_profile_id = t.id AND sf.student_id = 'demo-student'
       WHERE t.is_active = true
         AND sf.tutor_profile_id IS NULL
         AND ($1 = '' OR t.name ILIKE $1 OR tp.bio_en ILIKE $1 OR tp.bio_ar ILIKE $1 OR tp.bio_fr ILIKE $1)
         AND ($2 = '' OR tl.location ILIKE $2)
       GROUP BY t.id, t.slug, t.display_name_en, t.display_name_ar, t.display_name_fr, tp.bio_en, tp.bio_ar, tp.bio_fr
       ORDER BY t.name ASC`,
      [`%${q}%`, `%${location}%`]
    );
    tutors = res.rows || [];
  } finally {
    client.release();
  }

  const returnUrl = `/${locale}/education/search?q=${encodeURIComponent(q)}&location=${encodeURIComponent(location)}`;

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;max-width:900px;margin:0 auto}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .grid{display:grid;gap:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04);position:relative}
    .muted{color:var(--muted)}
    .btn{background:var(--primary);color:#fff;border:none;padding:10px 12px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block}
.btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
    .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
    .input{width:100%;padding:10px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .heart{background:transparent;border:none;font-size:18px;cursor:pointer;color:#9ca3af;position:absolute;top:12px;right:12px;z-index:5;pointer-events:auto}
    .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>

    <form method="get" action="/${locale}/education/search" style="margin-bottom:12px;display:grid;gap:8px">
      <input class="input" name="q" placeholder="${t.search}" value="${esc(q)}" />
      <input class="input" name="location" placeholder="${t.loc}" value="${esc(location)}" />
    </form>

    <div class="grid">
      ${tutors.length === 0 ? `<div class="muted">${t.empty}</div>` : tutors.map((row) => {
        const name = locale === 'ar' ? row.display_name_ar : (locale === 'fr' ? row.display_name_fr : row.display_name_en);
        const bio = locale === 'ar' ? row.bio_ar : (locale === 'fr' ? row.bio_fr : row.bio_en);
        const loc = row.locations || '';
        return `
          <div class="card">
            <form method="POST" action="/api/student/favorites/toggle">
              <input type="hidden" name="tutor_id" value="${row.id}" />
              <input type="hidden" name="action" value="add" />
              <input type="hidden" name="redirect" value="${returnUrl}" />
              <button type="submit" class="heart" title="${t.fav}">♥️</button>
            </form>
            <div class="row">
              <div>
                <div style="font-weight:800">${esc(name)}</div>
                <div class="muted">${esc(bio || '')}</div>
                <div class="muted">${esc(loc)}</div>
              </div>
            </div>
            <div class="actions">
              <a class="btn" href="/${locale}/education/tutor/profile?slug=${encodeURIComponent(row.slug)}&from=student&return=${encodeURIComponent(returnUrl)}">${t.view}</a>
              <a class="btn ghost" href="/${locale}/education/chat?slug=${encodeURIComponent(row.slug)}&from=student">${t.chat}</a>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div style="margin-top:16px">
      <a class="btn" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
