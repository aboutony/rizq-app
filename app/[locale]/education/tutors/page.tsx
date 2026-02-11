import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import pool from '@/lib/db';

type Params = { params: { locale?: string } };

function getDisplayName(row: any, locale: string) {
  if (locale === 'ar' && row.display_name_ar) return row.display_name_ar;
  if (locale === 'fr' && row.display_name_fr) return row.display_name_fr;
  return row.display_name_en || row.name || 'Tutor';
}

function nameWithInitial(fullName: string) {
  const parts = fullName.trim().split(' ');
  if (parts.length <= 1) return fullName;
  const last = parts[parts.length - 1];
  return parts.slice(0, -1).join(' ') + ' ' + last.charAt(0) + '.';
}

export default async function TutorDirectory({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  noStore();

  const client = await pool.connect();
  let tutors: any[] = [];
  try {
    const res = await client.query(`
      SELECT
        t.id,
        t.name,
        t.slug,
        t.display_name_en,
        t.display_name_ar,
        t.display_name_fr,
        tp.photo_url,
        COALESCE(trs.avg_stars, 0) as avg_stars,
        COALESCE(trs.rating_count, 0) as rating_count,
        STRING_AGG(DISTINCT tl.location, ', ') AS locations,
        STRING_AGG(DISTINCT ts.subject, ', ') AS subjects,
        STRING_AGG(DISTINCT lv.level, ', ') AS levels
      FROM tutors t
      LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
      LEFT JOIN tutor_locations tl ON tl.tutor_profile_id = t.id
      LEFT JOIN tutor_subjects ts ON ts.tutor_profile_id = t.id
      LEFT JOIN tutor_levels lv ON lv.tutor_profile_id = t.id
      LEFT JOIN tutor_rating_summary trs ON t.id = trs.tutor_id
      WHERE t.is_active = true
      GROUP BY t.id, t.name, t.slug, t.display_name_en, t.display_name_ar, t.display_name_fr, tp.photo_url, trs.avg_stars, trs.rating_count
      ORDER BY t.display_name_en;
    `);
    tutors = res.rows;
  } finally {
    client.release();
  }

  const t = {
    en: {
      title:'Tutor Directory',
      subtitle:'Browse all tutors registered in the app.',
      search:'Search by name, subject, or location',
      grid:'Grid View',
      list:'List View',
      view:'View Profile',
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
      backStudent:'Retour au tableau Élève',
      backTutor:'Retour au tableau Tuteur'
    }
  }[locale as 'en'|'ar'|'fr'];

  const cardsGrid = tutors.map((row) => {
    const fullName = getDisplayName(row, locale);
    const name = nameWithInitial(fullName);
    const subjects = row.subjects || '';
    const locations = row.locations || '';
    const rating = row.avg_stars ? Number(row.avg_stars).toFixed(1) : '0.0';
    return `
      <div class="card">
        <div class="row">
          <div style="font-weight:800">${name}</div>
          <button class="heart">♡</button>
        </div>
        <div class="muted">${subjects} · ${locations} · ${rating} ★</div>
        <div class="row" style="margin-top:10px">
          <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
        </div>
      </div>
    `;
  }).join('');
const cardsList = tutors.map((row) => {
    const fullName = getDisplayName(row, locale);
    const name = nameWithInitial(fullName);
    const subjects = row.subjects || '';
    const levels = row.levels || '';
    const locations = row.locations || '';
    const rating = row.avg_stars ? Number(row.avg_stars).toFixed(1) : '0.0';
    return `
      <div class="card">
        <div class="row">
          <div>
            <div style="font-weight:800">${name}</div>
            <div class="muted">${subjects} · ${levels} · ${locations} · ${rating} ★</div>
          </div>
          <div class="row">
            <button class="heart">♡</button>
            <a class="btn" href="/${locale}/education/tutor/profile">${t.view}</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

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
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>
    <div class="muted">${t.subtitle}</div>

    <input class="input" placeholder="${t.search}" />

    <div class="tabs">
      <a class="tab" href="#grid">${t.grid}</a>
      <a class="tab" href="#list">${t.list}</a>
    </div>

    <div id="grid" class="grid cards">
      ${cardsGrid || '<div class="muted">No tutors found.</div>'}
    </div>

    <div id="list" class="grid" style="margin-top:20px">
      ${cardsList || '<div class="muted">No tutors found.</div>'}
    </div>

    <div style="margin-top:16px;display:grid;gap:8px">
      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.backStudent}</a>
      <a class="btn ghost" href="/${locale}/education/tutor/dashboard">${t.backTutor}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
