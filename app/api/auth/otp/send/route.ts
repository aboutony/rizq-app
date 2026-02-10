import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  let phone = '';
  let locale = 'en';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    phone = body.phone || '';
    locale = body.locale || 'en';
  } else {
    const form = await request.formData();
    const code = (form.get('code') || '').toString();
    const number = (form.get('number') || '').toString();
    phone = `${code}${number}`.replace(/\s+/g, '');
    locale = (form.get('locale') || 'en').toString();
  }

  if (!phone) {
    return NextResponse.redirect(new URL(`/${locale}/login?step=phone`, request.url));
  }

  // mock OTP send
  return NextResponse.redirect(new URL(`/${locale}/login?step=otp&phone=${encodeURIComponent(phone)}`, request.url));
}
