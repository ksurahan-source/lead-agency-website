// Static Assets emulators can return 200 for a Range request. Supply the same
// single-range response as production so browser video seeking stays reliable.
export async function mediaRange(request, response) {
  if (!new URL(request.url).pathname.endsWith('.mp4') || response.status !== 200) return response;
  const headers = new Headers(response.headers);
  headers.set('Accept-Ranges', 'bytes');
  const range = request.headers.get('range');
  const ifRange = request.headers.get('if-range');
  if (!range || request.method === 'HEAD' || (ifRange && ifRange !== headers.get('etag'))) {
    return new Response(response.body, { status: 200, headers });
  }
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match || (!match[1] && !match[2])) return new Response(response.body, { status: 200, headers });
  const body = await response.arrayBuffer(), size = body.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
    headers.set('Content-Range', `bytes */${size}`);headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, headers });
}
