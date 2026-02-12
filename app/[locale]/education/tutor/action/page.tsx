import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import pool from '@/lib/db';

type Params = { params: { locale?: string }, searchParams?: { action?: string; kind?: string } };

export default async function TutorActionPage({ params, searchParams }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';
  const action = searchParams?.action || 'approve';
  const kind = searchParams?.kind || 'request';

  const TUTOR_ID = 'c2f8242e-34d2-4402-9d30-76d546120731';

  const labels: any = {
    en: {
      approve:'Approved',
      reschedule:'Reschedule Requested',
      decline:'Declined',
      request:'Lesson Request',
      resReq:'Reschedule Request',
      back:'Go Back',
      done:'Action saved.',
      none:'No matching request found.'
    },
    ar: {
      approve:'تمت الموافقة',
      reschedule:'طلب إعادة الجدولة',
      decline:'تم الرفض',
      request:'طلب درس',
      resReq:'طلب إعادة جدولة',
      back:'رجوع',
      done:'تم حفظ الإجراء.',
      none:'لا يوجد طلب مطابق.'
    },
    fr: {
      approve:'Approuvé',
      reschedule:'Replanification demandée',
      decline:'Refusé',
      request:'Demande de cours',
      resReq:'Demande de replanification',
      back:'Retour',
      done:'Action enregistrée.',
      none:'Aucune demande correspondante.'
    }
  }[locale];

  const title =
    (action === 'approve' ? labels.approve :
     action === 'reschedule' ? labels.reschedule : labels.decline);

  const kindLabel = kind === 'reschedule' ? labels.resReq : labels.request;

  noStore();
  const client = await pool.connect();
  let updated = false;

  try {
    if (kind === 'request') {
      const newStatus =
        action === 'approve' ? 'confirmed' :
        action === 'reschedule' ? 'reschedule_requested' : 'canceled';

      const res = await client.query(
        `WITH target AS (
           SELECT id FROM lessons
           WHERE tutor_id = $1 AND status = 'requested'
           ORDER BY created_at DESC
           LIMIT 1
         )
         UPDATE lessons
         SET status = $2
         WHERE id IN (SELECT id FROM target)
         RETURNING id`,
        [TUTOR_ID, newStatus]
      );
      updated = res.rows.length > 0;
    }

    if (kind === 'reschedule') {
      if (action === 'approve') {
        const res = await client.query(
          `WITH target AS (
             SELECT rr.id, rr.lesson_id
             FROM reschedule_requests rr
             JOIN lessons l ON rr.lesson_id = l.id
             WHERE l.tutor_id = $1 AND rr.status = 'pending'
             ORDER BY rr.created_at DESC
             LIMIT 1
           )
           UPDATE reschedule_requests
           SET status = 'approved'
           WHERE id IN (SELECT id FROM target)
           RETURNING lesson_id`,
          [TUTOR_ID]
        );

        if (res.rows.length > 0) {
          await client.query(
            `UPDATE lessons SET status = 'rescheduled'
             WHERE id = $1`,
            [res.rows[0].lesson_id]
          );
          updated = true;
        }
      }

      if (action === 'reschedule') {
        const res = await client.query(
          `WITH target AS (
             SELECT id FROM lessons
             WHERE tutor_id = $1 AND status = 'confirmed'
             ORDER BY created_at DESC
             LIMIT 1
           )
           UPDATE lessons
           SET status = 'reschedule_requested'
           WHERE id IN (SELECT id FROM target)
           RETURNING id`,
          [TUTOR_ID]
        );
        updated = res.rows.length > 0;
      }

      if (action === 'decline') {
const res = await client.query(
          `WITH target AS (
             SELECT rr.id
             FROM reschedule_requests rr
             JOIN lessons l ON rr.lesson_id = l.id
             WHERE l.tutor_id = $1 AND rr.status = 'pending'
             ORDER BY rr.created_at DESC
             LIMIT 1
           )
           UPDATE reschedule_requests
           SET status = 'declined'
           WHERE id IN (SELECT id FROM target)
           RETURNING id`,
          [TUTOR_ID]
        );
        updated = res.rows.length > 0;
      }
    }
  } finally {
    client.release();
  }

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{width:100%;max-width:420px;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05);text-align:center}
    .title{font-size:20px;font-weight:800;margin-bottom:10px}
    .muted{color:var(--muted)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%;text-decoration:none;display:inline-block;text-align:center;margin-top:12px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${title}</div>
      <div class="muted">${kindLabel}</div>
      <div class="muted" style="margin-top:8px">${updated ? labels.done : labels.none}</div>
      <a class="btn" href="/${locale}/education/tutor/dashboard">${labels.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
