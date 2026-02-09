import React from 'react';

export default function StudentDashboard() {
  const html = `
  <style>
    :root {
      --bg:#f6f7fb; --card:#fff; --text:#1b1b1f; --muted:#666a73;
      --primary:#20c997; --border:#e6e8ef; --radius:16px;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:#fff;border-bottom:1px solid var(--border)}
    .brand{font-weight:700}
    .dashboard{padding:20px;display:grid;gap:20px}
    .panel{display:grid;gap:20px;max-width:420px;margin:0 auto;width:100%}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .muted{color:var(--muted)}
    .pill{background:#e7f0ff;color:#1956e3;padding:4px 10px;border-radius:20px;font-size:12px}
    .btn{background:var(--primary);color:white;border:none;padding:10px 14px;border-radius:10px;font-weight:600;cursor:pointer}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
    .btn.outline{background:transparent;border:1px solid var(--border);color:var(--text)}
    .actions{display:grid;gap:10px}
    .list{list-style:none}
    .list li{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed var(--border)}
    .list li:last-child{border:none}
    .message{padding:10px 0;border-bottom:1px dashed var(--border)}
    .message:last-child{border:none}
    .booking__meta{display:flex;justify-content:space-between;margin-bottom:10px}
    .booking__cta{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}

    @media (min-width: 900px){
      .dashboard{grid-template-columns:2fr 1fr;max-width:1200px;margin:24px auto;padding:20px 24px}
      .panel{max-width:100%;margin:0}
    }
  </style>

  <header class="topbar">
    <div class="brand">RIZQ</div>
    <div>
      <button class="btn ghost">Logout</button>
    </div>
  </header>

  <main class="dashboard">
    <section class="panel panel--hero">
      <div class="card booking">
        <div class="booking__meta">
          <span class="pill">Confirmed</span>
          <span class="muted">Tue, 12 Apr · 3:30 PM</span>
        </div>
        <h2>Math Tutoring · Grade 6</h2>
        <p class="muted">Tutor: Sarah Al‑Fayed · Online</p>
        <div class="booking__cta">
          <button class="btn">Join Session</button>
          <button class="btn ghost">Reschedule</button>
        </div>
      </div>

      <div class="card">
        <h3>Quick Actions</h3>
        <div class="actions">
          <button class="btn outline">Book New Session</button>
          <button class="btn outline">Message Tutor</button>
          <button class="btn outline">View Calendar</button>
        </div>
      </div>
    </section>

    <aside class="panel">
      <div class="card">
        <h3>Student Progress</h3>
        <ul class="list">
          <li><span>Attendance</span><strong>96%</strong></li>
          <li><span>Assignments</span><strong>8/10</strong></li>
          <li><span>Focus Score</span><strong>4.7</strong></li>
        </ul>
      </div>

      <div class="card">
        <h3>Recent Messages</h3>
        <div class="message">
          <strong>Sarah Al‑Fayed</strong>
          <p class="muted">Please review Chapter 3 before next session.</p>
        </div>
        <div class="message">
          <strong>Admin</strong>
          <p class="muted">Your invoice is available.</p>
        </div>
      </div>
    </aside>
  </main>
  `;
return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
