import React from 'react';

type Params = { params: { locale?: string } };

export default function NotificationsPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Notifications', back:'Go Back' },
    ar: { title:'الإشعارات', back:'رجوع' },
    fr: { title:'Notifications', back:'Retour' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04);margin-bottom:12px}
    .muted{color:var(--muted)}
    .btn{padding:10px 12px;border-radius:10px;background:var(--primary);color:#fff;border:none;font-weight:700}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block}
  </style>

  <div class="wrap">
