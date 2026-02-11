import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorLessonPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title:'Lesson Promotion',
      subtitle:'Tutor version — you can edit “Other” fields.',
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
      other:'Other (if any)',
      save:'Save Lesson Listing',
      back:'Go Back',

      ge:'1. General Education',
      ge1:'Primary School',
      ge2:'Middle School / Intermediate',
      ge3:'Secondary School (General Track)',
      ge4:'Undergraduate (Bachelor\'s)',
      ge5:'Other',

      tvet:'2. TVET (Technical and Vocational Education and Training)',
      tv1:'CAP',
      tv2:'BP',
      tv3:'BT',
      tv4:'TS',
      tv5:'Other Vocational Certificates/Diplomas',
      tv6:'Other',

      arts:'3. Arts & Creative Disciplines',
      ar1:'Visual Arts',
      ar2:'Performing Arts',
      ar3:'Martial Arts',
      ar4:'Design & Multimedia',
      ar5:'Other',

      sports:'4. Sports & Fitness',
      sp1:'Team Sports',
      sp2:'Racket Sports',
      sp3:'Aquatic Sports',
      sp4:'Fitness Training',
      sp5:'Other',

      culinary:'5. Culinary Arts',
      cu1:'Cooking & Baking',
      cu2:'Pastry Arts',
      cu3:'Hospitality & Restaurant Management',
      cu4:'Other',

      brevet:'6. Brevet d\'Études du Premier Cycle',
      brevetVal:'Intermediate Diploma – Grade 9/10',

      bac:'7. Baccalauréat Libanais',
      bac1:'Sciences (GS / LS)',
      bac2:'Humanities (SE / LH)',

      langLearn:'8. Language Learning',
      ll1:'Arabic',
      ll2:'Armenian',
      ll3:'Chinese',
      ll4:'English',
      ll5:'French',
      ll6:'German',
      ll7:'Greek',
      ll8:'Italian',
      ll9:'Russian',
      ll10:'Spanish',
      ll11:'Other',

      code:'9. Coding & Technology',
      c1:'Programming Languages',
      c2:'Web Development',
      c3:'Mobile Development',
      c4:'Data & AI',
      c5:'DevOps & Cloud',
      c6:'Beginner Pathways',
      c7:'Certification Prep'
    },
    ar: {
      title:'ترويج الدرس',
      subtitle:'نسخة المدرّس — يمكنك تعديل حقول «أخرى».',
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
      other:'أخرى (إن وجدت)',
      save:'حفظ إعلان الدرس',
      back:'رجوع',

      ge:'1. التعليم العام',
      ge1:'المرحلة الابتدائية',
      ge2:'المرحلة المتوسطة / الإعدادية',
      ge3:'المرحلة الثانوية (المسار العام)',
      ge4:'المرحلة الجامعية (بكالوريوس)',
      ge5:'أخرى',

      tvet:'2. التعليم والتدريب التقني والمهني',
      tv1:'CAP',
tv2:'BP',
      tv3:'BT',
      tv4:'TS',
      tv5:'شهادات/دبلومات مهنية أخرى',
      tv6:'أخرى',

      arts:'3. الفنون والتخصصات الإبداعية',
      ar1:'الفنون البصرية',
      ar2:'الفنون الأدائية',
      ar3:'الفنون القتالية',
      ar4:'التصميم والوسائط المتعددة',
      ar5:'أخرى',

      sports:'4. الرياضة واللياقة',
      sp1:'رياضات جماعية',
      sp2:'رياضات المضرب',
      sp3:'رياضات مائية',
      sp4:'تدريب لياقة',
      sp5:'أخرى',

      culinary:'5. فنون الطهي',
      cu1:'الطبخ والخبز',
      cu2:'فنون الحلويات',
      cu3:'إدارة الضيافة والمطاعم',
      cu4:'أخرى',

      brevet:'6. شهادة البريفيه (Brevet)',
      brevetVal:'الدبلوم المتوسط – الصف 9/10',

      bac:'7. البكالوريا اللبنانية',
      bac1:'علوم (GS / LS)',
      bac2:'إنسانيات (SE / LH)',

      langLearn:'8. تعلم اللغات',
      ll1:'العربية',
      ll2:'الأرمنية',
      ll3:'الصينية',
      ll4:'الإنجليزية',
      ll5:'الفرنسية',
      ll6:'الألمانية',
      ll7:'اليونانية',
      ll8:'الإيطالية',
      ll9:'الروسية',
      ll10:'الإسبانية',
      ll11:'أخرى',

      code:'9. البرمجة والتقنية',
      c1:'لغات البرمجة',
      c2:'تطوير الويب',
      c3:'تطوير تطبيقات الجوال',
      c4:'البيانات والذكاء الاصطناعي',
      c5:'DevOps والحوسبة السحابية',
      c6:'مسارات المبتدئين',
      c7:'التحضير للشهادات'
    },
    fr: {
      title:'Promotion du cours',
      subtitle:'Version tuteur — vous pouvez modifier les champs « Autre ».',
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
      other:'Autre (si applicable)',
      save:'Enregistrer l’annonce',
      back:'Retour',

      ge:'1. Enseignement général',
      ge1:'École primaire',
      ge2:'Collège / Intermédiaire',
      ge3:'Lycée (général)',
      ge4:'Université (Licence)',
      ge5:'Autre',

      tvet:'2. EFTP (Enseignement et Formation Techniques et Professionnels)',
      tv1:'CAP',
      tv2:'BP',
      tv3:'BT',
      tv4:'TS',
      tv5:'Autres certificats/diplômes professionnels',
      tv6:'Autre',

      arts:'3. Arts et disciplines créatives',
      ar1:'Arts visuels',
      ar2:'Arts de la scène',
      ar3:'Arts martiaux',
      ar4:'Design & multimédia',
      ar5:'Autre',

      sports:'4. Sports & Fitness',
      sp1:'Sports collectifs',
      sp2:'Sports de raquette',
      sp3:'Sports aquatiques',
      sp4:'Entraînement physique',
      sp5:'Autre',

      culinary:'5. Arts culinaires',
      cu1:'Cuisine & pâtisserie',
      cu2:'Arts pâtissiers',
      cu3:'Hôtellerie & gestion de restaurant',
      cu4:'Autre',

      brevet:'6. Brevet d’Études du Premier Cycle',
      brevetVal:'Diplôme intermédiaire – 3e/4e',

      bac:'7. Baccalauréat libanais',
      bac1:'Sciences (GS / LS)',
      bac2:'Lettres/Sciences humaines (SE / LH)',

      langLearn:'8. Apprentissage des langues',
      ll1:'Arabe',
      ll2:'Arménien',
      ll3:'Chinois',
      ll4:'Anglais',
      ll5:'Français',
      ll6:'Allemand',
      ll7:'Grec',
      ll8:'Italien',
      ll9:'Russe',
      ll10:'Espagnol',
      ll11:'Autre',

      code:'9. Programmation & technologie',
      c1:'Langages de programmation',
      c2:'Développement web',
      c3:'Développement mobile',
      c4:'Données & IA',
      c5:'DevOps & Cloud',
      c6:'Parcours débutant',
      c7:'Préparation aux certifications'
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
    .section h3{font-size:15px;margin-bottom:8px}
    .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:8px}
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
        <h3>${t.ge}</h3>
        <select class="input">
          <option>${t.ge1}</option>
          <option>${t.ge2}</option>
          <option>${t.ge3}</option>
          <option>${t.ge4}</option>
          <option>${t.ge5}</option>
        </select>
        <input class="input" placeholder="${t.other}"/>
      </div>

      <div class="section">
        <h3>${t.tvet}</h3>
        <select class="input">
          <option>${t.tv1}</option>
          <option>${t.tv2}</option>
          <option>${t.tv3}</option>
          <option>${t.tv4}</option>
          <option>${t.tv5}</option>
          <option>${t.tv6}</option>
        </select>
        <input class="input" placeholder="${t.other}"/>
      </div>

      <div class="section">
        <h3>${t.arts}</h3>
        <select class="input">
          <option>${t.ar1}</option>
          <option>${t.ar2}</option>
          <option>${t.ar3}</option>
          <option>${t.ar4}</option>
          <option>${t.ar5}</option>
        </select>
        <input class="input" placeholder="${t.other}"/>
      </div>

      <div class="section">
        <h3>${t.sports}</h3>
