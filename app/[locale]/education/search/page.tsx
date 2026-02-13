import React from 'react';
import pool from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

type Params = { params: { locale?: string }, searchParams?: { q?: string } };

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

  const t = {
    en: { title:'Tutor Search Results', view:'View Profile', back:'Back', search:'Search tutors or subjects' },
    ar: { title:'نتائج البحث عن المدرّسين', view:'عرض الملف', back:'رجوع', search:'ابحث عن مدرس أو مادة' },
    fr: { title:'Résultats de recherche', view:'Voir profil', back:'Retour', search:'Rechercher tuteur ou matière' }
  }[locale as 'en'|'ar'|'fr'];

  const client = await pool.connect();
  let tutors: any[] = [];
  try {
    if (q) {
const res = await client.query(
        `SELECT t.slug,
                COALESCE(t.display_name_en, t.name) as display_name_en,
                COALESCE(t.display_name_ar, t.name) as display_name_ar,
                COALESCE(t.display_name_fr, t.name) as display_name_fr,
                tp.bio_en, tp.bio_ar, tp.bio_fr
         FROM tutors t
         LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
         WHERE t.is_active = true
           AND (t.name ILIKE $1 OR tp.bio_en ILIKE $1 OR tp.bio_ar ILIKE $1 OR tp.bio_fr ILIKE $1)
         ORDER BY t.name ASC`,
        [`%${q}%`]
      );
      tutors = res.rows || [];
    } else {
      const res = await client.query(
        `SELECT t.slug,
                COALESCE(t.display_name_en, t.name) as display_name_en,
                COALESCE(t.display_name_ar, t.name) as display_name_ar,
                COALESCE(t.display_name_fr, t.name) as display_name_fr,
                tp.bio_en, tp.bio_ar, tp.bio_fr
         FROM tutors t
         LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
         WHERE t.is_active = true
         ORDER BY t.name ASC
         LIMIT 20`
      );
      tutors = res.rows || [];
    }
  } finally {
    client.release();
  }

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;max-width:900px;margin:0 auto}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .grid{display:grid;gap:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .muted{color:var(--muted)}
    .btn{background:var(--primary);color:#fff;border:none;padding:10px 12px;border-radius:10px;font-weight:700;text-decoration:none;display:inline-block}
    .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
    .input{width:100%;padding:10px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
  </style>
  <div class="wrap">
    <div class="title">${t.title}</div>

    <form method="get" action="/${locale}/education/search" style="margin-bottom:12px">
      <input class="input" name="q" placeholder="${t.search}" value="${esc(q)}" />
    </form>

    <div class="grid">
      ${tutors.map((row) => {
        const name = locale === 'ar' ? row.display_name_ar : (locale === 'fr' ? row.display_name_fr : row.display_name_en);
        const bio = locale === 'ar' ? row.bio_ar : (locale === 'fr' ? row.bio_fr : row.bio_en);
        return `
          <div class="card">
            <div class="row">
              <div>
                <div style="font-weight:800">${esc(name)}</div>
                <div class="muted">${esc(bio || '')}</div>
              </div>
              <a class="btn" href="/${locale}/education/tutor/profile?slug=${encodeURIComponent(row.slug)}&from=student">${t.view}</a>
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
