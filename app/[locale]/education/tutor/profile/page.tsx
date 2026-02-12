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
  searchParams: { slug?: string; from?: string };
}) {
  noStore();
  const locale = params?.locale || 'en';
  const isAr = locale === 'ar';
  const slug = searchParams?.slug;
  const from = searchParams?.from || '';
  const backHref = from === 'tutor'
    ? `/${locale}/education/tutors?from=tutor`
    : `/${locale}/education/tutors`;

  const t = {
    en: { back: 'Back', missing: 'Tutor not found.', lessons: 'Lesson Types & Pricing', none: 'No lesson types yet.' },
    ar: { back: 'رجوع', missing: 'لم يتم العثور على المعلم.', lessons: 'أنواع الدروس والأسعار', none: 'لا توجد أنواع دروس بعد.' },
    fr: { back: 'Retour', missing: 'Tuteur introuvable.', lessons: 'Types de cours & tarifs', none: 'Aucun type de cours pour le moment.' }
  } as const;
  const tr = t[locale as 'en'|'ar'|'fr'] || t.en;

  if (!slug) {
    const htmlMissing = `
      <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:var(--bg);color:var(--text);padding:20px">
        <a href="${backHref}" style="padding:6px 12px;border-radius:999px;border:1px solid #22c55e;color:#22c55e;text-decoration:none;font-size:12px">${esc(tr.back)}</a>
        <div style="margin-top:12px;opacity:.8">${esc(tr.missing)}</div>
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
      <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:var(--bg);color:var(--text);padding:20px">
        <a href="${backHref}" style="padding:6px 12px;border-radius:999px;border:1px solid #22c55e;color:#22c55e;text-decoration:none;font-size:12px">${esc(tr.back)}</a>
        <div style="margin-top:12px;opacity:.8">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
  const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f8fafc;color:#0f172a}
    [data-theme="dark"] body{background:#0d1324;color:#e5e7eb}
    .wrap{max-width:900px;margin:0 auto;padding:24px}
    .back{padding:6px 12px;border-radius:999px;border:1px solid #22c55e;color:#22c55e;text-decoration:none;font-size:12px}
    .card{background:#ffffff;border:1px solid #e2e8f0;color:#0f172a;padding:18px;border-radius:22px;box-shadow:0 6px 18px rgba(0,0,0,.08)}
    [data-theme="dark"] .card{background:#111827;border:1px solid #1f2937;color:#e5e7eb;box-shadow:0 6px 18px rgba(0,0,0,.25)}
    .row{display:flex;gap:14px;align-items:center}
    .avatar{width:64px;height:64px;border-radius:50%;background:#e2e8f0}
    [data-theme="dark"] .avatar{background:rgba(255,255,255,.15)}
    .name{font-weight:800;font-size:22px}
    .bio{opacity:.8;margin-top:4px}
    .lesson{background:#f8fafc;border-radius:14px;padding:10px 12px;margin-top:8px;display:flex;justify-content:space-between}
    [data-theme="dark"] .lesson{background:rgba(255,255,255,.06)}
  </style>

  <div dir="${isAr ? 'rtl' : 'ltr'}">
    <div class="wrap">
      <a class="back" href="${backHref}">${esc(tr.back)}</a>

      <div class="card" style="margin-top:16px">
        <div class="row">
          <div class="avatar"></div>
          <div>
            <div class="name">${esc(name)}</div>
            <div class="bio">${esc(bio || '')}</div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <div style="font-weight:700">${esc(tr.lessons)}</div>
        ${lessonTypes.length === 0 ? `<div style="opacity:.7;margin-top:8px">${esc(tr.none)}</div>` : `
          ${lessonTypes.map((lt) => `
            <div class="lesson">
              <div>${esc(lt.label)}</div>
              <div style="opacity:.7">${esc(lt.duration_minutes)} min • $${esc(lt.price_amount)}</div>
            </div>
          `).join('')}
        `}
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
