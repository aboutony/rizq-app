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
      <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:var(--bg);color:var(--text);padding:24px">
        <a href="/${esc(locale)}/education/tutors" style="font-size:12px;padding:6px 12px;border-radius:999px;border:1px solid var(--border);color:var(--text);text-decoration:none">${esc(tr.back)}</a>
        <div style="margin-top:16px;color:var(--muted)">${esc(tr.missing)}</div>
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
      <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:var(--bg);color:var(--text);padding:24px">
<a href="/${esc(locale)}/education/tutors" style="font-size:12px;padding:6px 12px;border-radius:999px;border:1px solid var(--border);color:var(--text);text-decoration:none">${esc(tr.back)}</a>
        <div style="margin-top:16px;color:var(--muted)">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
  const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);

  const html = `
  <style>
    .card{background:var(--card);border:1px solid var(--border);color:var(--text);border-radius:22px;padding:18px;box-shadow:0 6px 18px rgba(0,0,0,.08)}
    .muted{color:var(--muted)}
  </style>

  <div dir="${isAr ? 'rtl' : 'ltr'}" style="min-height:100vh;background:var(--bg);color:var(--text)">
    <div style="padding:24px;max-width:900px;margin:0 auto">
      <a href="/${esc(locale)}/education/tutors" style="font-size:12px;padding:6px 12px;border-radius:999px;border:1px solid var(--border);color:var(--text);text-decoration:none">${esc(tr.back)}</a>

      <div class="card" style="margin-top:16px">
        <div style="display:flex;gap:14px;align-items:center">
          <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.12)"></div>
          <div>
            <h1 style="font-size:22px;font-weight:800">${esc(name)}</h1>
            <p class="muted" style="margin-top:4px">${esc(bio || '')}</p>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <h2 style="font-size:16px;font-weight:700;margin-bottom:10px">${esc(tr.lessons)}</h2>
        ${lessonTypes.length === 0 ? `
          <p class="muted">—</p>
        ` : `
          <div style="display:grid;gap:8px">
            ${lessonTypes.map((lt) => `
              <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.06);border-radius:14px;padding:10px">
                <div style="font-weight:600">${esc(lt.label)}</div>
                <div class="muted">${esc(lt.duration_minutes)} min • $${esc(lt.price_amount)}</div>
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
