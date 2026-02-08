export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Upcoming Lessons */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Lessons</h2>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div>
              <p className="text-sm font-semibold text-slate-900">No upcoming lessons</p>
              <p className="text-xs text-slate-500">Book a tutor to get started</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-white font-semibold">
            Find a Tutor
          </button>
        </div>

        {/* Right: Next Lesson */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Next Lesson</h2>
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
              TBD
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">No lesson scheduled</p>
              <p className="text-xs text-slate-500">Pick a tutor & time</p>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Active Tutors</h2>
          <p className="mt-2 text-2xl font-bold text-slate-900">0</p>
        </div>

        <div className="bg-indigo-600 rounded-3xl p-6 shadow-sm text-white">
          <h2 className="text-sm font-semibold">Payments</h2>
          <p className="mt-2 text-2xl font-bold">$0.00</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Requests</h2>
          <p className="mt-2 text-2xl font-bold text-slate-900">0</p>
        </div>
      </div>
    </div>
  );
}
