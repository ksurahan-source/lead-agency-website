import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hiop2025';

// GET /api/leads — 리드 목록 조회
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const { env } = getRequestContext();
  const { results } = await env.DB.prepare(
    'SELECT * FROM leads ORDER BY created_at DESC'
  ).all();

  return NextResponse.json({ leads: results });
}

// PATCH /api/leads — 리드 상태 업데이트
export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const { id, status } = await request.json();
  const { env } = getRequestContext();

  const result = await env.DB.prepare(
    "UPDATE leads SET status = ?, updated_at = datetime('now') WHERE id = ?"
  ).bind(status, id).run();

  if (result.changes === 0) {
    return NextResponse.json({ message: '리드를 찾을 수 없습니다.' }, { status: 404 });
  }

  const lead = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first();
  return NextResponse.json({ success: true, lead });
}

// DELETE /api/leads — 리드 삭제
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');
  const id = searchParams.get('id');

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const { env } = getRequestContext();
  await env.DB.prepare('DELETE FROM leads WHERE id = ?').bind(id).run();

  return NextResponse.json({ success: true });
}
