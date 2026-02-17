import React from 'react';

type Params = { params: { locale?: string } };

export default function ChatPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Chat', back:'Go Back', placeholder:'Type your message...' },
    ar: { title:'المحادثة', back:'رجوع', placeholder:'اكتب رسالتك...' },
    fr: { title:'Chat', back:'Retour', placeholder:'Écrire un message...' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px;display:flex;flex-direction:column;gap:12px}
    .title{font-size:20px;font-weight:800}
    .chat{flex:1;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px}
    .input{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .btn{padding:10px 12px;border-radius:10px;background:var(--primary);color:#fff;border:none;font-weight:700}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block}
  </style>

  <div class="wrap">
    <div class="title">${t.title}</div>
    <div class="chat">—</div>
    <input class="input" placeholder="${t.placeholder}" />
    <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
