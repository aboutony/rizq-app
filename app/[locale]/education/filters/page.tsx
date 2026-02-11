import React from 'react';

type Params = { params: { locale?: string } };

export default function FiltersPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Advanced Filters', category:'Category', budget:'Budget Range',
      rating:'Minimum Rating', availability:'Availability',
      apply:'Apply Filters', back:'Go Back',
      c1:'General Education', c2:'TVET', c3:'Arts & Creative', c4:'Sports & Fitness',
      c5:'Culinary Arts', c6:'Language Learning', c7:'Coding & Technology'
    },
    ar: {
      title:'فلاتر متقدمة', category:'التصنيف', budget:'الميزانية',
      rating:'أقل تقييم', availability:'التوفر',
      apply:'تطبيق الفلاتر', back:'رجوع',
      c1:'التعليم العام', c2:'التعليم المهني والتقني', c3:'الفنون والإبداع', c4:'الرياضة واللياقة',
      c5:'فنون الطهي', c6:'تعلم اللغات', c7:'البرمجة والتقنية'
    },
    fr: {
      title:'Filtres avancés', category:'Catégorie', budget:'Budget',
      rating:'Note minimale', availability:'Disponibilité',
      apply:'Appliquer', back:'Retour',
      c1:'Enseignement général', c2:'EFTP', c3:'Arts & créatif', c4:'Sports & fitness',
      c5:'Arts culinaires', c6:'Apprentissage des langues', c7:'Programmation & technologie'
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
      <div class="grid">
        <label>${t.category}</label>
        <select class="input">
          <option>${t.c1}</option>
          <option>${t.c2}</option>
          <option>${t.c3}</option>
          <option>${t.c4}</option>
          <option>${t.c5}</option>
          <option>${t.c6}</option>
          <option>${t.c7}</option>
        </select>

        <label>${t.budget}</label>
        <select class="input">
          <option>$10 – $20</option>
          <option>$20 – $40</option>
          <option>$40 – $60</option>
          <option>$60+</option>
        </select>

        <label>${t.rating}</label>
        <select class="input">
          <option>4.0+</option>
          <option>4.5+</option>
          <option>4.8+</option>
        </select>

        <label>${t.availability}</label>
        <select class="input">
          <option>Weekdays</option>
          <option>Weekends</option>
          <option>Evenings</option>
        </select>

        <button class="btn">${t.apply}</button>
        <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
