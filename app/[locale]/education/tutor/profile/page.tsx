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

export default async function TutorProfilePage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { slug?: string };
}) {
  noStore();
  const locale = params?.locale || 'en';
  const isAr = locale === 'ar';
  const slug = searchParams?.slug;

  const t = {
    en: { title: 'Tutor Profile', back: 'Back', missing: 'Tutor not found.', lessons: 'Lesson Types & Pricing' },
    ar: { title: 'ملف المعلم', back: 'رجوع', missing: 'لم يتم العثور على المعلم.', lessons: 'أنواع الدروس والأسعار' },
    fr: { title: 'Profil du tuteur', back: 'Retour', missing: 'Tuteur introuvable.', lessons: 'Types de cours & tarifs' }
  } as const;
  const tr = t[locale as 'en'|'ar'|'fr'] || t.en;

  if (!slug) {
    const htmlMissing = `
      <div dir="${isAr ? 'rtl' : 'ltr'}" class="min-h-screen bg-[#0d1324] text-white p-6">
        <a href="/${esc(locale)}/education/tutors" class="text-sm px-4 py-1 rounded-full border border-white/30 hover:bg-white/10">${esc(tr.back)}</a>
        <div class="mt-4 text-white/70">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const client = await pool.connect();
  let tutor: any = null;
  let lessonTypes: any[] = [];
  try {
    const res = await client.query(
      `SELECT 
         t.id, t.name,
         COALESCE(t.display_name_en, t.name) as display_name_en,
         COALESCE(t.display_name_ar, t.name) as display_name_ar,
         COALESCE(t.display_name_fr, t.name) as display_name_fr,
         tp.bio_en, tp.bio_ar, tp.bio_fr
       FROM tutors t
       LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
       WHERE t.slug = $1 AND t.is_active = true
       LIMIT 1`,
      [slug]
    );
    tutor = res.rows[0] || null;

    if (tutor) {
      const lt = await client.query(
        `SELECT lt.label, lp.duration_minutes, lp.price_amount
         FROM lesson_types lt
         JOIN lesson_pricing lp ON lt.id = lp.lesson_type_id
         WHERE lt.tutor_id = $1 AND lt.active = true AND lp.active = true
         ORDER BY lt.label, lp.duration_minutes`,
        [tutor.id]
      );
      lessonTypes = lt.rows || [];
    }
  } finally {
    client.release();
  }

  if (!tutor) {
    const htmlMissing = `
      <div dir="${isAr ? 'rtl' : 'ltr'}" class="min-h-screen bg-[#0d1324] text-white p-6">
        <a href="/${esc(locale)}/education/tutors" class="text-sm px-4 py-1 rounded-full border border-white/30 hover:bg-white/10">${esc(tr.back)}</a>
        <div class="mt-4 text-white/70">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
  const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);

  const html = `
  <div dir="${isAr ? 'rtl' : 'ltr'}" class="min-h-screen bg-[#0d1324] text-white">
    <div class="p-4 md:p-8 max-w-4xl mx-auto">
      <a href="/${esc(locale)}/education/tutors" class="text-sm px-4 py-1 rounded-full border border-white/30 hover:bg-white/10">${esc(tr.back)}</a>

      <div class="mt-6 bg-white text-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-slate-200"></div>
          <div>
            <h1 class="text-2xl font-bold text-slate-800">${esc(name)}</h1>
            <p class="text-slate-500 mt-1">${esc(bio || '')}</p>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-white text-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">${esc(tr.lessons)}</h2>
        ${lessonTypes.length === 0 ? `
          <p class="text-slate-500">—</p>
        ` : `
<div class="space-y-3">
            ${lessonTypes.map((lt) => `
              <div class="flex items-center justify-between bg-slate-50 rounded-2xl p-3">
                <div class="font-medium text-slate-700">${esc(lt.label)}</div>
                <div class="text-sm text-slate-600">${esc(lt.duration_minutes)} min • $${esc(lt.price_amount)}</div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
