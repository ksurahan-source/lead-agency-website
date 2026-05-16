import { NextResponse } from 'next/server';

import { readCreativeJobById } from '@/lib/creativeUsageStore';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function GET(request, { params }) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const routeParams = await params;
  const jobId = typeof routeParams?.jobId === 'string' ? routeParams.jobId.trim() : '';
  if (!jobId) {
    return NextResponse.json({ success: false, error: 'JOB_ID_REQUIRED' }, { status: 400 });
  }

  try {
    const renderJob = await readCreativeJobById(jobId);
    if (!renderJob || renderJob.kind !== 'render') {
      return NextResponse.json({ success: false, error: 'RENDER_JOB_NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      renderJob,
      artifactUrl: renderJob.r2Key ? `/api/creative/artifacts?key=${encodeURIComponent(renderJob.r2Key)}` : null,
    });
  } catch (error) {
    console.error('[creative/render/:jobId]', error);

    return NextResponse.json({
      success: false,
      error: 'RENDER_JOB_UNAVAILABLE',
      message: 'Unable to read creative render job.',
    }, { status: 500 });
  }
}
