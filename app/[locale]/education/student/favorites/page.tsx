import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import pool from '@/lib/db';

type Params = { params: { locale?: string } };

function getDisplayName(row: any, locale: string) {
  if (locale === 'ar' && row.display_name_ar) return row.display_name_ar;
  if (locale === 'fr' && row.display_name_fr) return row.display_name_fr;
  return row.display_name_en || row.name || 'Tutor';
}

export default async function FavoritesPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  noStore();

  const client = await pool.connect();
  let favorites: any[] = [];
  try {
    const res = await client.query(`
      SELECT
        t.id,
        t.slug,
        t.name,
        t.display_name_en,
        t.display_name_ar,
        t.display_name_fr,
        COALESCE(trs.avg_stars, 0) as avg_stars,
        STRING_AGG(DISTINCT ts.subject, ', ') AS subjects,
        STRING_AGG(DISTINCT tl.location, ', ') AS locations
      FROM student_favorites sf
      JOIN tutors t ON sf.tutor_profile_id = t.id
      LEFT JOIN tutor_subjects ts ON ts.tutor_profile_id = t.id
      LEFT JOIN tutor_locations tl ON tl.tutor_profile_id = t.id
      LEFT JOIN tutor_rating_summary trs ON t.id = trs.tutor_id
      WHERE sf.student_id = 'demo-student'
      GROUP BY t.id, t.slug, t.name, t.display_name_en, t.display_name_ar, t.display_name_fr, trs.avg_stars
      ORDER BY t.display_name_en;
    `);
    favorites = res.rows;
  } finally {
    client.release();
  }

  const t = {
    en: { title:'My Favorites', subtitle:'Saved tutors for quick booking.', view:'View Profile', back:'Go Back', empty:'No favorites yet.' },
    ar: { title:'المفضلة', subtitle:'المدرّسون المحفوظون للحجز السريع.', view:'عرض الملف', back:'رجوع', empty:'لا يوجد مفضلات بعد.' },
    fr: { title:'Mes favoris', subtitle:'Tuteurs enregistrés pour réservation rapide.', view:'Voir profil', back:'Retour', empty:'Aucun favori pour le moment.' }
  }[locale as 'en'|'ar'|'fr'];

  const returnUrl = `/${locale}/education/student/favorites`;

  const cards = favorites.map((row) => {
    const name = getDisplayName(row, locale);
    const subjects = row.subjects || '';
    const locations = row.locations || '';
    const rating = row.avg_stars ? Number(row.avg_stars).toFixed(1) : '0.0';
    return `
      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">${name}</div>
            <div class="muted">${subjects} · ${locations} · ${rating} ★</div>
          </div>
          <a class="btn" href="/${locale}/education/tutor/profile?slug=${encodeURIComponent(row.slug)}&from=student&return=${encodeURIComponent(returnUrl)}">${t.view}</a>
        </div>
      </div>
    `;
  }).join('');

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
.btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>
    <div class="muted">${t.subtitle}</div>

    <div class="grid">
      ${cards || `<div class="muted">${t.empty}</div>`}
    </div>

    <div style="margin-top:16px">
      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
