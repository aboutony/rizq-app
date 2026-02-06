import { getTranslations } from 'next-intl/server';
import { getLessonRequests, getTutorBySlug } from '@/lib/data';

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(d);
}

export default async function DashboardPage() {
  const t = await getTranslations('Dashboard');

  const tutor = await getTutorBySlug('farah-fayad');
  const lessonRequests = tutor ? await getLessonRequests(tutor.id) : [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
        
        {/* Main Requests Tile */}
        <div className="md:col-span-2 md:row-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{t('lessonRequests')}</h2>
            <div className="space-y-4">
              {lessonRequests.length === 0 && (
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-500">
                  No lesson requests yet.
                </div>
              )}
              {lessonRequests.map((req) => (
                <div key={req.id} className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-700">{req.student_name}</p>
                    <p className="text-sm text-slate-500">
                      {req.lesson_type_label} • {req.duration_minutes} min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800">
            {t('viewAll')}
          </button>
        </div>

        {/* Schedule Tile */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">{t('nextLesson')}</h2>
          {lessonRequests[0] ? (
            <div className="flex items-center gap-4">
              <div className="text-center bg-cyan-50 p-2 rounded-xl min-w-[60px]">
                <p className="text-xs uppercase text-cyan-600 font-bold">{formatDate(new Date(lessonRequests[0].requested_start_at_utc)).split(' ')[0]}</p>
                <p className="text-xl font-bold text-cyan-700">{formatDate(new Date(lessonRequests[0].requested_start_at_utc)).split(' ')[1]}</p>
              </div>
              <p className="font-medium text-slate-700">{lessonRequests[0].lesson_type_label}</p>
            </div>
          ) : (
            <p className="text-slate-500">No upcoming lessons.</p>
          )}
        </div>

        {/* Earnings Tile */}
        <div className="md:col-span-1 bg-indigo-600 p-6 rounded-3xl text-white flex flex-col justify-between">
          <p className="text-indigo-100 text-sm">{t('monthlyEarnings')}</p>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </div>

        {/* Students Tile */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm">{t('activeStudents')}</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">{lessonRequests.length}</p>
        </div>

      </div>
    </div>
  );
}
