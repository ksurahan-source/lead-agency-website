import { NextResponse } from 'next/server';
import {
  AGENT_COOKIE_NAME,
  createAgentSession,
  getAgentCookieOptions,
  hasAgentAuthConfig,
  verifyAgentPassword,
} from '@/lib/agentAuth';

export const runtime = 'edge';

export async function POST(request) {
  const formData = await request.formData();
  const email = getString(formData.get('email'));
  const password = getString(formData.get('password'));

  if (!hasAgentAuthConfig()) {
    return NextResponse.redirect(new URL('/agent?error=config', request.url), { status: 303 });
  }

  if (!email || !password || !(await verifyAgentPassword(email, password))) {
    return NextResponse.redirect(new URL('/agent?error=1', request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL('/agent', request.url), { status: 303 });
  response.cookies.set(AGENT_COOKIE_NAME, await createAgentSession(email), getAgentCookieOptions());

  return response;
}

function getString(value) {
  return typeof value === 'string' ? value.trim() : '';
}
