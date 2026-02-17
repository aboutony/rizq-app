import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorDashboard({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      logout:'Logout',
      active:'Subscription Active',
      expired:'Subscription Expired',
      renew:'Renew',
      locked:'Your subscription expired. Data is hidden until you renew.',
      earned:'Total Earned',
      owed:'Total Owed',
      pending:'Pending Payments',
      activeStudents:'Active Students',
      totalStudents:'Total Students',
      rating:'Rating',
      reviews:'reviews',
      requests:'Lesson Requests',
      approve:'Approve',
      reschedule:'Reschedule',
      decline:'Decline',
      reason:'Decline reason',
      reason1:'Schedule conflict',
      reason2:'Not available',
      rescheduleRequests:'Reschedule Requests',
      activity:'Recent Activity',
      calendar:'Scheduling Calendar',
      month:'October 2023',
      mode:'Mode',
      online:'Online',
      location:'Location',
      studentHome:"Student's home",
      createLesson:'Create Lesson',
      homework:'Homework',
      notes:'Notes',
      save:'Save',
      newCount:'3 New',
      wants:'wants Thu 6:00 PM',
      mon:'Mon', tue:'Tue', wed:'Wed', thu:'Thu', fri:'Fri', sat:'Sat', sun:'Sun',
      act1:'Rana K. approved · 2h ago',
      act2:'Payment marked paid · 4h ago',
      act3:'Reschedule accepted · yesterday',
      office:'My Office',
      register:'Registration',
      directory:'Tutor Directory',
      createTutor:'Create Tutor Profile'
    },
    ar: {
      logout:'تسجيل الخروج',
      active:'الاشتراك نشط',
      expired:'الاشتراك منتهي',
      renew:'تجديد',
      locked:'انتهى اشتراكك. البيانات مخفية حتى التجديد.',
      earned:'إجمالي المحصّل',
      owed:'إجمالي المستحق',
      pending:'مدفوعات معلّقة',
      activeStudents:'الطلاب النشطون',
      totalStudents:'إجمالي الطلاب',
      rating:'التقييم',
      reviews:'تقييمًا',
      requests:'طلبات الدروس',
      approve:'موافقة',
      reschedule:'إعادة جدولة',
      decline:'رفض',
      reason:'سبب الرفض',
      reason1:'تعارض في الجدول',
      reason2:'غير متاح',
      rescheduleRequests:'طلبات إعادة الجدولة',
      activity:'النشاط الأخير',
      calendar:'تقويم الجدولة',
      month:'أكتوبر 2023',
      mode:'النمط',
      online:'أونلاين',
      location:'الموقع',
      studentHome:'منزل الطالب',
      createLesson:'إنشاء درس',
      homework:'واجب',
      notes:'ملاحظات',
      save:'حفظ',
      newCount:'٣ جديد',
      wants:'يريد الخميس 6:00 مساءً',
      mon:'الإث', tue:'الث', wed:'الأر', thu:'الخ', fri:'الج', sat:'السب', sun:'الأحد',
      act1:'رنا ك. تمت الموافقة · قبل ساعتين',
      act2:'تم تأكيد الدفع · قبل 4 ساعات',
      act3:'تم قبول إعادة الجدولة · أمس',
      office:'مكتبي',
      register:'التسجيل',
      directory:'دليل المدرّسين',
      createTutor:'إنشاء ملف مدرس'
    },
    fr: {
      logout:'Déconnexion',
      active:'Abonnement Actif',
      expired:'Abonnement Expiré',
      renew:'Renouveler',
      locked:'Votre abonnement a expiré. Les données sont masquées jusqu’au renouvellement.',
      earned:'Total perçu',
      owed:'Total dû',
      pending:'Paiements en attente',
      activeStudents:'Élèves actifs',
      totalStudents:'Total élèves',
      rating:'Note',
      reviews:'avis',
      requests:'Demandes de cours',
      approve:'Approuver',
      reschedule:'Replanifier',
      decline:'Refuser',
      reason:'Raison du refus',
      reason1:'Conflit d’horaire',
      reason2:'Non disponible',
      rescheduleRequests:'Demandes de replanification',
activity:'Activité récente',
      calendar:'Calendrier',
      month:'Octobre 2023',
      mode:'Mode',
      online:'En ligne',
      location:'Lieu',
      studentHome:"Chez l'élève",
      createLesson:'Créer une leçon',
      homework:'Devoir',
      notes:'Notes',
      save:'Enregistrer',
      newCount:'3 nouveaux',
      wants:'souhaite jeu 18:00',
      mon:'Lun', tue:'Mar', wed:'Mer', thu:'Jeu', fri:'Ven', sat:'Sam', sun:'Dim',
      act1:'Rana K. approuvé · il y a 2 h',
      act2:'Paiement marqué · il y a 4 h',
      act3:'Replanification acceptée · hier',
      office:'Mon bureau',
      register:'Inscription',
      directory:'Annuaire',
      createTutor:'Créer un profil de tuteur'
    }
  }[locale as 'en'|'ar'|'fr'];

  const subscriptionActive = true;

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--card);border-bottom:1px solid var(--border)}
    .status{padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700}
    .active{background:rgba(16,185,129,.15);color:var(--primary)}
    .expired{background:rgba(239,68,68,.15);color:#ef4444}
    .btn{background:var(--primary);color:white;border:none;padding:10px 14px;border-radius:10px;font-weight:600;cursor:pointer}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block}
    .dashboard{padding:20px;display:grid;gap:20px;max-width:1200px;margin:0 auto}
    .grid{display:grid;gap:12px}
    .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .muted{color:var(--muted)}
    .locked{opacity:0.15;filter:blur(2px);pointer-events:none}
    .row{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
    .tag{padding:4px 10px;border-radius:999px;font-size:12px;background:var(--border);color:var(--text)}
    .actions{display:flex;gap:8px;flex-wrap:wrap}
    .input, select, textarea {width:100%;padding:10px;border:1px solid var(--border);border-radius:10px;background:var(--card);color:var(--text)}
    @media (min-width: 900px){ .dashboard{grid-template-columns:2fr 1fr} }
    .calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center;font-size:13px;color:var(--text)}
    .day{height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px}
    .day.active{background:var(--primary);color:#fff;font-weight:700}
    .weekday{font-size:12px;color:var(--muted);text-align:center}
  </style>

  <header class="topbar">
    <div style="font-weight:800">RIZQ</div>
    <div class="row">
      <span class="status ${subscriptionActive ? 'active' : 'expired'}">${subscriptionActive ? t.active : t.expired}</span>
      <a class="btn ghost" href="/${locale}/education/tutor/create">${t.createTutor}</a>
      <a class="btn ghost" href="/${locale}/education/tutor/office">${t.office}</a>
      <a class="btn ghost" href="/${locale}/education/tutor/register">${t.register}</a>
      <a class="btn ghost" href="/${locale}/education/tutors">${t.directory}</a>
      <a class="btn ghost" href="/${locale}/logout">${t.logout}</a>
      ${subscriptionActive ? '' : `<a class="btn ghost" href="/${locale}/logout">${t.renew}</a>`}
    </div>
  </header>

  ${subscriptionActive ? '' : `<div style="padding:12px 20px;background:rgba(255,193,7,.2);border-bottom:1px solid var(--border);font-weight:600;color:var(--text);">${t.locked}</div>`}

  <main class="dashboard" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">
    <section class="${subscriptionActive ? '' : 'locked'}">
      <div class="kpis">
<div class="card"><div class="muted">${t.earned}</div><div style="font-size:22px;font-weight:800">$1,240</div></div>
        <div class="card"><div class="muted">${t.owed}</div><div style="font-size:22px;font-weight:800">$320</div></div>
        <div class="card"><div class="muted">${t.pending}</div><div style="font-size:22px;font-weight:800">5</div></div>
        <div class="card"><div class="muted">${t.activeStudents}</div><div style="font-size:22px;font-weight:800">12</div></div>
        <div class="card"><div class="muted">${t.totalStudents}</div><div style="font-size:22px;font-weight:800">64</div></div>
        <div class="card">
          <div class="muted">⭐️ ${t.rating}</div>
          <div style="font-size:22px;font-weight:800">4.8</div>
          <div class="muted">128 ${t.reviews}</div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="row">
          <h3>${t.requests}</h3>
          <span class="tag">${t.newCount}</span>
          <a class="btn ghost" href="/${locale}/education/tutor/lesson">${t.createLesson}</a>
        </div>
        <div style="margin-top:12px" class="grid">
          <div class="row">
            <div>
              <div style="font-weight:700">Rana K.</div>
              <div class="muted">Math · 60 min · Tue 5:00 PM</div>
              <div class="muted">${t.mode}: ${t.online} • ${t.location}: ${t.studentHome}</div>
            </div>
            <div class="actions">
              <a class="btn" href="/${locale}/education/tutor/action?action=approve&kind=request">${t.approve}</a>
              <a class="btn ghost" href="/${locale}/education/tutor/action?action=reschedule&kind=request">${t.reschedule}</a>
              <a class="btn ghost" href="/${locale}/education/tutor/action?action=decline&kind=request">${t.decline}</a>
            </div>
          </div>
          <div class="row">
            <select class="input">
              <option>${t.reason}</option>
              <option>${t.reason1}</option>
              <option>${t.reason2}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <h3>${t.rescheduleRequests}</h3>
        <div class="row" style="margin-top:10px">
          <div><strong>Hadi M.</strong> <span class="muted">${t.wants}</span></div>
          <div class="actions">
            <a class="btn" href="/${locale}/education/tutor/action?action=approve&kind=reschedule">${t.approve}</a>
            <a class="btn ghost" href="/${locale}/education/tutor/action?action=reschedule&kind=reschedule">${t.reschedule}</a>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <h3>${t.homework}</h3>
        <div class="grid">
          <label>${t.notes}</label>
          <textarea class="input" rows="3"></textarea>
          <label>${t.homework}</label>
          <textarea class="input" rows="2"></textarea>
          <button class="btn">${t.save}</button>
        </div>
      </div>
    </section>

    <aside class="${subscriptionActive ? '' : 'locked'}">
      <div class="card" id="calendar">
        <h3>${t.calendar}</h3>
        <div class="muted" style="margin:8px 0">${t.month}</div>
        <div class="calendar" style="margin-bottom:8px">
          <div class="weekday">${t.mon}</div><div class="weekday">${t.tue}</div><div class="weekday">${t.wed}</div>
          <div class="weekday">${t.thu}</div><div class="weekday">${t.fri}</div><div class="weekday">${t.sat}</div><div class="weekday">${t.sun}</div>
        </div>
        <div class="calendar">
          <div class="day">1</div><div class="day">2</div><div class="day">3</div><div class="day">4</div><div class="day">5</div><div class="day active">6</div><div class="day">7</div>
          <div class="day">8</div><div class="day">9</div><div class="day">10</div><div class="day">11</div><div class="day">12</div><div class="day">13</div><div class="day">14</div>
</div>
      </div>

      <div class="card" style="margin-top:16px">
        <h3>${t.activity}</h3>
        <div class="muted" style="margin-top:8px">${t.act1}</div>
        <div class="muted">${t.act2}</div>
        <div class="muted">${t.act3}</div>
      </div>
    </aside>
  </main>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
