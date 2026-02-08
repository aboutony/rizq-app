export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-white px-8 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
      <p className="mt-2 text-slate-600">Upcoming lessons, tutors, and payments will appear here.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">Upcoming Lessons</h2>
          <p className="text-sm text-slate-600 mt-1">No lessons scheduled yet.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">Find a Tutor</h2>
          <p className="text-sm text-slate-600 mt-1">Browse subjects and request a lesson.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">Payments</h2>
          <p className="text-sm text-slate-600 mt-1">Track invoices and receipts.</p>
        </div>
      </div>
    </div>
  );
}