<select class="input">
          <option>${t.sp1}</option>
          <option>${t.sp2}</option>
          <option>${t.sp3}</option>
          <option>${t.sp4}</option>
          <option>${t.sp5}</option>
        </select>
        <input class="input" placeholder="${t.other}"/>
      </div>

      <div class="section">
        <h3>${t.culinary}</h3>
        <select class="input">
          <option>${t.cu1}</option>
          <option>${t.cu2}</option>
          <option>${t.cu3}</option>
          <option>${t.cu4}</option>
        </select>
        <input class="input" placeholder="${t.other}"/>
      </div>

      <div class="section">
        <h3>${t.brevet}</h3>
        <input class="input" value="${t.brevetVal}" />
      </div>

      <div class="section">
        <h3>${t.bac}</h3>
        <select class="input">
          <option>${t.bac1}</option>
          <option>${t.bac2}</option>
        </select>
      </div>

      <div class="section">
        <h3>${t.langLearn}</h3>
        <select class="input">
          <option>${t.ll1}</option>
          <option>${t.ll2}</option>
          <option>${t.ll3}</option>
          <option>${t.ll4}</option>
          <option>${t.ll5}</option>
          <option>${t.ll6}</option>
          <option>${t.ll7}</option>
          <option>${t.ll8}</option>
          <option>${t.ll9}</option>
          <option>${t.ll10}</option>
          <option>${t.ll11}</option>
        </select>
        <input class="input" placeholder="${t.other}"/>
      </div>

      <div class="section">
        <h3>${t.code}</h3>
        <select class="input">
          <option>${t.c1}</option>
          <option>${t.c2}</option>
          <option>${t.c3}</option>
          <option>${t.c4}</option>
          <option>${t.c5}</option>
          <option>${t.c6}</option>
          <option>${t.c7}</option>
        </select>
      </div>

      <div class="section">
        <button class="btn">${t.save}</button>
        <a class="btn ghost" href="/${locale}/education/tutor/dashboard">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
