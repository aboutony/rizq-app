import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  let phone = '';
  let code = '';
  let locale = 'en';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    phone = body.phone || '';
    code = body.code || '';
    locale = body.locale || 'en';
  } else {
    const form = await request.formData();
    phone = (form.get('phone') || '').toString();
    code = (form.get('code') || '').toString();
locale = (form.get('locale') || 'en').toString();
  }

  if (!phone || code !== '123456') {
    return NextResponse.redirect(new URL(`/${locale}/login?step=otp&phone=${encodeURIComponent(phone)}`, request.url));
  }

  return NextResponse.redirect(new URL(`/${locale}/login?step=role&phone=${encodeURIComponent(phone)}`, request.url));
}
