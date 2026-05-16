import { NextResponse } from 'next/server';

import { getCreativeArtifactObject } from '@/lib/creativeArtifacts';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function GET(request) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key')?.trim();

  if (!key) {
    return NextResponse.json({ error: 'ARTIFACT_KEY_REQUIRED' }, { status: 400 });
  }
  if (!isAllowedCreativeArtifactKey(key)) {
    return NextResponse.json({ error: 'INVALID_ARTIFACT_KEY' }, { status: 400 });
  }

  try {
    const object = await getCreativeArtifactObject(key);
    if (!object) {
      return NextResponse.json({ error: 'ARTIFACT_NOT_FOUND' }, { status: 404 });
    }

    const headers = new Headers({
      'content-type': getContentType(key, object.httpMetadata?.contentType),
      'cache-control': 'private, no-store',
      'content-disposition': getContentDisposition(key),
    });
    if (object.size !== undefined) headers.set('content-length', String(object.size));
    if (object.etag) headers.set('etag', object.etag);

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('[creative/artifacts]', error);

    return NextResponse.json({
      success: false,
      error: 'ARTIFACT_UNAVAILABLE',
      message: 'Unable to read creative artifact.',
    }, { status: 500 });
  }
}

function isAllowedCreativeArtifactKey(key) {
  return key.startsWith('creative/') &&
    !key.includes('..') &&
    !key.startsWith('/') &&
    !key.includes('\\') &&
    !key.includes('\0');
}

function getContentType(key, storedContentType) {
  if (storedContentType) return storedContentType;
  if (key.endsWith('.json')) return 'application/json; charset=utf-8';
  if (key.endsWith('.mp4')) return 'video/mp4';
  return 'application/octet-stream';
}

function getContentDisposition(key) {
  const fileName = key.split('/').filter(Boolean).at(-1) || 'artifact';
  return `inline; filename="${fileName.replace(/"/g, '')}"`;
}
