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
      <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:#0d1324;color:#fff;padding:20px">
        <a href="/${esc(locale)}/education/tutors" style="padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.3);color:#fff;text-decoration:none;font-size:12px">${esc(tr.back)}</a>
        <div style="margin-top:12px;color:rgba(255,255,255,.7)">${esc(tr.missing)}</div>
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
      <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:#0d1324;color:#fff;padding:20px">
        <a href="/${esc(locale)}/education/tutors" style="padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.3);color:#fff;text-decoration:none;font-size:12px">${esc(tr.back)}</a>
        <div style="margin-top:12px;color:rgba(255,255,255,.7)">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
  const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);

  const html = `
  <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:#0d1324;color:#fff">
    <div style="max-width:900px;margin:0 auto;padding:24px">
      <a href="/${esc(locale)}/education/tutors" style="padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.3);color:#fff;text-decoration:none;font-size:12px">${esc(tr.back)}</a>
<div style="margin-top:16px;background:#fff;color:#0f172a;padding:18px;border-radius:22px;border:1px solid #eef2f7;box-shadow:0 6px 18px rgba(0,0,0,.08)">
        <div style="display:flex;gap:14px;align-items:center">
          <div style="width:64px;height:64px;border-radius:50%;background:#e2e8f0"></div>
          <div>
            <div style="font-weight:800;font-size:22px">${esc(name)}</div>
            <div style="color:#64748b;margin-top:4px">${esc(bio || '')}</div>
          </div>
        </div>
      </div>

      <div style="margin-top:16px;background:#fff;color:#0f172a;padding:18px;border-radius:22px;border:1px solid #eef2f7;box-shadow:0 6px 18px rgba(0,0,0,.08)">
        <div style="font-weight:700">${esc(tr.lessons)}</div>
        ${lessonTypes.length === 0 ? `<div style="color:#64748b;margin-top:8px">—</div>` : `
          ${lessonTypes.map((lt) => `
            <div style="background:#f8fafc;border-radius:14px;padding:10px 12px;margin-top:8px;display:flex;justify-content:space-between">
              <div>${esc(lt.label)}</div>
              <div style="color:#64748b">${esc(lt.duration_minutes)} min • $${esc(lt.price_amount)}</div>
            </div>
          `).join('')}
        `}
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
