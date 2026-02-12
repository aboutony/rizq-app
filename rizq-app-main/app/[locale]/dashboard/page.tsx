import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getLessonRequests, getTutorBySlug } from '@/lib/data';

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
  const t = await getTranslations('Dashboard');
  const locale = params?.locale || 'en';

  const tutor = await getTutorBySlug('farah-fayad');
  const lessonRequests = tutor ? await getLessonRequests(tutor.id) : [];

  const html = `
  <div class="min-h-screen bg-[#0d1324] text-white">
    <div class="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">${esc(t('title'))}</h1>

      <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        
        <div class="md:col-span-2 md:row-span-2 bg-white text-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-semibold mb-4">${esc(t('lessonRequests'))}</h2>
            <div class="space-y-4">
              ${lessonRequests.length === 0 ? `
                <div class="p-4 bg-slate-50 rounded-2xl text-slate-500">No lesson requests yet.</div>
              ` : lessonRequests.map((req) => `
                <div class="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div class="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div>
                    <p class="font-semibold text-slate-700">${esc(req.student_name)}</p>
                    <p class="text-sm text-slate-500">${esc(req.lesson_type_label)} • ${esc(req.duration_minutes)} min</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <button class="mt-6 w-full py-3 bg-[#0d1324] text-white rounded-2xl font-medium hover:bg-[#111a33]">
            ${esc(t('viewAll'))}
          </button>
        </div>

        <a href="/${esc(locale)}/education/calendar" class="md:col-span-2 bg-white text-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 block hover:shadow-md transition">
          <h2 class="text-lg font-semibold mb-4">${esc(t('nextLesson'))}</h2>
          ${lessonRequests[0] ? `
            <div class="flex items-center gap-4">
              <div class="text-center bg-cyan-50 p-2 rounded-xl min-w-[60px]">
                <p class="text-xs uppercase text-cyan-600 font-bold">${esc(formatDate(new Date(lessonRequests[0].requested_start_at_utc)).split(' ')[0])}</p>
                <p class="text-xl font-bold text-cyan-700">${esc(formatDate(new Date(lessonRequests[0].requested_start_at_utc)).split(' ')[1])}</p>
              </div>
              <p class="font-medium text-slate-700">${esc(lessonRequests[0].lesson_type_label)}</p>
            </div>
          ` : `
            <p class="text-slate-500">No upcoming lessons.</p>
          `}
        </a>

        <div class="md:col-span-1 bg-indigo-600 p-6 rounded-3xl text-white flex flex-col justify-between">
          <p class="text-indigo-100 text-sm">${esc(t('monthlyEarnings'))}</p>
          <p class="text-2xl font-bold mt-2">$0.00</p>
        </div>

        <div class="md:col-span-1 bg-white text-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100">
          <p class="text-slate-500 text-sm">${esc(t('activeStudents'))}</p>
<p class="text-2xl font-bold mt-2">${esc(lessonRequests.length)}</p>
        </div>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
