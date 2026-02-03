import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <span className="px-4 py-1.5 mb-6 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full ring-1 ring-inset ring-indigo-700/10">
        {t('welcomeBadge')}
      </span>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        {t('heroTitle')}
      </h1>
      <p className="max-w-2xl mt-6 text-lg leading-8 text-slate-600">
        {t('heroSubtitle')}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <Link href="/dashboard" className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
          {t('getStarted')}
        </Link>
        <Link href="/about" className="rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-all">
          {t('learnMore')}
        </Link>
      </div>
    </div>
  );
}
