-- Clear existing data to ensure a clean slate
TRUNCATE tutors, tutor_profiles, lesson_types, lesson_pricing, tutor_availability, cancellation_policy, tutor_rating_summary, lessons, user_profiles RESTART IDENTITY CASCADE;

WITH new_tutor AS (
  INSERT INTO tutors (name, phone, slug, display_name_en, display_name_ar, display_name_fr)
  VALUES (
    'Farah Al-Fayad',
    '+9613123456',
    'farah-fayad',
    'Farah Al-Fayad',
    'فرح الفياض',
    'Farah Al-Fayad'
  )
  RETURNING id, phone
),
profile AS (
  INSERT INTO tutor_profiles (tutor_id, bio, lesson_formats, levels_supported)
  SELECT id, 'Experienced and patient tutor specializing in Math and Music for all ages.', ARRAY['individual'], ARRAY['Beginner', 'Intermediate', 'Advanced']
  FROM new_tutor
),
policy AS (
  INSERT INTO cancellation_policy (tutor_id, cutoff_hours, late_cancel_payable)
  SELECT id, 24, true FROM new_tutor
),
rating_summary AS (
  INSERT INTO tutor_rating_summary(tutor_id)
  SELECT id from new_tutor
),
math_lesson AS (
  INSERT INTO lesson_types (tutor_id, category, label, label_en, label_ar, label_fr, active)
  SELECT id, 'academic', 'Math', 'Mathematics', 'رياضيات', 'Mathématiques', true
  FROM new_tutor
  RETURNING id
),
piano_lesson AS (
  INSERT INTO lesson_types (tutor_id, category, label, label_en, label_ar, label_fr, active)
  SELECT id, 'music', 'Piano', 'Piano', 'بيانو', 'Piano', true
  FROM new_tutor
  RETURNING id
),
math_pricing AS (
  INSERT INTO lesson_pricing (lesson_type_id, duration_minutes, price_amount)
  VALUES
    ((SELECT id FROM math_lesson), 45, 20.00),
    ((SELECT id FROM math_lesson), 60, 25.00)
),
piano_pricing AS (
  INSERT INTO lesson_pricing (lesson_type_id, duration_minutes, price_amount)
  VALUES
    ((SELECT id FROM piano_lesson), 30, 25.00),
    ((SELECT id FROM piano_lesson), 60, 45.00)
)
INSERT INTO tutor_availability (tutor_id, day_of_week, start_time_local, end_time_local)
VALUES
  ((SELECT id FROM new_tutor), 1, '16:00', '19:00'),
  ((SELECT id FROM new_tutor), 3, '15:00', '18:00'),
  ((SELECT id FROM new_tutor), 5, '14:00', '17:00');

-- Default user profile for tutor
INSERT INTO user_profiles (phone, role, vertical, tutor_id)
SELECT phone, 'tutor', 'education', id FROM tutors WHERE slug = 'farah-fayad';

-- Add a sample lesson request (localized student name)
INSERT INTO lessons (
  tutor_id,
  lesson_type_id,
  student_name,
  student_name_en,
  student_name_ar,
  student_name_fr,
  level,
  duration_minutes,
  price_amount,
  status,
  requested_start_at_utc
)
SELECT
  t.id,
  lt.id,
  'Client Libanais',
  'Lebanese Client',
  'عميل لبناني',
  'Client Libanais',
  'Terminale',
  60,
  25.00,
  'requested',
  NOW() + INTERVAL '3 days'
FROM tutors t
JOIN lesson_types lt ON lt.tutor_id = t.id
WHERE t.slug = 'farah-fayad' AND lt.label = 'Math'
LIMIT 1;

SELECT 'Seed data successfully inserted.' as status;
