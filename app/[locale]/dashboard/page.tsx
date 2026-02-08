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
