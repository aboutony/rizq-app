import React from 'react';
import pool from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

function esc(s: any) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function TutorsPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams?: { from?: string };
}) {
  noStore();
  const locale = params?.locale || 'en';
  const isAr = locale === 'ar';
  const from = searchParams?.from || '';
  const backHref = from === 'tutor'
    ? `/${locale}/education/tutor/dashboard`
    : `/${locale}/education/student/dashboard`;

  const t = {
    en: { title: 'Tutors Directory', view: 'View Profile', back: 'Back', empty: 'No tutors found.' },
    ar: { title: 'دليل المعلمين', view: 'عرض الملف', back: 'رجوع', empty: 'لا يوجد معلمون.' },
    fr: { title: 'Répertoire des tuteurs', view: 'Voir le profil', back: 'Retour', empty: 'Aucun tuteur trouvé.' }
  } as const;
  const tr = t[locale as 'en'|'ar'|'fr'] || t.en;

  const client = await pool.connect();
  let tutors: any[] = [];
  try {
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
    .avatar{width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,.15)}
    [data-theme="light"] .avatar{background:#e5e7eb}
    .name{font-weight:800}
    .bio{opacity:.8;font-size:13px;margin-top:4px}
    .btn{display:inline-block;margin-top:12px;padding:8px 14px;border-radius:16px;background:var(--primary);color:#0b1b13;text-decoration:none;font-size:13px;font-weight:800}
  </style>

  <div dir="${isAr ? 'rtl' : 'ltr'}">
    <div class="wrap">
      <div class="top">
        <a class="back" href="${backHref}">${esc(tr.back)}</a>
        <div class="title">${esc(tr.title)}</div>
      </div>

      ${tutors.length === 0 ? `
        <div style="padding:16px;border-radius:14px;opacity:.8">${esc(tr.empty)}</div>
      ` : `
        <div class="grid">
          ${tutors.map((tutor) => {
            const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
            const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);
            return `
              <div class="card">
                <div class="row">
                  <div class="avatar"></div>
                  <div>
                    <div class="name">${esc(name)}</div>
                    <div class="bio">${esc(bio || '')}</div>
                  </div>
                </div>
                <a class="btn" href="/${locale}/education/tutor/profile?slug=${encodeURIComponent(tutor.slug)}${from === 'tutor' ? '&from=tutor' : ''}">${esc(tr.view)}</a>
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
