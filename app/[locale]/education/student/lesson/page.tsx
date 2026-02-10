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
    .input, select, textarea{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:#f1f5f9;color:#64748b}
    .section{margin-top:18px}
    .section h3{font-size:15px;margin-bottom:8px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">Lesson Listing</div>
      <div class="muted">Student view — read‑only.</div>

      <div class="grid">
        <label>Lesson Title</label>
        <input class="input" value="Grade 9 Algebra Crash Course" disabled/>

        <label>Description</label>
        <textarea class="input" rows="4" disabled>Short overview of the lesson...</textarea>

        <label>Mode</label>
        <input class="input" value="Online" disabled/>

        <label>Location</label>
        <input class="input" value="Tutor's place" disabled/>
      </div>

      <div class="section">
        <h3>Categories</h3>
        <input class="input" value="General Education → Middle School" disabled/>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
