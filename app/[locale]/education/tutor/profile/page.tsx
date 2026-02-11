import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import pool from '@/lib/db';

type Params = { params: { locale?: string } };

export default async function TutorProfile({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  noStore();

  const client = await pool.connect();
  let tutor: any = null;

  try {
    const res = await client.query(`
      SELECT
        t.id,
        t.name,
        t.display_name_en,
        t.display_name_ar,
        t.display_name_fr,
        tp.bio_en,
        tp.bio_ar,
        tp.bio_fr,
        tp.photo_url,
        COALESCE(trs.avg_stars, 0) as avg_stars,
        COALESCE(trs.rating_count, 0) as rating_count
      FROM tutors t
      LEFT JOIN tutor_profiles tp ON t.id = tp.tutor_id
      LEFT JOIN tutor_rating_summary trs ON t.id = trs.tutor_id
      WHERE t.is_active = true
      ORDER BY t.created_at ASC
      LIMIT 1;
    `);
    tutor = res.rows[0] || null;
  } finally {
    client.release();
  }

  const t = {
    en: {
      title:'Tutor Profile',
      book:'Book Session',
      bio:'Bio',
      reviews:'Reviews',
      calendar:'Availability Preview',
      back:'Back to Directory',
      r1:'“Great explanation and very patient.”',
      r2:'“Helped me improve quickly.”'
    },
    ar: {
      title:'ملف المدرّس',
      book:'احجز جلسة',
      bio:'نبذة',
      reviews:'التقييمات',
      calendar:'معاينة التوفر',
      back:'العودة إلى الدليل',
      r1:'"شرح ممتاز وصبر كبير."',
      r2:'"ساعدني على التحسن بسرعة."'
    },
    fr: {
      title:'Profil du tuteur',
      book:'Réserver une séance',
      bio:'Bio',
      reviews:'Avis',
      calendar:'Disponibilité',
      back:'Retour à l’annuaire',
      r1:'« Explications claires et très patient. »',
      r2:'« M’a aidé à progresser rapidement. »'
    }
  }[locale as 'en'|'ar'|'fr'];

  const displayName =
    locale === 'ar' && tutor?.display_name_ar ? tutor.display_name_ar :
    locale === 'fr' && tutor?.display_name_fr ? tutor.display_name_fr :
    tutor?.display_name_en || tutor?.name || 'Tutor';

  const bio =
    locale === 'ar' && tutor?.bio_ar ? tutor.bio_ar :
    locale === 'fr' && tutor?.bio_fr ? tutor.bio_fr :
    tutor?.bio_en || '';

  const rating = tutor ? Number(tutor.avg_stars).toFixed(1) : '0.0';
  const ratingCount = tutor ? tutor.rating_count : 0;

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
    .wrap{min-height:100vh;padding:20px;display:flex;justify-content:center}
    .card{width:100%;max-width:760px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:6px}
    .muted{color:var(--muted)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;display:inline-block;text-decoration:none}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;margin-top:10px}
    .section{margin-top:16px}
    .avatar{width:64px;height:64px;border-radius:999px;object-fit:cover;border:1px solid var(--border)}
    .calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center;font-size:13px;color:var(--text)}
    .day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:9999px}
    .day.active{background:var(--primary);color:#fff;font-weight:700}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>
      <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
<img class="avatar" src="${tutor?.photo_url || 'https://i.pravatar.cc/150?img=47'}" />
        <div>
          <div style="font-weight:800">${displayName}</div>
          <div class="muted">${rating} ★ · ${ratingCount}</div>
        </div>
      </div>

      <div class="section">
        <a class="btn" href="/${locale}/education/student/lesson">${t.book}</a>
      </div>

      <div class="section">
        <h3>${t.bio}</h3>
        <p class="muted">${bio || '-'}</p>
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

      <div class="section">
        <a class="btn ghost" href="/${locale}/education/tutors">${t.back}</a>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
