import React from 'react';

export default function StudentDashboard() {
  const html = `
  <div style="min-height:100vh;background:#F5F7F7;padding-bottom:110px;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;">
      <span style="font-size:12px;font-weight:600;color:#6B7280;">Logout</span>
      <span style="font-size:18px;font-weight:700;color:#0F172A;">Book a Lesson</span>
      <span style="font-size:22px;color:#9CA3AF;">⋮</span>
    </div>

    <div style="padding:0 20px;">
      <div style="background:#fff;border-radius:24px;padding:16px;display:flex;gap:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <div style="width:56px;height:56px;border-radius:50%;background:#E5E7EB;display:flex;align-items:center;justify-content:center;">👩‍🏫</div>
        <div>
          <div style="font-size:11px;font-weight:700;color:#10B981;text-transform:uppercase;">Tutor</div>
          <div style="font-size:18px;font-weight:700;color:#0F172A;">Sarah Al‑Fayed</div>
          <div style="font-size:13px;color:#6B7280;">Math & Physics Expert</div>
        </div>
      </div>
    </div>

    <div style="padding:24px 20px 0;">
      <div style="font-size:13px;font-weight:700;color:#334155;margin-bottom:8px;">Student Name</div>
      <div style="background:#fff;border-radius:16px;padding:12px;display:flex;gap:8px;align-items:center;border:1px solid #F1F5F9;">
        <span style="color:#94A3B8;">👤</span>
        <input placeholder="Enter full name" style="border:none;outline:none;width:100%;font-size:14px;color:#334155;background:transparent;" />
      </div>
    </div>

    <div style="padding:24px 20px 0;">
      <div style="font-size:13px;font-weight:700;color:#334155;margin-bottom:10px;">Select Subject</div>
      <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;">
        <button style="padding:8px 18px;border-radius:9999px;background:#0F172A;color:#fff;font-weight:600;">∑ Mathematics</button>
        <button style="padding:8px 18px;border-radius:9999px;background:#fff;border:1px solid #E2E8F0;color:#334155;font-weight:600;">🧪 Physics</button>
        <button style="padding:8px 18px;border-radius:9999px;background:#fff;border:1px solid #E2E8F0;color:#334155;font-weight:600;">🔬 Chemistry</button>
      </div>
    </div>

    <div style="padding:24px 20px 0;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div style="font-size:13px;font-weight:700;color:#334155;">October 2023</div>
        <div style="font-size:20px;color:#9CA3AF;">‹ ›</div>
      </div>
      <div style="background:#fff;border-radius:24px;padding:14px;border:1px solid #F1F5F9;">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);font-size:12px;color:#94A3B8;text-align:center;margin-bottom:8px;">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center;font-size:14px;color:#334155;">
          <div>28</div><div>29</div><div>30</div><div></div><div></div><div>1</div><div>2</div>
          <div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
          <div style="height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#34D399;color:#fff;font-weight:700;">8</div>
          <div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div>
        </div>
      </div>
    </div>

    <div style="padding:24px 20px 0;">
<div style="font-size:13px;font-weight:700;color:#334155;margin-bottom:10px;">Available Time</div>
      <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;">
        <button style="padding:10px 18px;border-radius:16px;background:#fff;border:1px solid #E2E8F0;color:#334155;font-weight:600;">04:00 PM</button>
        <button style="padding:10px 18px;border-radius:16px;background:#34D399;color:#fff;font-weight:700;">05:00 PM</button>
        <button style="padding:10px 18px;border-radius:16px;background:#fff;border:1px solid #E2E8F0;color:#334155;font-weight:600;">06:30 PM</button>
      </div>
    </div>

    <div style="position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #E2E8F0;">
      <div style="max-width:480px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:11px;color:#94A3B8;">Total</div>
          <div style="font-size:20px;font-weight:700;color:#0F172A;">$45.00</div>
        </div>
        <button style="padding:12px 22px;border-radius:16px;background:#34D399;color:#fff;font-weight:700;">Confirm Booking</button>
      </div>
    </div>
  </div>
  `;

  return React.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
}
