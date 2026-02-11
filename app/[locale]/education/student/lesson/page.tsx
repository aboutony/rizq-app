import React from 'react';

type Params = { params: { locale?: string } };

export default function StudentLessonPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Book a Session',
      subtitle:'Fill the details, then choose time.',
      lessonTitle:'Lesson Title',
      lessonTitlePh:'e.g., Grade 9 Algebra Crash Course',
      description:'Description',
      descriptionPh:'Short overview of the lesson...',
      mode:'Mode',
      modeOnline:'Online',
      modeInPerson:'In‑person',
      location:'Location',
      locTutor:'Tutor\'s place',
      locSchool:'School',
      locStudent:'Student\'s home',
      duration:'Duration',
      durationPh:'60 min',
      price:'Price',
      pricePh:'$45',
      language:'Language',
      langArabic:'Arabic',
      langEnglish:'English',
      langFrench:'French',
      availability:'Availability Note',
      availabilityPh:'Weekdays after 4 PM',
      choose:'Choose Date & Time',
      back:'Go Back'
    },
    ar: {
      title:'احجز جلسة',
      subtitle:'املأ التفاصيل ثم اختر الوقت.',
      lessonTitle:'عنوان الدرس',
      lessonTitlePh:'مثال: دورة مكثفة في الجبر للصف التاسع',
      description:'الوصف',
      descriptionPh:'نبذة قصيرة عن الدرس...',
      mode:'الوضع',
      modeOnline:'أونلاين',
      modeInPerson:'حضوري',
      location:'الموقع',
      locTutor:'مكان المدرّس',
      locSchool:'المدرسة',
      locStudent:'منزل الطالب',
      duration:'المدة',
      durationPh:'60 دقيقة',
      price:'السعر',
      pricePh:'45$',
      language:'اللغة',
      langArabic:'العربية',
      langEnglish:'الإنجليزية',
      langFrench:'الفرنسية',
      availability:'ملاحظة التوفر',
      availabilityPh:'أيام الأسبوع بعد 4 مساءً',
      choose:'اختر التاريخ والوقت',
      back:'رجوع'
    },
    fr: {
      title:'Réserver une séance',
      subtitle:'Renseignez les détails ثم choisissez l’heure.',
      lessonTitle:'Titre du cours',
      lessonTitlePh:'ex. Cours intensif d’algèbre 3e',
      description:'Description',
      descriptionPh:'Bref aperçu du cours...',
      mode:'Mode',
      modeOnline:'En ligne',
      modeInPerson:'En présentiel',
      location:'Lieu',
      locTutor:'Chez le tuteur',
      locSchool:'École',
      locStudent:'Chez l’élève',
      duration:'Durée',
      durationPh:'60 min',
      price:'Prix',
      pricePh:'45 $',
      language:'Langue',
      langArabic:'Arabe',
      langEnglish:'Anglais',
      langFrench:'Français',
      availability:'Note de disponibilité',
      availabilityPh:'En semaine après 16 h',
      choose:'Choisir la date et l’heure',
      back:'Retour'
    }
  }[locale as 'en'|'ar'|'fr'];

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
    .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
  </style>

  <div class="wrap">
<div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.subtitle}</div>

      <div class="grid">
        <label>${t.lessonTitle}</label>
        <input class="input" placeholder="${t.lessonTitlePh}"/>

        <label>${t.description}</label>
        <textarea class="input" rows="4" placeholder="${t.descriptionPh}"></textarea>

        <div class="row">
          <div>
            <label>${t.mode}</label>
            <select class="input">
              <option>${t.modeOnline}</option>
              <option>${t.modeInPerson}</option>
            </select>
          </div>
          <div>
            <label>${t.location}</label>
            <select class="input">
              <option>${t.locTutor}</option>
              <option>${t.locSchool}</option>
              <option>${t.locStudent}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div>
            <label>${t.duration}</label>
            <input class="input" placeholder="${t.durationPh}"/>
          </div>
          <div>
            <label>${t.price}</label>
            <input class="input" placeholder="${t.pricePh}"/>
          </div>
        </div>

        <div class="row">
          <div>
            <label>${t.language}</label>
            <select class="input">
              <option>${t.langArabic}</option>
              <option>${t.langEnglish}</option>
              <option>${t.langFrench}</option>
            </select>
          </div>
          <div>
            <label>${t.availability}</label>
            <input class="input" placeholder="${t.availabilityPh}"/>
          </div>
        </div>
      </div>

      <div class="section">
        <a class="btn" href="/${locale}/education/calendar">${t.choose}</a>
      </div>

      <div class="section">
        <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
