import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  const form = await request.formData();
  const pin = String(form.get('pin') || '');
  const locale = String(form.get('locale') || 'en');

  if (pin !== '1234') {
    return NextResponse.redirect(new URL(`/${locale}/education/tutor/create?error=pin`, request.url));
  }

  const slug = String(form.get('slug') || '').trim();
  if (!slug) {
    return NextResponse.redirect(new URL(`/${locale}/education/tutor/create?error=slug`, request.url));
  }

  const display_name_en = String(form.get('display_name_en') || '').trim();
  const display_name_ar = String(form.get('display_name_ar') || '').trim();
  const display_name_fr = String(form.get('display_name_fr') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const email = String(form.get('email') || '').trim();
  const bio_en = String(form.get('bio_en') || '').trim();
  const bio_ar = String(form.get('bio_ar') || '').trim();
  const bio_fr = String(form.get('bio_fr') || '').trim();

  const lessonFormats = String(form.get('lesson_formats') || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const levelsSupported = String(form.get('levels_supported') || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const languages = String(form.get('languages') || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const locations = String(form.get('locations') || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  const subjects = String(form.get('subjects') || '')
    .split(',').map(s => s.trim()).filter(Boolean);

  const client = await pool.connect();
  try {
    const exists = await client.query('select 1 from tutors where slug = $1', [slug]);
    if (exists.rows.length > 0) {
      return NextResponse.redirect(new URL(`/${locale}/education/tutor/create?error=slug`, request.url));
    }

    const tutorRes = await client.query(
      `insert into tutors (id, phone, name, slug, is_active, display_name_en, display_name_ar, display_name_fr)
       values (gen_random_uuid(), $1, $2, $3, true, $4, $5, $6)
       returning id`,
      [
        phone,
        display_name_en || display_name_fr || display_name_ar || 'Tutor',
        slug,
        display_name_en || null,
        display_name_ar || null,
        display_name_fr || null
      ]
    );

    const tutorId = tutorRes.rows[0].id;

    await client.query(
      `insert into tutor_profiles (
        tutor_id, lesson_formats, levels_supported, tutor_slug,
        display_name_en, display_name_ar, display_name_fr,
        bio_en, bio_ar, bio_fr, phone, email, travel_home, travel_studio
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,false,false)`,
      [
        tutorId,
        lessonFormats,
        levelsSupported,
        slug,
        display_name_en || null,
        display_name_ar || null,
        display_name_fr || null,
        bio_en || null,
        bio_ar || null,
        bio_fr || null,
        phone || null,
        email || null
      ]
    );

    for (const l of languages) {
      await client.query(
        `insert into tutor_languages (tutor_profile_id, language) values ($1,$2)`,
        [tutorId, l]
      );
    }
    for (const l of locations) {
      await client.query(
        `insert into tutor_locations (tutor_profile_id, location) values ($1,$2)`,
        [tutorId, l]
      );
    }
    for (const l of subjects) {
      await client.query(
        `insert into tutor_subjects (tutor_profile_id, subject) values ($1,$2)`,
        [tutorId, l]
      );
    }
    for (const l of levelsSupported) {
      await client.query(
        `insert into tutor_levels (tutor_profile_id, level) values ($1,$2)`,
        [tutorId, l]
      );
    }

    return NextResponse.redirect(new URL(`/${locale}/education/tutors`, request.url));
  } finally {
    client.release();
}
}
