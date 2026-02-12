import pool from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';

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

  const tr = t[locale as 'en' | 'ar' | 'fr'] || t.en;

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
<div dir="${isAr ? 'rtl' : 'ltr'}" class="p-4 md:p-8 max-w-5xl mx-auto">
    <div class="flex items-center gap-3 mb-6">
      <a href="/${esc(locale)}/education/student/dashboard" class="text-sm px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50">${esc(tr.back)}</a>
      <h1 class="text-2xl font-bold text-slate-800">${esc(tr.title)}</h1>
    </div>

    ${tutors.length === 0 ? `
      <div class="p-4 bg-slate-50 rounded-2xl text-slate-500">${esc(tr.empty)}</div>
    ` : `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${tutors.map((tutor) => {
          const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
          const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);
          return `
            <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-full bg-slate-200"></div>
                <div class="flex-1">
                  <div class="font-semibold text-slate-800">${esc(name)}</div>
                  <div class="text-sm text-slate-500 mt-1">${esc(bio || '')}</div>
                </div>
              </div>
              <div class="mt-4">
                <a href="/${esc(locale)}/education/tutor/profile?slug=${encodeURIComponent(tutor.slug)}"
                   class="inline-block px-4 py-2 rounded-2xl bg-slate-900 text-white text-sm hover:bg-slate-800">
                  ${esc(tr.view)}
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
