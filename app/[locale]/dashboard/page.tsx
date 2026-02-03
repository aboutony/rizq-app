import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">{t('title')}</h1>

      {/* The Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
        
        {/* Card 1: Main Lesson Requests (The Large Tile) */}
        <div className="md:col-span-2 md:row-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">3 New</span>
              <h2 className="text-xl font-semibold text-slate-800">{t('lessonRequests')}</h2>
            </div>
            {/* List content goes here */}
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
                <div>
                  <p className="font-semibold text-slate-700">Ahmed Al-Farsi</p>
                  <p className="text-sm text-slate-500">Mathematics • Grade 10</p>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 transition-colors">
            {t('viewAll')}
          </button>
        </div>

        {/* Card 2: Quick Schedule (Medium Tile) */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">{t('nextLesson')}</h2>
          <div className="flex items-center gap-4 py-2">
            <div className="text-center bg-cyan-50 p-2 rounded-xl min-w-[60px]">
              <p className="text-xs uppercase text-cyan-600 font-bold">Oct</p>
              <p className="text-xl font-bold text-cyan-700">15</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Sarah Al-Rahman</p>
              <p className="text-sm text-slate-500">5:00 PM - 6:30 PM</p>
            </div>
          </div>
        </div>

        {/* Card 3: Performance Stats (Small Tile) */}
        <div className="md:col-span-1 bg-indigo-600 p-6 rounded-3xl shadow-sm text-white flex flex-col justify-between hover:opacity-95 transition-opacity">
          <p className="text-indigo-100 text-sm">{t('monthlyEarnings')}</p>
          <p className="text-2xl font-bold mt-2">$1,240.00</p>
        </div>

        {/* Card 4: Student Growth (Small Tile) */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <p className="text-slate-500 text-sm">{t('activeStudents')}</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">12</p>
        </div>

      </div>
    </div>
  );
}
