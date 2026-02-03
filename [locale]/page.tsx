import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* 2026 Gradient Badge */}
      <span className="px-4 py-1.5 mb-6 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full ring-1 ring-inset ring-indigo-700/10">
        {t('welcomeBadge')}
      </span>
      
      {/* High-Impact Heading */}
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        {t('heroTitle')}
      </h1>
      
      <p className="max-w-2xl mt-6 text-lg leading-8 text-slate-600">
        {t('heroSubtitle')}
      </p>

      {/* Glassmorphism Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <Link 
          href="/dashboard"
          className="rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {t('getStarted')}
        </Link>
        <Link 
          href="/about"
          className="rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-all"
        >
          {t('learnMore')}
        </Link>
      </div>
      
      {/* Subtle Background Decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}
