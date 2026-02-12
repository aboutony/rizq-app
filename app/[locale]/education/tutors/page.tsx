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
  try {
    const res = await client.query(
      `SELECT 
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
  <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:#0d1324;color:#fff">
      <div style="color:#fff;font-weight:700;margin-bottom:10px">VERSION 4db1f41</div>
    <div style="max-width:1100px;margin:0 auto;padding:24px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
        <a href="/${esc(locale)}/education/student/dashboard" style="padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.3);color:#fff;text-decoration:none;font-size:12px">${esc(tr.back)}</a>
        <div style="font-size:22px;font-weight:800">${esc(tr.title)}</div>
      </div>

      ${tutors.length === 0 ? `
        <div style="padding:16px;background:rgba(255,255,255,.08);border-radius:14px;color:rgba(255,255,255,.7)">${esc(tr.empty)}</div>
      ` : `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px">
          ${tutors.map((tutor) => {
            const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
            const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);
            return `
              <div style="background:#fff;color:#0f172a;padding:18px;border-radius:22px;border:1px solid #eef2f7;box-shadow:0 6px 18px rgba(0,0,0,.08)">
                <div style="display:flex;gap:14px;align-items:center">
                  <div style="width:54px;height:54px;border-radius:50%;background:#e2e8f0"></div>
                  <div>
                    <div style="font-weight:700">${esc(name)}</div>
                    <div style="color:#64748b;font-size:13px;margin-top:4px">${esc(bio || '')}</div>
                  </div>
                </div>
                <a href="/${esc(locale)}/education/tutor/profile?slug=${encodeURIComponent(tutor.slug)}"
                   style="display:inline-block;margin-top:12px;padding:8px 14px;border-radius:16px;background:#0d1324;color:#fff;text-decoration:none;font-size:13px">
                   ${esc(tr.view)}
                </a>
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
