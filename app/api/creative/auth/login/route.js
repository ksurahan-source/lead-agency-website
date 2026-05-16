import { NextResponse } from 'next/server';

import {
  STUDIO_COOKIE_NAME,
  createStudioSession,
  getStudioCookieOptions,
  hasStudioAuthConfig,
  verifyStudioPassword,
} from '@/lib/studioAuth';

export const runtime = 'edge';

export async function POST(request) {
  const formData = await request.formData();
  const email = getString(formData.get('email'));
  const password = getString(formData.get('password'));
  const nextPath = sanitizeNextPath(getString(formData.get('next')));

  if (!hasStudioAuthConfig()) {
    return NextResponse.redirect(new URL('/studio/login?error=config', request.url), { status: 303 });
  }

  if (!email || !password || !(await verifyStudioPassword(email, password))) {
    return NextResponse.redirect(new URL('/studio/login?error=1', request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), { status: 303 });
  response.cookies.set(STUDIO_COOKIE_NAME, await createStudioSession(email), getStudioCookieOptions());

  return response;
}

function getString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeNextPath(value) {
  if (!value.startsWith('/studio')) return '/studio';
  if (value.startsWith('/studio/login')) return '/studio';
  return value;
}
