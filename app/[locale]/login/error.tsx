'use client';

export default function LoginError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-md w-full">
        <h1 className="text-xl font-bold text-slate-900">Login Error</h1>
        <p className="mt-2 text-sm text-slate-600">
          {error?.message || 'Unknown error'}
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs text-slate-400">Digest: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
