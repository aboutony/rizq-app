import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center flex-1 px-8 py-12 sm:px-12 lg:flex-none lg:w-[500px]">
        <div className="w-full max-w-sm mx-auto">
          {/* RIZQ Logo Placeholder */}
          <div className="mb-10 text-2xl font-bold italic tracking-tighter text-slate-900">rizq</div>
          
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t('title')}</h1>
          <p className="mt-2 text-sm text-slate-600">{t('subtitle')}</p>

          <form className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">{t('emailLabel')}</label>
              <input type="email" required className="block w-full px-4 py-3 mt-2 border rounded-2xl border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">{t('passwordLabel')}</label>
              <input type="password" required className="block w-full px-4 py-3 mt-2 border rounded-2xl border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" />
            </div>
            <button type="submit" className="w-full py-4 font-semibold text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800">
              {t('submit')}
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-slate-600 hover:underline cursor-pointer">{t('forgotPassword')}</p>
            <p className="text-sm font-semibold text-slate-900 hover:underline cursor-pointer">{t('signUp')}</p>
          </div>
        </div>
      </div>

      {/* Right Side: Educational Visuals for Lebanon */}
      <div className="relative hidden w-0 flex-1 lg:block bg-slate-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="w-24 h-24 mb-8 bg-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center border border-white/20">
            <span className="text-4xl font-bold italic">r</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Empowering Lebanese Education</h2>
          <p className="max-w-md text-slate-400">Manage your tutoring schedule, student progress, and tuition payments in one secure place.</p>
        </div>
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
    </div>
  );
}
