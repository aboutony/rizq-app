import { getTranslations } from 'next-intl/server';

export default async function StudentDashboard({
  params
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('StudentDashboard');
  const locale = params?.locale || 'en';

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">{t('title')}</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">{t('upcomingLessons')}</h2>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{t('noLessonsTitle')}</p>
              <p className="text-xs text-slate-500">{t('noLessonsSubtitle')}</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-white font-semibold">
            {t('findTutor')}
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">{t('nextLesson')}</h2>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
              {t('tbd')}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{t('noLessonScheduled')}</p>
              <p className="text-xs text-slate-500">{t('pickTutor')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">{t('activeTutors')}</h2>
          <p className="mt-2 text-2xl font-bold text-slate-900">0</p>
        </div>

        <div className="bg-indigo-600 rounded-3xl p-6 shadow-sm text-white">
          <h2 className="text-sm font-semibold">{t('payments')}</h2>
          <p className="mt-2 text-2xl font-bold">$0.00</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">{t('requests')}</h2>
          <p className="mt-2 text-2xl font-bold text-slate-900">0</p>
        </div>
      </div>
    </div>
  );
}
