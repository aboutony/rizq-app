import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorOffice({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Tutor Personal Office',
      subtitle:'Edit your profile anytime',
      profile:'Profile Information',
      photo:'Profile Photo',
      displayName:'Display Name',
      bio:'Bio / About',
      languages:'Teaching Languages',
      locations:'Teaching Locations',
      levels:'Education Levels',
      subjects:'Subjects',
      logistics:'Logistics',
      availability:'Availability',
      travel:'Travel Preference',
      travelHome:'I visit students at home',
      travelStudio:'Student comes to my location',
      subscription:'Subscription',
      status:'Status',
      active:'Active',
      renew:'Renew Subscription',
      update:'Update Profile',
      back:'Go Back'
    },
    ar: {
      title:'مكتب المدرّس الشخصي',
      subtitle:'عدّل ملفك في أي وقت',
      profile:'معلومات الملف',
      photo:'الصورة الشخصية',
      displayName:'الاسم المعروض',
      bio:'نبذة / تعريف',
      languages:'لغات التدريس',
      locations:'مناطق التدريس',
      levels:'المستويات التعليمية',
      subjects:'المواد',
      logistics:'اللوجستيات',
      availability:'التوفر',
      travel:'تفضيل التنقل',
      travelHome:'أزور الطلاب في منازلهم',
      travelStudio:'يأتي الطالب إلى موقعي',
      subscription:'الاشتراك',
      status:'الحالة',
      active:'نشط',
      renew:'تجديد الاشتراك',
      update:'تحديث الملف',
      back:'رجوع'
    },
    fr: {
      title:'Bureau Personnel du Tuteur',
      subtitle:'Modifiez votre profil à tout moment',
      profile:'Informations du profil',
      photo:'Photo de profil',
      displayName:'Nom affiché',
      bio:'Bio / À propos',
      languages:'Langues enseignées',
      locations:'Lieux d’enseignement',
      levels:'Niveaux d’études',
      subjects:'Matières',
      logistics:'Logistique',
      availability:'Disponibilité',
      travel:'Préférence de déplacement',
      travelHome:'Je me déplace chez l’élève',
      travelStudio:'L’élève vient à mon lieu',
      subscription:'Abonnement',
      status:'Statut',
      active:'Actif',
      renew:'Renouveler l’abonnement',
      update:'Mettre à jour le profil',
      back:'Retour'
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
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border)}
    .chip{padding:8px 12px;border-radius:999px;border:1px solid var(--border);font-size:12px}
    .chips{display:flex;gap:8px;flex-wrap:wrap}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.subtitle}</div>

      <div class="section">
        <h3>${t.profile}</h3>
        <div class="grid">
          <label>${t.photo}</label>
<input class="input" placeholder="Photo URL" />
          <label>${t.displayName}</label>
          <input class="input" placeholder="Sarah Al‑Fayed" />
          <label>${t.bio}</label>
          <textarea class="input" rows="3" placeholder="Short professional bio"></textarea>
        </div>
      </div>

      <div class="section">
        <h3>${t.languages}</h3>
        <div class="chips">
          <span class="chip">Arabic</span><span class="chip">English</span><span class="chip">French</span>
          <span class="chip">+ Add</span>
        </div>
      </div>

      <div class="section">
        <h3>${t.locations}</h3>
        <div class="chips">
          <span class="chip">Beirut</span><span class="chip">Tripoli</span><span class="chip">Saida</span>
          <span class="chip">+ Add</span>
        </div>
      </div>

      <div class="section">
        <h3>${t.levels}</h3>
        <div class="chips">
          <span class="chip">Secondary</span><span class="chip">University</span><span class="chip">Vocational</span>
          <span class="chip">+ Add</span>
        </div>
      </div>

      <div class="section">
        <h3>${t.subjects}</h3>
        <div class="chips">
          <span class="chip">Math</span><span class="chip">Physics</span><span class="chip">French</span>
          <span class="chip">+ Add</span>
        </div>
      </div>

      <div class="section">
        <h3>${t.logistics}</h3>
        <div class="grid">
          <label>${t.availability}</label>
          <input class="input" placeholder="Mon 4–6 PM, Wed 3–5 PM" />
          <label>${t.travel}</label>
          <div class="row">
            <label><input type="checkbox"/> ${t.travelHome}</label>
            <label><input type="checkbox"/> ${t.travelStudio}</label>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>${t.subscription}</h3>
        <div class="row">
          <div><strong>${t.status}:</strong> ${t.active}</div>
          <button class="btn ghost">${t.renew}</button>
        </div>
      </div>

      <div class="section">
        <button class="btn">${t.update}</button>
        <a class="btn ghost" href="/${locale}/education/tutor/dashboard">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
