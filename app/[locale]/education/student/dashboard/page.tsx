import React from 'react';

type Params = { params: { locale?: string } };

export default function StudentDashboard({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      logout:'Logout', confirmed:'Confirmed', date:'Tue, 12 Apr · 3:30 PM',
      title:'Math Tutoring · Grade 6', tutor:'Tutor: Sarah Al‑Fayed · Online',
      join:'Join Session', reschedule:'Reschedule',
      <div class="card">
  <h3>${t.quick}</h3>
  <div class="actions" style="display:flex;justify-content:center">
    <a class="btn ghost" href="#book">${t.book}</a>
  </div>
  <div id="book" style="margin-top:12px;text-align:center">
    <a class="btn" href="#back">Book Session</a>
  </div>
  <div id="back" style="margin-top:10px;text-align:center">
    <a class="btn ghost" href="#">Go Back</a>
  </div>
</div>
      progress:'Student Progress', attendance:'Attendance', assignments:'Assignments', focus:'Focus Score',
      recent:'Recent Messages', msg1:'Please review Chapter 3 before next session.', msg2:'Your invoice is available.'
    },
    ar: {
      logout:'تسجيل الخروج', confirmed:'مؤكد', date:'الثلاثاء، 12 أبريل · 3:30 م',
      title:'درس رياضيات · الصف السادس', tutor:'المدرّسة: سارة الفايد · أونلاين',
      join:'انضم للجلسة', reschedule:'إعادة الجدولة',
      quick:'إجراءات سريعة', book:'احجز جلسة جديدة', message:'مراسلة المدرّس', calendar:'عرض التقويم',
      progress:'تقدم الطالب', attendance:'الحضور', assignments:'الواجبات', focus:'معدل التركيز',
      recent:'الرسائل الأخيرة', msg1:'يرجى مراجعة الفصل الثالث قبل الجلسة القادمة.', msg2:'الفاتورة متاحة الآن.'
    },
    fr: {
      logout:'Déconnexion', confirmed:'Confirmé', date:'Mar, 12 Avr · 3:30 PM',
      title:'Cours de maths · 6e', tutor:'Tuteur : Sarah Al‑Fayed · En ligne',
      join:'Rejoindre', reschedule:'Replanifier',
      quick:'Actions rapides', book:'Réserver une séance', message:'Contacter le tuteur', calendar:'Voir le calendrier',
      progress:'Progrès de l’élève', attendance:'Présence', assignments:'Devoirs', focus:'Score de concentration',
      recent:'Messages récents', msg1:'Veuillez revoir le chapitre 3 avant la prochaine séance.', msg2:'Votre facture est disponible.'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--card);border-bottom:1px solid var(--border)}
    .dashboard{padding:20px;display:grid;gap:20px}
    .panel{display:grid;gap:20px;max-width:420px;margin:0 auto;width:100%}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .muted{color:var(--muted)}
    .pill{background:#e7f0ff;color:#1956e3;padding:4px 10px;border-radius:20px;font-size:12px}
    .btn{background:var(--primary);color:white;border:none;padding:10px 14px;border-radius:10px;font-weight:600;cursor:pointer}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
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
    <div><a class="btn ghost" href="/${locale}/logout">${t.logout}</a></div>
  </header>

  <main class="dashboard">
    <section class="panel panel--hero">
      <div class="card booking">
        <div class="booking__meta">
<span class="pill">${t.confirmed}</span>
          <span class="muted">${t.date}</span>
        </div>
        <h2>${t.title}</h2>
        <p class="muted">${t.tutor}</p>
        <div class="booking__cta">
          <button class="btn">${t.join}</button>
          <button class="btn ghost">${t.reschedule}</button>
        </div>
      </div>

      <div class="card">
        <h3>${t.quick}</h3>
        <div class="actions">
  <a class="btn ghost" href="/${locale}/education/student/lesson">${t.book}</a>
  <button class="btn ghost">${t.message}</button>
  <button class="btn ghost">${t.calendar}</button>
</div>
      </div>
    </section>

    <aside class="panel">
      <div class="card">
        <h3>${t.progress}</h3>
        <ul class="list">
          <li><span>${t.attendance}</span><strong>96%</strong></li>
          <li><span>${t.assignments}</span><strong>8/10</strong></li>
          <li><span>${t.focus}</span><strong>4.7</strong></li>
        </ul>
      </div>

      <div class="card">
        <h3>${t.recent}</h3>
        <div class="message">
          <strong>Sarah Al‑Fayed</strong>
          <p class="muted">${t.msg1}</p>
        </div>
        <div class="message">
          <strong>Admin</strong>
          <p class="muted">${t.msg2}</p>
        </div>
      </div>
    </aside>
  </main>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}


