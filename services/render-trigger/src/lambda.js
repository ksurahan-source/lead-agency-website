import { handleFetchRequest } from './handler.js';

export async function handler(event) {
  const method = event.requestContext?.http?.method ?? event.httpMethod ?? 'GET';
  const path = event.rawPath ?? event.path ?? '/';
  const query = event.rawQueryString ? `?${event.rawQueryString}` : buildQueryString(event.queryStringParameters);
  const headers = new Headers(event.headers ?? {});
  const host = headers.get('host') ?? 'render-trigger.local';
  const body = getEventBody(event);
  const request = new Request(`https://${host}${path}${query}`, {
    method,
    headers,
    body,
  });

  const response = await handleFetchRequest(request);

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
  };
}

function getEventBody(event) {
  if (!event.body) return undefined;
  if (event.isBase64Encoded) return Buffer.from(event.body, 'base64');
  return event.body;
}

function buildQueryString(queryStringParameters) {
  if (!queryStringParameters) return '';
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(queryStringParameters)) {
    if (value !== undefined && value !== null) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}
