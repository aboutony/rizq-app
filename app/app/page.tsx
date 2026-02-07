'use client';

import { useRouter } from 'next/navigation';

const languages = [
  { label: 'العربية', code: 'ar' },
  { label: 'Français', code: 'fr' },
  { label: 'English', code: 'en' },
];

export default function LanguageSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Choose Language</h1>
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
              onClick={() => router.push(`/${lang.code}/login`)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
