import { getTranslations } from 'next-intl/server';
import { getLessonRequests, getTutorBySlug } from '@/lib/data';

function formatDay(d: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d);
}
function formatDate(d: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(d);
}
function formatTime(d: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(d);
}

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('Dashboard');
  const locale = params?.locale || 'en';

  const tutor = await getTutorBySlug('farah-fayad');
  const lessonRequests = tutor ? await getLessonRequests(tutor.id) : [];
return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-between px-5 py-4 bg-white shadow-sm">
        <button className="text-2xl">☰</button>
        <div className="font-bold tracking-wide">RIZQ</div>
        <a href={`/${locale}/logout`} className="text-xs font-semibold text-slate-600">{t('logout')}</a>
      </div>

      <div className="px-5 py-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-900">{t('lessonRequests')}</h1>
          <span className="text-xs text-emerald-500 font-semibold">
            {lessonRequests.length} {t('newCount')}
          </span>
        </div>

        <div className="space-y-4">
          {lessonRequests.length === 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-slate-500">
              {t('noLessonRequests')}
            </div>
          )}

          {lessonRequests.map((req) => {
            const date = new Date(req.requested_start_at_utc);
            const name =
              locale.startsWith('ar') ? req.student_name_ar || req.student_name :
              locale.startsWith('fr') ? req.student_name_fr || req.student_name :
              req.student_name_en || req.student_name;

            const subject =
              locale.startsWith('ar') ? req.lesson_type_label_ar || req.lesson_type_label :
              locale.startsWith('fr') ? req.lesson_type_label_fr || req.lesson_type_label :
              req.lesson_type_label_en || req.lesson_type_label;

            return (
              <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-semibold text-slate-900">{name}</p>
                    <p className="text-sm text-slate-500">
                      {subject} • {req.duration_minutes} min
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    📅 <span>{formatDay(date, locale)}, {formatDate(date, locale)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    🕒 <span>{formatTime(date, locale)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    💵 <span>{t('manualPayment')}</span>
                  </div>
                  <div className="h-5 w-10 rounded-full bg-slate-200 relative">
                    <div className="h-4 w-4 bg-white rounded-full absolute left-1 top-0.5 shadow" />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="py-2 rounded-xl bg-slate-100 text-slate-700 font-medium">
                    {t('reschedule')}
                  </button>
                  <button className="py-2 rounded-xl bg-emerald-500 text-white font-semibold">
                    {t('approve')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
