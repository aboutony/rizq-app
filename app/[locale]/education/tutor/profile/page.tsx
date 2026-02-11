import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorProfile({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Tutor Profile', book:'Book Session', bio:'Bio', reviews:'Reviews', calendar:'Availability Preview',
          bioText:'Experienced tutor with 8+ years teaching Math and Physics. Focused on clarity, confidence, and results.',
          r1:'“Great explanation and very patient.”', r2:'“Helped me improve quickly.”' },
    ar: { title:'ملف المدرّس', book:'احجز جلسة', bio:'نبذة', reviews:'التقييمات', calendar:'معاينة التوفر',
          bioText:'مدرّس خبير بخبرة تزيد عن 8 سنوات في تدريس الرياضيات والفيزياء. يركز على الوضوح والثقة والنتائج.',
          r1:'"شرح ممتاز وصبر كبير."',
          r2:'"ساعدني على التحسن بسرعة."' },
    fr: { title:'Profil du tuteur', book:'Réserver une séance', bio:'Bio', reviews:'Avis', calendar:'Disponibilité',
          bioText:'Tuteur expérimenté avec plus de 8 ans d’enseignement en mathématiques et physique. Axé sur la clarté, la confiance et les résultats.',
          r1:'« Explications claires et très patient. »',
          r2:'« M’a aidé à progresser بسرعة. »' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:760px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;display:inline-block;text-decoration:none}
    .section{margin-top:16px}
    .calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center;font-size:13px;color:var(--text)}
    .day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:9999px}
    .day.active{background:var(--primary);color:#fff;font-weight:700}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">Sarah Al‑Fayed · Math & Physics · 4.8 ★</div>

      <div class="section">
        <a class="btn" href="/${locale}/education/student/lesson">${t.book}</a>
      </div>

      <div class="section">
        <h3>${t.bio}</h3>
        <p class="muted">${t.bioText}</p>
      </div>

      <div class="section">
        <h3>${t.calendar}</h3>
        <div class="calendar" style="margin-top:8px">
          <div class="day">1</div><div class="day">2</div><div class="day active">3</div><div class="day">4</div><div class="day">5</div><div class="day">6</div><div class="day">7</div>
        </div>
      </div>

      <div class="section">
        <h3>${t.reviews}</h3>
        <p class="muted">${t.r1}</p>
        <p class="muted">${t.r2}</p>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
