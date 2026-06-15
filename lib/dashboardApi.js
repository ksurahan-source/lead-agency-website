import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

const getEnv = () => {
  try {
    return getRequestContext().env;
  } catch {
    return process.env;
  }
};

const getAdminPassword = (env) => (env.ADMIN_PASSWORD || 'hiop2025').trim();

export const requireAdmin = (request) => {
  const env = getEnv();
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');
  return pw && pw === getAdminPassword(env);
};

export async function proxyDashboard(request, endpoint, { ttlSeconds = 60 } = {}) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const env = getEnv();
  const base = env.DASHBOARD_API_URL;
  const token = env.DASHBOARD_API_TOKEN;

  if (!base || !token) {
    return NextResponse.json(
      { message: '대시보드 API가 설정되지 않았습니다.' },
      { status: 503 },
    );
  }

  const upstreamUrl = new URL(endpoint, base.endsWith('/') ? base : `${base}/`);
  const inboundParams = new URL(request.url).searchParams;
  for (const [k, v] of inboundParams.entries()) {
    if (k === 'pw') continue;
    upstreamUrl.searchParams.set(k, v);
  }

  let upstream;
  try {
    upstream = await fetch(upstreamUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cf: { cacheTtl: ttlSeconds, cacheEverything: true },
    });
  } catch (err) {
    return NextResponse.json(
      { message: '대시보드 API 호출 실패', detail: String(err) },
      { status: 502 },
    );
  }

  const text = await upstream.text();
  const headers = {
    'Content-Type': upstream.headers.get('content-type') || 'application/json',
    'Cache-Control': `public, max-age=${ttlSeconds}, s-maxage=${ttlSeconds}`,
  };
  return new Response(text, { status: upstream.status, headers });
}
