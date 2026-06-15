import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { STAGE_EVENTS, buildLeadStageEvent, sendLeadStageEvent } from '@/lib/metaLeadStages';

export const runtime = 'edge';

// ── env 헬퍼: Edge Runtime에서는 getRequestContext().env 에서 읽어야 함
const getEnv = () => {
  try {
    return getRequestContext().env;
  } catch {
    return process.env; // local fallback
  }
};

const getAdminPassword = (env) => (env.ADMIN_PASSWORD || 'hiop2025').trim();

const requireAdmin = (request, env) => {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');

  return pw && pw === getAdminPassword(env);
};

// Helper to emit lead stage events to Meta (fire-and-forget)
const emitLeadStageEvent = async (lead, newStatus, env) => {
  try {
    // Only emit if Meta is configured and status is in the map
    const accessToken = env.META_ACCESS_TOKEN || env.META_LEADS_TOKEN;
    if (!accessToken || !STAGE_EVENTS[newStatus]) {
      return;
    }

    const pixelId = env.META_PIXEL_ID || '1715625702927911';
    const graphVersion = env.META_GRAPH_API_VERSION || 'v25.0';

    const payload = await buildLeadStageEvent(lead, newStatus, {
      testEventCode: env.META_TEST_EVENT_CODE,
      paidValue: 500000,
    });

    if (!payload) {
      return;
    }

    await sendLeadStageEvent(payload, {
      pixelId,
      accessToken,
      graphVersion,
    });
  } catch (err) {
    // Fire-and-forget: only warn, never affect response
    console.warn('[Lead Stage Event Error]', err);
  }
};

const getDb = (env) => {
  if (!env.DB) {
    throw new Error('DB binding is not configured');
  }

  return env.DB;
};

// GET /api/leads — 리드 목록 조회
export async function GET(request) {
  try {
    const env = getEnv();

    if (!requireAdmin(request, env)) {
      return NextResponse.json({ message: '인증 실패' }, { status: 401 });
    }

    const DB = getDb(env);
    const { results } = await DB.prepare(
      'SELECT * FROM leads ORDER BY created_at DESC'
    ).all();

    return NextResponse.json({ leads: results });
  } catch (error) {
    console.error('[Leads API Error]', error);
    return NextResponse.json({ message: '리드 목록을 불러오지 못했습니다.' }, { status: 500 });
  }
}

// PATCH /api/leads — 리드 상태 업데이트
export async function PATCH(request) {
  try {
    const env = getEnv();

    if (!requireAdmin(request, env)) {
      return NextResponse.json({ message: '인증 실패' }, { status: 401 });
    }

    const { id, status } = await request.json();
    const DB = getDb(env);

    const result = await DB.prepare(
      "UPDATE leads SET status = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(status, id).run();

    if (result.changes === 0) {
      return NextResponse.json({ message: '리드를 찾을 수 없습니다.' }, { status: 404 });
    }

    const lead = await DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first();

    // Fire-and-forget: emit lead stage event to Meta (never blocks response)
    await emitLeadStageEvent(lead, status, env).catch(() => {});

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('[Leads API Error]', error);
    return NextResponse.json({ message: '리드 상태를 업데이트하지 못했습니다.' }, { status: 500 });
  }
}

// DELETE /api/leads — 리드 삭제
export async function DELETE(request) {
  try {
    const env = getEnv();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!requireAdmin(request, env)) {
      return NextResponse.json({ message: '인증 실패' }, { status: 401 });
    }

    const DB = getDb(env);
    await DB.prepare('DELETE FROM leads WHERE id = ?').bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Leads API Error]', error);
    return NextResponse.json({ message: '리드를 삭제하지 못했습니다.' }, { status: 500 });
  }
}
