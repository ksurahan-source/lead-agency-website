import { createServer } from 'node:http';

import { handleFetchRequest } from './handler.js';

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 8789;

const server = createServer(async (incoming, outgoing) => {
  try {
    const hostHeader = incoming.headers.host ?? `${getHost()}:${getPort()}`;
    const url = new URL(incoming.url ?? '/', `http://${hostHeader}`);
    const body = await readIncomingBody(incoming);
    const request = new Request(url, {
      method: incoming.method,
      headers: toWebHeaders(incoming.headers),
      body,
      duplex: body ? 'half' : undefined,
    });
    const response = await handleFetchRequest(request);
    await sendWebResponse(outgoing, response);
  } catch (error) {
    console.error('[render-trigger:http:error]', error);
    outgoing.writeHead(500, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    });
    outgoing.end(JSON.stringify({ success: false, error: getErrorMessage(error) }));
  }
});

server.listen(getPort(), getHost(), () => {
  console.log(`[render-trigger] listening on http://${getHost()}:${getPort()}`);
});

async function readIncomingBody(incoming) {
  if (incoming.method === 'GET' || incoming.method === 'HEAD') return undefined;
  const chunks = [];
  for await (const chunk of incoming) chunks.push(chunk);
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

async function sendWebResponse(outgoing, response) {
  outgoing.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  const body = Buffer.from(await response.arrayBuffer());
  outgoing.end(body);
}

function toWebHeaders(headers) {
  const webHeaders = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      for (const item of value) webHeaders.append(key, item);
    } else if (value !== undefined) {
      webHeaders.set(key, value);
    }
  }
  return webHeaders;
}

function getHost() {
  return process.env.HOST?.trim() || DEFAULT_HOST;
}

function getPort() {
  return Number(process.env.PORT || DEFAULT_PORT);
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Unknown render-trigger error';
}
