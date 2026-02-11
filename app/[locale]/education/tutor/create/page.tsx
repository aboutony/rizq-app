import React from 'react';

type Params = { params: { locale?: string }, searchParams?: { error?: string } };

export default function CreateTutorProfile({ params, searchParams }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const error = searchParams?.error || '';

  const t = {
    en: {
      title:'Create Tutor Profile',
      subtitle:'Add a new tutor for the demo (visible in Directory).',
      pin:'Admin PIN',
      pinHint:'Enter PIN to create a profile',
      nameEn:'Name (English)',
      nameAr:'Name (Arabic)',
      nameFr:'Name (French)',
      phone:'Phone',
      email:'Email',
      slug:'Slug (unique)',
      lessonFormats:'Lesson Formats (comma separated)',
      levels:'Levels Supported (comma separated)',
      languages:'Languages (comma separated)',
      locations:'Locations (comma separated)',
      subjects:'Subjects (comma separated)',
      bioEn:'Bio (English)',
      bioAr:'Bio (Arabic)',
      bioFr:'Bio (French)',
      save:'Create Profile',
      back:'Go Back',
      errPin:'Wrong PIN.',
      errSlug:'Slug already exists.'
    },
    ar: {
      title:'إنشاء ملف مدرس',
      subtitle:'أضف مدرسًا جديدًا للعرض (يظهر في الدليل).',
      pin:'رمز الإدارة',
      pinHint:'أدخل الرمز لإنشاء ملف',
      nameEn:'الاسم (بالإنجليزية)',
      nameAr:'الاسم (بالعربية)',
      nameFr:'الاسم (بالفرنسية)',
      phone:'رقم الهاتف',
      email:'البريد الإلكتروني',
      slug:'Slug (فريد)',
      lessonFormats:'أنماط الدروس (مفصولة بفواصل)',
      levels:'المستويات (مفصولة بفواصل)',
      languages:'اللغات (مفصولة بفواصل)',
      locations:'المناطق (مفصولة بفواصل)',
      subjects:'المواد (مفصولة بفواصل)',
      bioEn:'النبذة (بالإنجليزية)',
      bioAr:'النبذة (بالعربية)',
      bioFr:'النبذة (بالفرنسية)',
      save:'إنشاء الملف',
      back:'رجوع',
      errPin:'الرمز غير صحيح.',
      errSlug:'الـ Slug مستخدم مسبقًا.'
    },
    fr: {
      title:'Créer un profil de tuteur',
      subtitle:'Ajouter un nouveau tuteur pour la démo (visible dans l’annuaire).',
      pin:'PIN admin',
      pinHint:'Entrez le PIN pour créer',
      nameEn:'Nom (Anglais)',
      nameAr:'Nom (Arabe)',
      nameFr:'Nom (Français)',
      phone:'Téléphone',
      email:'Email',
      slug:'Slug (unique)',
      lessonFormats:'Formats de cours (séparés par des virgules)',
      levels:'Niveaux (séparés par des virgules)',
      languages:'Langues (séparées par des virgules)',
      locations:'Lieux (séparés par des virgules)',
      subjects:'Matières (séparées par des virgules)',
      bioEn:'Bio (Anglais)',
      bioAr:'Bio (Arabe)',
      bioFr:'Bio (Français)',
      save:'Créer le profil',
      back:'Retour',
      errPin:'PIN incorrect.',
      errSlug:'Slug déjà utilisé.'
    }
  }[locale as 'en'|'ar'|'fr'];

  const errorMsg = error === 'pin' ? t.errPin : error === 'slug' ? t.errSlug : '';

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:760px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted);font-size:13px}
    .error{background:#fee2e2;color:#991b1b;padding:10px;border-radius:10px;margin-top:10px}
    .grid{display:grid;gap:12px;margin-top:16px}
    .input, textarea{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
.btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:10px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div class="muted">${t.subtitle}</div>
      ${errorMsg ? `<div class="error">${errorMsg}</div>` : ''}

      <form method="post" action="/api/tutor/profile/create" class="grid">
        <input type="hidden" name="locale" value="${locale}" />
        <input name="pin" class="input" placeholder="${t.pin}" />
        <div class="muted">${t.pinHint}</div>

        <input name="display_name_en" class="input" placeholder="${t.nameEn}" />
        <input name="display_name_ar" class="input" placeholder="${t.nameAr}" />
        <input name="display_name_fr" class="input" placeholder="${t.nameFr}" />
        <input name="phone" class="input" placeholder="${t.phone}" />
        <input name="email" class="input" placeholder="${t.email}" />
        <input name="slug" class="input" placeholder="${t.slug}" />

        <input name="lesson_formats" class="input" placeholder="${t.lessonFormats}" />
        <input name="levels_supported" class="input" placeholder="${t.levels}" />
        <input name="languages" class="input" placeholder="${t.languages}" />
        <input name="locations" class="input" placeholder="${t.locations}" />
        <input name="subjects" class="input" placeholder="${t.subjects}" />

        <textarea name="bio_en" class="input" rows="3" placeholder="${t.bioEn}"></textarea>
        <textarea name="bio_ar" class="input" rows="3" placeholder="${t.bioAr}"></textarea>
        <textarea name="bio_fr" class="input" rows="3" placeholder="${t.bioFr}"></textarea>

        <button class="btn" type="submit">${t.save}</button>
      </form>

      <a class="btn.ghost" href="/${locale}/education/tutor/dashboard">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
