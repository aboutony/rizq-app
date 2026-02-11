import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorRegister({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Tutor Registration & Subscription',
      subtitle:'Provide all required details to build your profile.',
      identity:'Identity',
      photo:'Professional Photo',
      firstName:'First Name',
      lastName:'Family Name',
      nameEn:'Name (English)',
      nameAr:'Name (Arabic)',
      nameFr:'Name (French)',
      contact:'Contact',
      phone:'Mobile Number (locked)',
      email:'Email (optional)',
      scope:'Teaching Scope',
      languages:'Languages you teach',
      locations:'Locations / Cities',
      levels:'Education Levels',
      subjects:'Subjects',
      logistics:'Logistics',
      availability:'Availability (days & time slots)',
      travel:'Travel Preference',
      travelHome:'I visit students at home',
      travelStudio:'Student comes to my location',
      save:'Save & Continue',
      add:'Add'
    },
    ar: {
      title:'تسجيل المدرّس والاشتراك',
      subtitle:'أدخل كل التفاصيل المطلوبة لإنشاء ملفك.',
      identity:'الهوية',
      photo:'صورة احترافية',
      firstName:'الاسم الأول',
      lastName:'اسم العائلة',
      nameEn:'الاسم (بالإنجليزية)',
      nameAr:'الاسم (بالعربية)',
      nameFr:'الاسم (بالفرنسية)',
      contact:'بيانات التواصل',
      phone:'رقم الجوال (مقفل)',
      email:'البريد الإلكتروني (اختياري)',
      scope:'نطاق التدريس',
      languages:'اللغات التي تدرّسها',
      locations:'المناطق / المدن',
      levels:'المستويات التعليمية',
      subjects:'المواد',
      logistics:'اللوجستيات',
      availability:'التوفر (أيام وأوقات)',
      travel:'تفضيل التنقل',
      travelHome:'أزور الطلاب في منازلهم',
      travelStudio:'يأتي الطالب إلى موقعي',
      save:'حفظ والمتابعة',
      add:'إضافة'
    },
    fr: {
      title:'Inscription du tuteur & abonnement',
      subtitle:'Fournissez جميع التفاصيل المطلوبة لبناء ملفك.',
      identity:'Identité',
      photo:'Photo professionnelle',
      firstName:'Prénom',
      lastName:'Nom de famille',
      nameEn:'Nom (Anglais)',
      nameAr:'Nom (Arabe)',
      nameFr:'Nom (Français)',
      contact:'Contact',
      phone:'Numéro mobile (verrouillé)',
      email:'Email (optionnel)',
      scope:'Champ d’enseignement',
      languages:'Langues enseignées',
      locations:'Lieux / Villes',
      levels:'Niveaux d’études',
      subjects:'Matières',
      logistics:'Logistique',
      availability:'Disponibilité (jours & créneaux)',
      travel:'Préférence de déplacement',
      travelHome:'Je me déplace chez l’élève',
      travelStudio:'L’élève vient à mon lieu',
      save:'Enregistrer & continuer',
      add:'Ajouter'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:860px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted);font-size:13px}
    .grid{display:grid;gap:12px;margin-top:16px}
    .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .input, select, textarea{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .section{margin-top:18px}
.section h3{font-size:15px;margin-bottom:8px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700}
    .chip{padding:8px 12px;border-radius:999px;border:1px solid var(--border);font-size:12px}
    .chips{display:flex;gap:8px;flex-wrap:wrap}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.subtitle}</div>

      <div class="section">
        <h3>${t.identity}</h3>
        <div class="grid">
          <label>${t.photo}</label>
          <input class="input" placeholder="Upload photo URL"/>
          <div class="row">
            <div><label>${t.firstName}</label><input class="input" /></div>
            <div><label>${t.lastName}</label><input class="input" /></div>
          </div>
          <div class="row">
            <div><label>${t.nameEn}</label><input class="input" /></div>
            <div><label>${t.nameAr}</label><input class="input" /></div>
          </div>
          <div class="row">
            <div><label>${t.nameFr}</label><input class="input" /></div>
            <div><label>${t.phone}</label><input class="input" value="+961 71 123 456" /></div>
          </div>
          <label>${t.email}</label>
          <input class="input" placeholder="email@example.com" />
        </div>
      </div>

      <div class="section">
        <h3>${t.scope}</h3>
        <div class="section">
          <h4>${t.languages}</h4>
          <div class="chips">
            <span class="chip">Arabic</span><span class="chip">English</span><span class="chip">French</span>
            <span class="chip">${t.add}</span>
          </div>
        </div>
        <div class="section">
          <h4>${t.locations}</h4>
          <div class="chips">
            <span class="chip">Beirut</span><span class="chip">Tripoli</span><span class="chip">Saida</span>
            <span class="chip">${t.add}</span>
          </div>
        </div>
        <div class="section">
          <h4>${t.levels}</h4>
          <div class="chips">
            <span class="chip">Secondary</span><span class="chip">University</span><span class="chip">Vocational</span>
            <span class="chip">${t.add}</span>
          </div>
        </div>
        <div class="section">
          <h4>${t.subjects}</h4>
          <div class="chips">
            <span class="chip">Math</span><span class="chip">Music</span><span class="chip">Arts</span>
            <span class="chip">${t.add}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>${t.logistics}</h3>
        <div class="section">
          <h4>${t.availability}</h4>
          <div class="chips">
            <span class="chip">Mon 4–6 PM</span><span class="chip">Wed 3–5 PM</span>
            <span class="chip">${t.add}</span>
          </div>
        </div>
        <div class="section">
          <h4>${t.travel}</h4>
          <div class="row">
            <label><input type="checkbox"/> ${t.travelHome}</label>
            <label><input type="checkbox"/> ${t.travelStudio}</label>
          </div>
        </div>
      </div>

      <div class="section">
        <button class="btn">${t.save}</button>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
