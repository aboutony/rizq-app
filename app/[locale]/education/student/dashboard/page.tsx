'use client';

const copy = {
  en: {
    logout: 'Logout',
    bookLesson: 'Book a Lesson',
    tutor: 'Tutor',
    tutorName: 'Sarah Al‑Fayed',
    tutorTitle: 'Math & Physics Expert',
    studentName: 'Student Name',
    studentPlaceholder: 'Enter full name',
    selectSubject: 'Select Subject',
    math: 'Mathematics',
    physics: 'Physics',
    chem: 'Chemistry',
    monthLabel: 'October 2023',
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
    availableTime: 'Available Time',
    total: 'Total',
    confirmBooking: 'Confirm Booking'
  },
  ar: {
    logout: 'تسجيل الخروج',
    bookLesson: 'احجز درسًا',
    tutor: 'المدرّس',
    tutorName: 'سارة الفايد',
    tutorTitle: 'خبيرة رياضيات وفيزياء',
    studentName: 'اسم الطالب',
    studentPlaceholder: 'أدخل الاسم الكامل',
    selectSubject: 'اختر المادة',
    math: 'رياضيات',
    physics: 'فيزياء',
    chem: 'كيمياء',
    monthLabel: 'أكتوبر 2023',
    mon: 'الإثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس', fri: 'الجمعة', sat: 'السبت', sun: 'الأحد',
    availableTime: 'الوقت المتاح',
    total: 'الإجمالي',
    confirmBooking: 'تأكيد الحجز'
  },
  fr: {
    logout: 'Déconnexion',
    bookLesson: 'Réserver un cours',
    tutor: 'Tuteur',
    tutorName: 'Sarah Al‑Fayed',
    tutorTitle: 'Experte en maths & physique',
    studentName: 'Nom de l’élève',
    studentPlaceholder: 'Entrez le nom complet',
    selectSubject: 'Choisir la matière',
    math: 'Mathématiques',
    physics: 'Physique',
    chem: 'Chimie',
    monthLabel: 'Octobre 2023',
    mon: 'Lun', tue: 'Mar', wed: 'Mer', thu: 'Jeu', fri: 'Ven', sat: 'Sam', sun: 'Dim',
    availableTime: 'Heures disponibles',
    total: 'Total',
    confirmBooking: 'Confirmer la réservation'
  }
};

export default function StudentDashboard() {
  const locale = (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en') as 'en' | 'ar' | 'fr';
  const t = copy[locale] || copy.en;
return
(
    <div className="min-h-screen bg-[#F5F7F7] pb-28">
      <div className="flex items-center justify-between px-5 py-4">
        <a href={`/${locale}/logout`} className="text-xs font-semibold text-slate-500">{t.logout}</a>
        <h1 className="text-lg font-semibold text-slate-900">{t.bookLesson}</h1>
        <div className="text-2xl text-slate-400">⋮</div>
      </div>

      <div className="px-5">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-slate-200 flex items-center justify-center text-lg">👩‍🏫</div>
          <div>
            <p className="text-xs uppercase text-emerald-500 font-semibold">{t.tutor}</p>
            <p className="text-lg font-bold text-slate-900">{t.tutorName}</p>
            <p className="text-sm text-slate-500">{t.tutorTitle}</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">{t.studentName}</h2>
        <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 flex items-center gap-2">
          <span className="text-slate-400">👤</span>
          <input
            className="w-full outline-none text-slate-700 text-sm bg-transparent"
            placeholder={t.studentPlaceholder}
          />
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">{t.selectSubject}</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold">∑ {t.math}</button>
          <button className="px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold">🧪 {t.physics}</button>
          <button className="px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold">🔬 {t.chem}</button>
        </div>
      </div>

      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700">{t.monthLabel}</h2>
          <div className="flex gap-4 text-slate-400 text-lg">‹ ›</div>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
          <div className="grid grid-cols-7 text-xs text-slate-400 mb-2 text-center">
            <span>{t.mon}</span><span>{t.tue}</span><span>{t.wed}</span><span>{t.thu}</span><span>{t.fri}</span><span>{t.sat}</span><span>{t.sun}</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-700">
            {['28','29','30','','','1','2','3','4','5','6','7','8','9','10','11','12','13','14'].map((d, i) => (
              <div key={i} className={`h-10 flex items-center justify-center rounded-full ${d === '8' ? 'bg-emerald-400 text-white font-semibold' : ''}`}>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">{t.availableTime}</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="px-5 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold">04:00 PM</button>
          <button className="px-5 py-2 rounded-2xl bg-emerald-400 text-white text-sm font-semibold">05:00 PM</button>
          <button className="px-5 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold">06:30 PM</button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="max-w-md mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs text-slate-400">{t.total}</p>
            <p className="text-xl font-bold text-slat
e-900">$45.00</p>
          </div>
          <button className="px-6 py-3 rounded-2xl bg-emerald-400 text-white font-semibold shadow-sm">
            {t.confirmBooking}
          </button>
        </div>
      </div>
    </div>
  );
}
