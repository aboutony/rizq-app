import React from 'react';

type Params = { params: { locale?: string } };

export default function StudentLessonPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:760px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted);font-size:13px}
    .grid{display:grid;gap:12px;margin-top:16px}
    .input, select, textarea{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .section{margin-top:18px}
    .section h3{font-size:15px;margin-bottom:8px}
    .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">Book a Session</div>
      <div class="muted">Fill the details, then choose time.</div>

      <div class="grid">
        <label>Lesson Title</label>
        <input class="input" placeholder="e.g., Grade 9 Algebra Crash Course"/>

        <label>Description</label>
        <textarea class="input" rows="4" placeholder="Short overview of the lesson..."></textarea>

        <div class="row">
          <div>
            <label>Mode</label>
            <select class="input">
              <option>Online</option>
              <option>In-person</option>
            </select>
          </div>
          <div>
            <label>Location</label>
            <select class="input">
              <option>Tutor's place</option>
              <option>School</option>
              <option>Student's home</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div>
            <label>Duration</label>
            <input class="input" placeholder="60 min"/>
          </div>
          <div>
            <label>Price</label>
            <input class="input" placeholder="$45"/>
          </div>
        </div>

        <div class="row">
          <div>
            <label>Language</label>
            <select class="input">
              <option>Arabic</option>
              <option>English</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label>Availability Note</label>
            <input class="input" placeholder="Weekdays after 4 PM"/>
          </div>
        </div>
      </div>

      <div class="section">
        <a class="btn" href="/${locale}/education/calendar">Choose Date & Time</a>
      </div>

      <div class="section">
        <a class="btn ghost" href="/${locale}/education/student/dashboard">Go Back</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
