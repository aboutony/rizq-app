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
    ? `/${locale}/education/tutor/dashboard`
    : `/${locale}/education/tutors`;

  const t = {
    en: {
      title: 'Tutor Profile',
      back: 'Back',
      missing: 'Tutor not found.',
      lessons: 'Lesson Types & Pricing',
      disclaimerTitle: 'Disclaimer & Consent',
      disclaimer1: 'RIZQ does not guarantee the authenticity of tutor documents, certificates, licenses, or career claims.',
      disclaimer2: 'RIZQ is not responsible for any disputes, misunderstandings, or consequences between tutors and students.',
      disclaimer3: 'If the student is under 18, a parent/guardian must consent before using the app.'
    },
    ar: {
      title: 'ملف المعلم',
      back: 'رجوع',
      missing: 'لم يتم العثور على المعلم.',
      lessons: 'أنواع الدروس والأسعار',
      disclaimerTitle: 'إخلاء مسؤولية وموافقة',
      disclaimer1: 'لا تضمن RIZQ صحة المستندات أو الشهادات أو التراخيص أو الخبرات التي يذكرها المدرّس.',
      disclaimer2: 'RIZQ غير مسؤولة عن أي نزاعات أو سوء فهم أو عواقب قد تحدث بين المدرّس والطالب.',
      disclaimer3: 'إذا كان الطالب دون 18 عامًا، يجب الحصول على موافقة ولي الأمر قبل استخدام التطبيق.'
    },
    fr: {
      title: 'Profil du tuteur',
back: 'Retour',
      missing: 'Tuteur introuvable.',
      lessons: 'Types de cours & tarifs',
      disclaimerTitle: 'Clause de non‑responsabilité & consentement',
      disclaimer1: 'RIZQ ne garantit pas l’authenticité des documents, certificats, licences ou expériences déclarées.',
      disclaimer2: 'RIZQ n’est pas responsable des litiges, malentendus ou conséquences entre tuteur et élève.',
      disclaimer3: 'Si l’élève a moins de 18 ans, un parent/tuteur doit donner son consentement.'
    }
  } as const;
  const tr = t[locale as 'en'|'ar'|'fr'] || t.en;

  if (!slug) {
    const htmlMissing = `
      <div dir="${isAr ? 'rtl' : 'ltr'}" class="min-h-screen bg-[#0d1324] text-white p-6">
        <a href="${backHref}" class="text-sm px-4 py-1 rounded-full border border-white/30 hover:bg-white/10">${esc(tr.back)}</a>
        <div class="mt-4 text-white/70">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const client = await pool.connect();
  let tutor: any = null;
  let lessonTypes: any[] = [];
  let isFav = false;
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
      const fav = await client.query(
        `SELECT 1 FROM student_favorites WHERE student_id = 'demo-student' AND tutor_profile_id = $1 LIMIT 1`,
        [tutor.id]
      );
      isFav = fav.rows.length > 0;

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
        <a href="${backHref}" class="text-sm px-4 py-1 rounded-full border border-white/30 hover:bg-white/10">${esc(tr.back)}</a>
        <div class="mt-4 text-white/70">${esc(tr.missing)}</div>
      </div>`;
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlMissing } });
  }

  const name = locale === 'ar' ? tutor.display_name_ar : (locale === 'fr' ? tutor.display_name_fr : tutor.display_name_en);
  const bio = locale === 'ar' ? tutor.bio_ar : (locale === 'fr' ? tutor.bio_fr : tutor.bio_en);

  const html = `
  <style>
    .heart{background:transparent;border:none;cursor:pointer;position:absolute;top:18px;right:18px;padding:0}
    .heart svg{display:block}
  </style>
  <div dir="${isAr ? 'rtl' : 'ltr'}" class="min-h-screen bg-[#0d1324] text-white">
    <div class="p-4 md:p-8 max-w-4xl mx-auto">
      <a href="${backHref}" class="text-sm px-4 py-1 rounded-full border border-white/30 hover:bg-white/10">${esc(tr.back)}</a>

      <div class="mt-6 bg-white text-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 relative">
        ${from === 'tutor' ? '' : `
          <form method="POST" action="/api/student/favorites/toggle">
            <input type="hidden" name="tutor_id" value="${tutor.id}" />
            <input type="hidden" name="action" value="${isFav ? 'remove' : 'add'}" />
            <input type="hidden" name="redirect" value="/${locale}/education/tutor/profile?slug=${encodeURIComponent(slug)}" />
            <button type="submit" class="heart" aria-label="Toggle favorite">
<svg viewBox="0 0 24 24" width="18" height="18"
                ${isFav ? 'fill="#ef4444" stroke="#ef4444"' : 'fill="none" stroke="rgba(55,65,81,.8)"'}
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
              </svg>
            </button>
          </form>
        `}
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

      <div class="mt-6 bg-white text-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-3">${esc(tr.disclaimerTitle)}</h2>
        <ul class="text-slate-600 space-y-2 text-sm">
          <li>${esc(tr.disclaimer1)}</li>
          <li>${esc(tr.disclaimer2)}</li>
          <li>${esc(tr.disclaimer3)}</li>
        </ul>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
