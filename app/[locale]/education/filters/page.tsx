import React from 'react';

type Params = { params: { locale?: string } };

export default function FiltersPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Advanced Filters',
      category:'Category',
      level:'Level',
      location:'Location',
      apply:'Apply Filters',
      back:'Go Back',
      c1:'General Education', c2:'TVET', c3:'Arts & Creative', c4:'Sports & Fitness',
      c5:'Culinary Arts', c6:'Language Learning', c7:'Coding & Technology',
      l1:'Primary', l2:'Secondary', l3:'University', l4:'Vocational',
      loc1:'Beirut', loc2:'Tripoli', loc3:'Saida'
    },
    ar: {
      title:'فلاتر متقدمة',
      category:'التصنيف',
      level:'المستوى',
      location:'الموقع',
      apply:'تطبيق الفلاتر',
      back:'رجوع',
      c1:'التعليم العام', c2:'التعليم المهني والتقني', c3:'الفنون والإبداع', c4:'الرياضة واللياقة',
      c5:'فنون الطهي', c6:'تعلم اللغات', c7:'البرمجة والتقنية',
      l1:'ابتدائي', l2:'ثانوي', l3:'جامعي', l4:'مهني',
      loc1:'بيروت', loc2:'طرابلس', loc3:'صيدا'
    },
    fr: {
      title:'Filtres avancés',
      category:'Catégorie',
      level:'Niveau',
      location:'Lieu',
      apply:'Appliquer',
      back:'Retour',
      c1:'Enseignement général', c2:'EFTP', c3:'Arts & créatif', c4:'Sports & fitness',
      c5:'Arts culinaires', c6:'Apprentissage des langues', c7:'Programmation & technologie',
      l1:'Primaire', l2:'Secondaire', l3:'Université', l4:'Professionnel',
      loc1:'Beyrouth', loc2:'Tripoli', loc3:'Saïda'
    }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:520px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .input, select{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center}
    .grid{display:grid;gap:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <form class="grid" method="get" action="/${locale}/education/tutors">
        <label>${t.category}</label>
        <select class="input" name="category">
          <option value="">—</option>
          <option value="${t.c1}">${t.c1}</option>
          <option value="${t.c2}">${t.c2}</option>
          <option value="${t.c3}">${t.c3}</option>
          <option value="${t.c4}">${t.c4}</option>
          <option value="${t.c5}">${t.c5}</option>
          <option value="${t.c6}">${t.c6}</option>
          <option value="${t.c7}">${t.c7}</option>
        </select>

        <label>${t.level}</label>
        <select class="input" name="level">
          <option value="">—</option>
          <option value="${t.l1}">${t.l1}</option>
          <option value="${t.l2}">${t.l2}</option>
          <option value="${t.l3}">${t.l3}</option>
          <option value="${t.l4}">${t.l4}</option>
        </select>

        <label>${t.location}</label>
        <select class="input" name="location">
          <option value="">—</option>
          <option value="${t.loc1}">${t.loc1}</option>
          <option value="${t.loc2}">${t.loc2}</option>
          <option value="${t.loc3}">${t.loc3}</option>
        </select>
<button class="btn" type="submit">${t.apply}</button>
        <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
      </form>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
