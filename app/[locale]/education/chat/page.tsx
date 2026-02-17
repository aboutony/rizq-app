import React from 'react';

type Params = { params: { locale?: string } };

export default function ChatPage({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: { title:'Payment Chat', hint:'Type a message…', send:'Send', back:'Go Back', s1:'I sent the transfer.', s2:'Please share the receipt.' },
    ar: { title:'محادثة الدفع', hint:'اكتب رسالة…', send:'إرسال', back:'رجوع', s1:'لقد أرسلت التحويل.', s2:'يرجى إرسال الإيصال.' },
    fr: { title:'Chat paiement', hint:'Écrire un message…', send:'Envoyer', back:'Retour', s1:'J’ai envoyé le transfert.', s2:'Merci de partager le reçu.' }
  }[locale as 'en'|'ar'|'fr'];

  const html = `
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text)}
    .wrap{min-height:100vh;padding:20px}
    .card{width:100%;max-width:520px;margin:0 auto;background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
    .title{font-size:20px;font-weight:800;margin-bottom:12px}
    .bubble{padding:12px;border-radius:12px;border:1px solid var(--border);margin:8px 0}
    .input{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text)}
    .btn{padding:12px;border-radius:12px;background:var(--primary);color:#fff;border:none;font-weight:700;width:100%}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block;width:100%;text-align:center;margin-top:10px}
  </style>

  <div class="wrap">
    <div class="card">
      <div class="title">${t.title}</div>

      <div class="bubble"><strong>Student:</strong> ${t.s1}</div>
      <div class="bubble"><strong>Tutor:</strong> ${t.s2}</div>

      <input class="input" placeholder="${t.hint}" />
      <button class="btn" style="margin-top:10px">${t.send}</button>
      <a class="btn ghost" href="/${locale}/education/student/dashboard">${t.back}</a>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
