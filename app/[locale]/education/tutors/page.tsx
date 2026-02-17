import React from 'react';
import pool from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

function esc(s: any) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function TutorsPage({ params }: { params: { locale: string } }) {
  noStore();
  const locale = params?.locale || 'en';
  const isAr = locale === 'ar';

  const t = {
    en: { title: 'Tutors Directory', view: 'View Profile', back: 'Back', empty: 'No tutors found.' },
    ar: { title: 'دليل المعلمين', view: 'عرض الملف', back: 'رجوع', empty: 'لا يوجد معلمون.' },
    fr: { title: 'Répertoire des tuteurs', view: 'Voir le profil', back: 'Retour', empty: 'Aucun tuteur trouvé.' }
  } as const;
  const tr = t[locale as 'en'|'ar'|'fr'] || t.en;

  const client = await pool.connect();
  let tutors: any[] = [];
  let favIds: Set<string> = new Set();
  try {
    const favRes = await client.query(`
      SELECT tutor_profile_id
      FROM student_favorites
      WHERE student_id = 'demo-student'
    `);
    favIds = new Set(favRes.rows.map((r:any) => r.tutor_profile_id));

    const res = await client.query(
      `SELECT 
         t.id,
         t.slug,
         COALESCE(t.display_name_en, t.name) as display_name_en,
         COALESCE(t.display_name_ar, t.name) as display_name_ar,
         COALESCE(t.display_name_fr, t.name) as display_name_fr,
         tp.bio_en, tp.bio_ar, tp.bio_fr
       FROM tutors t
       LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
       WHERE t.is_active = true
       ORDER BY t.name ASC`
    );
    tutors = res.rows || [];
  } finally {
    client.release();
  }

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{max-width:1200px;margin:0 auto;padding:24px}
    .top{display:flex;align-items:center;gap:12px;margin-bottom:18px}
    .back{padding:6px 12px;border-radius:999px;border:1px solid var(--primary);color:var(--primary);text-decoration:none;font-size:12px}
    .title{font-size:22px;font-weight:800}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px}
    .card{background:var(--card);border:1px solid var(--border);color:var(--text);padding:18px;border-radius:22px;box-shadow:0 6px 18px rgba(0,0,0,.08);position:relative}
    .row{display:flex;gap:14px;align-items:center}
    .avatar{width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,.12)}
    [data-theme="light"] .avatar{background:#e5e7eb}
    .name{font-weight:800}
    .bio{opacity:.8;font-size:13px;margin-top:4px}
    .btn{display:inline-block;margin-top:12px;padding:8px 14px;border-radius:16px;background:var(--primary);color:#0b1b13;text-decoration:none;font-size:13px;font-weight:800}
    .heart{background:transparent;border:none;cursor:pointer;position:absolute;top:12px;right:12px;padding:0}
    .heart svg{display:block}
  </style>

  <div dir="${isAr ? 'rtl' : 'ltr'}">
    <div class="wrap">
      <div class="top">
        <a href="/${esc(locale)}/education/student/dashboard" class="back">${esc(tr.back)}</a>
        <div class="title">${esc(tr.title)}</div>
      </div>

      ${tutors.length === 0 ? `
        <div style="padding:16px;border-radius:14px;opacity:.8">${esc(tr.empty)}</div>
      ` : `
        <div class="grid">
${tutors.map((tutor) => {
            const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
            const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);
            const isFav = favIds.has(tutor.id);
            return `
              <div class="card">
                <form method="POST" action="/api/student/favorites/toggle">
                  <input type="hidden" name="tutor_id" value="${tutor.id}" />
                  <input type="hidden" name="action" value="${isFav ? 'remove' : 'add'}" />
                  <input type="hidden" name="redirect" value="/${locale}/education/tutors" />
                  <button type="submit" class="heart" aria-label="Toggle favorite">
                    <svg viewBox="0 0 24 24" width="18" height="18"
                      ${isFav ? 'fill="#ef4444" stroke="#ef4444"' : 'fill="none" stroke="rgba(255,255,255,.7)"'}
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
                    </svg>
                  </button>
                </form>
                <div class="row">
                  <div class="avatar"></div>
                  <div class="flex-1">
                    <div class="name">${esc(name)}</div>
                    <div class="bio">${esc(bio || '')}</div>
                  </div>
                </div>
                <a class="btn" href="/${esc(locale)}/education/tutor/profile?slug=${encodeURIComponent(tutor.slug)}">${esc(tr.view)}</a>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
