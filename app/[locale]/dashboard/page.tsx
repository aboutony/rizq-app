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

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(d);
}

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  noStore();

  const locale = params?.locale || 'en';
  const isAr = locale === 'ar';

  const t = {
    en: {
      title: 'Tutor Dashboard',
      lessonRequests: 'Lesson Requests',
      viewAll: 'View All',
      nextLesson: 'Scheduling Calendar',
      noUpcoming: 'No upcoming lessons.',
      monthlyEarnings: 'Monthly Earnings',
      activeStudents: 'Active Students',
      noRequests: 'No lesson requests yet.'
    },
    ar: {
      title: 'لوحة المعلم',
      lessonRequests: 'طلبات الدروس',
      viewAll: 'عرض الكل',
      nextLesson: 'جدول المواعيد',
      noUpcoming: 'لا توجد دروس قادمة.',
      monthlyEarnings: 'الأرباح الشهرية',
      activeStudents: 'الطلاب النشطون',
      noRequests: 'لا توجد طلبات دروس بعد.'
    },
    fr: {
      title: 'Tableau de bord du tuteur',
      lessonRequests: 'Demandes de cours',
      viewAll: 'Voir tout',
      nextLesson: 'Calendrier de planification',
      noUpcoming: 'Aucun cours à venir.',
      monthlyEarnings: 'Gains mensuels',
      activeStudents: 'Étudiants actifs',
      noRequests: 'Aucune demande de cours.'
    }
  } as const;

  const tr = t[locale as 'en' | 'ar' | 'fr'] || t.en;

  const client = await pool.connect();
  let lessonRequests: any[] = [];
  try {
    const tutorRes = await client.query(
      `SELECT id FROM tutors WHERE slug = $1 LIMIT 1`,
      ['farah-fayad']
    );
    const tutorId = tutorRes.rows[0]?.id;
    if (tutorId) {
      const res = await client.query(
        `SELECT 
           l.id, l.student_name, l.duration_minutes, l.requested_start_at_utc, l.created_at, lt.label as lesson_type_label
         FROM lessons l
         JOIN lesson_types lt ON l.lesson_type_id = lt.id
         WHERE l.tutor_id = $1 AND l.status = 'requested'
         ORDER BY l.created_at ASC`,
        [tutorId]
      );
      lessonRequests = res.rows || [];
    }
  } finally {
    client.release();
  }

  const html = `
  <div dir="${isAr ? 'rtl' : 'ltr'}" class="p-4 md:p-8 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-slate-800">${esc(tr.title)}</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">

      <div class="md:col-span-2 md:row-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-semibold text-slate-800 mb-4">${esc(tr.lessonRequests)}</h2>
          <div class="space-y-4">
            ${lessonRequests.length === 0 ? `
              <div class="p-4 bg-slate-50 rounded-2xl text-slate-500">${esc(tr.noRequests)}</div>
` : lessonRequests.map((req) => `
              <div class="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                <div class="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <p class="font-semibold text-slate-700">${esc(req.student_name)}</p>
                  <p class="text-sm text-slate-500">
                    ${esc(req.lesson_type_label)} • ${esc(req.duration_minutes)} min
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <button class="mt-6 w-full py-3 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800">
          ${esc(tr.viewAll)}
        </button>
      </div>

      <a href="/${esc(locale)}/education/calendar" class="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 block hover:shadow-md transition">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">${esc(tr.nextLesson)}</h2>
        ${lessonRequests[0] ? `
          <div class="flex items-center gap-4">
            <div class="text-center bg-cyan-50 p-2 rounded-xl min-w-[60px]">
              <p class="text-xs uppercase text-cyan-600 font-bold">${esc(formatDate(new Date(lessonRequests[0].requested_start_at_utc)).split(' ')[0])}</p>
              <p class="text-xl font-bold text-cyan-700">${esc(formatDate(new Date(lessonRequests[0].requested_start_at_utc)).split(' ')[1])}</p>
            </div>
            <p class="font-medium text-slate-700">${esc(lessonRequests[0].lesson_type_label)}</p>
          </div>
        ` : `
          <p class="text-slate-500">${esc(tr.noUpcoming)}</p>
        `}
      </a>

      <div class="md:col-span-1 bg-indigo-600 p-6 rounded-3xl text-white flex flex-col justify-between">
        <p class="text-indigo-100 text-sm">${esc(tr.monthlyEarnings)}</p>
        <p class="text-2xl font-bold mt-2">$0.00</p>
      </div>

      <div class="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <p class="text-slate-500 text-sm">${esc(tr.activeStudents)}</p>
        <p class="text-2xl font-bold text-slate-800 mt-2">${esc(lessonRequests.length)}</p>
      </div>

    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
