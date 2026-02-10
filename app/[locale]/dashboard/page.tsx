import React from 'react';

type Params = { params: { locale?: string } };

export default function TutorDashboard({ params }: Params) {
  const locale = ['en','ar','fr'].includes(params?.locale || '') ? params!.locale! : 'en';

  const t = {
    en: {
      title: 'Tutor Portal',
      active: 'Subscription Active',
      expired: 'Subscription Expired',
      renew: 'Renew',
      locked: 'Your subscription expired. Data is hidden until you renew.',
      earned: 'Total Earned',
      owed: 'Total Owed',
      pending: 'Pending Payments',
      activeStudents: 'Active Students',
      totalStudents: 'Total Students',
      requests: 'Lesson Requests',
      approve: 'Approve',
      reschedule: 'Reschedule',
      decline: 'Decline',
      reason: 'Decline reason',
      rescheduleRequests: 'Reschedule Requests',
      details: 'Add Lesson Details',
      detailsHint: 'Quick modal for notes, payment, homework',
      paymentStatus: 'Payment Status',
      paid: 'Paid',
      unpaid: 'Unpaid',
      amount: 'Amount',
      notes: 'Notes',
      homework: 'Homework',
      save: 'Save Details',
      activity: 'Recent Activity'
    },
    ar: {
      title: 'بوابة المعلّم',
      active: 'الاشتراك نشط',
      expired: 'الاشتراك منتهي',
      renew: 'تجديد',
      locked: 'انتهى اشتراكك. البيانات مخفية حتى التجديد.',
      earned: 'إجمالي المحصّل',
      owed: 'إجمالي المستحق',
      pending: 'مدفوعات معلّقة',
      activeStudents: 'الطلاب النشطون',
      totalStudents: 'إجمالي الطلاب',
      requests: 'طلبات الدروس',
      approve: 'موافقة',
      reschedule: 'إعادة جدولة',
      decline: 'رفض',
      reason: 'سبب الرفض',
      rescheduleRequests: 'طلبات إعادة الجدولة',
      details: 'إضافة تفاصيل الدرس',
      detailsHint: 'نافذة سريعة للملاحظات والدفع والواجب',
      paymentStatus: 'حالة الدفع',
      paid: 'مدفوع',
      unpaid: 'غير مدفوع',
      amount: 'المبلغ',
      notes: 'ملاحظات',
      homework: 'واجب',
      save: 'حفظ التفاصيل',
      activity: 'النشاط الأخير'
    },
    fr: {
      title: 'Portail Tuteur',
      active: 'Abonnement Actif',
      expired: 'Abonnement Expiré',
      renew: 'Renouveler',
      locked: 'Votre abonnement a expiré. Les données sont masquées jusqu’au renouvellement.',
      earned: 'Total perçu',
      owed: 'Total dû',
      pending: 'Paiements en attente',
      activeStudents: 'Élèves actifs',
      totalStudents: 'Total élèves',
      requests: 'Demandes de cours',
      approve: 'Approuver',
      reschedule: 'Replanifier',
      decline: 'Refuser',
      reason: 'Raison du refus',
      rescheduleRequests: 'Demandes de replanification',
      details: 'Ajouter les détails du cours',
      detailsHint: 'Fenêtre rapide: notes, paiement, devoir',
      paymentStatus: 'Statut de paiement',
      paid: 'Payé',
      unpaid: 'Impayé',
      amount: 'Montant',
      notes: 'Notes',
      homework: 'Devoir',
      save: 'Enregistrer',
      activity: 'Activité récente'
    }
  }[locale as 'en'|'ar'|'fr'];

  // Toggle to test lock behavior
  const subscriptionActive = true;

  const html = `
  <style>
    :root { --bg:#f6f7fb; --card:#fff; --text:#1b1b1f; --muted:#666a73; --primary:#20c997; --border:#e6e8ef; --radius:16px; }
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.4}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:#fff;border-bottom:1px solid var(--border)}
    .status{padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700}
    .active{background:#eaf9f3;color:#0f7a5f}
    .expired{background:#ffe5e5;color:#b42318}
    .btn{background:var(--primary);color:white;border:none;padding:10px 14px;border-radius:10px;font-weight:600;cursor:pointer}
    .btn.ghost{background:transparent;color:var(--primary);border:1px solid var(--border);text-decoration:none;display:inline-block}
    .dashboard{padding:20px;display:grid;gap:20px;max-width:1200px;margin:0 auto}
    .grid{display:grid;gap:12px}
    .kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
    .muted{color:var(--muted)}
    .locked{opacity:0.15;filter:blur(2px);pointer-events:none}
    details summary{cursor:pointer;font-weight:700;margin-bottom:8px}
    .row{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
    .tag{padding:4px 10px;border-radius:999px;font-size:12px;background:#eef2f7}
    .actions{display:flex;gap:8px;flex-wrap:wrap}
    .input, select, textarea {width:100%;padding:10px;border:1px solid var(--border);border-radius:10px}
    @media (min-width: 900px){
      .dashboard{grid-template-columns:2fr 1fr}
    }
  </style>

  <header class="topbar">
    <div style="font-weight:800">RIZQ</div>
    <div class="row">
      <span class="status ${subscriptionActive ? 'active' : 'expired'}">${subscriptionActive ? t.active : t.expired}</span>
      ${subscriptionActive ? '' : `<a class="btn ghost" href="/${locale}/logout">${t.renew}</a>`}
    </div>
  </header>

  ${subscriptionActive ? '' : `<div style="padding:12px 20px;background:#fff3cd;border-bottom:1px solid #ffeeba;font-weight:600;">${t.locked}</div>`}

  <main class="dashboard" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">
    <section class="${subscriptionActive ? '' : 'locked'}">
      <div class="kpis">
        <div class="card"><div class="muted">${t.earned}</div><div style="font-size:22px;font-weight:800">$1,240</div></div>
        <div class="card"><div class="muted">${t.owed}</div><div style="font-size:22px;font-weight:800">$320</div></div>
        <div class="card"><div class="muted">${t.pending}</div><div style="font-size:22px;font-weight:800">5</div></div>
        <div class="card"><div class="muted">${t.activeStudents}</div><div style="font-size:22px;font-weight:800">12</div></div>
        <div class="card"><div class="muted">${t.totalStudents}</div><div style="font-size:22px;font-weight:800">64</div></div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="row"><h3>${t.requests}</h3><span class="tag">3 New</span></div>
        <div style="margin-top:12px" class="grid">
          <div class="row">
            <div>
              <div style="font-weight:700">Rana K.</div>
              <div class="muted">Math · 60 min · Tue 5:00 PM</div>
            </div>
            <div class="actions">
              <button class="btn">${t.approve}</button>
              <button class="btn ghost">${t.reschedule}</button>
              <button class="btn ghost">${t.decline}</button>
            </div>
          </div>
          <div class="row">
            <select class="input"><option>${t.reason}</option><option>Schedule conflict</option><option>Not available</option></select>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <h3>${t.rescheduleRequests}</h3>
        <div class="row" style="margin-top:10px">
          <div><strong>Hadi M.</strong> <span class="muted">wants Thu 6:00 PM</span></div>
          <div class="actions"><button class="btn">${t.approve}</button><button class="btn ghost">${t.reschedule}</button></div>
</div>
      </div>

      <details class="card" style="margin-top:16px">
        <summary>${t.details}</summary>
        <div class="muted" style="margin-bottom:10px">${t.detailsHint}</div>
        <div class="grid">
          <label>${t.paymentStatus}</label>
          <select class="input"><option>${t.paid}</option><option>${t.unpaid}</option></select>
          <label>${t.amount}</label>
          <input class="input" placeholder="$45" />
          <label>${t.notes}</label>
          <textarea class="input" rows="3"></textarea>
          <label>${t.homework}</label>
          <textarea class="input" rows="2"></textarea>
          <button class="btn">${t.save}</button>
        </div>
      </details>
    </section>

    <aside class="${subscriptionActive ? '' : 'locked'}">
      <div class="card">
        <h3>${t.activity}</h3>
        <div class="muted" style="margin-top:8px">Rana K. approved · 2h ago</div>
        <div class="muted">Payment marked paid · 4h ago</div>
        <div class="muted">Reschedule accepted · yesterday</div>
      </div>
    </aside>
  </main>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
