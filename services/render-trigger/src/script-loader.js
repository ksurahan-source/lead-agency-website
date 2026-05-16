import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const DEFAULT_ARTIFACT_ROUTE_PATH = '/api/creative/artifacts';

export async function loadScriptArtifact(scriptArtifactKey) {
  if (isHttpUrl(scriptArtifactKey)) {
    return fetchJson(scriptArtifactKey);
  }

  const routeBaseUrl = clean(process.env.SCRIPT_ARTIFACT_BASE_URL);
  if (routeBaseUrl) {
    return fetchJson(buildArtifactRouteUrl(routeBaseUrl, scriptArtifactKey), buildArtifactRouteHeaders());
  }

  const publicBaseUrl = clean(process.env.R2_PUBLIC_BASE_URL);
  if (publicBaseUrl) {
    return fetchJson(`${publicBaseUrl.replace(/\/$/, '')}/${encodeArtifactPath(scriptArtifactKey)}`);
  }

  if (hasR2S3Config()) {
    return loadFromR2S3(scriptArtifactKey);
  }

  throw new Error(
    'Script artifact loading is not configured. Set SCRIPT_ARTIFACT_BASE_URL, R2_PUBLIC_BASE_URL, or R2 S3 credentials.',
  );
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Script artifact fetch failed: ${response.status}`);
  }
  return response.json();
}

function buildArtifactRouteUrl(baseUrl, key) {
  const url = new URL(baseUrl);
  if (url.pathname === '/' || url.pathname === '') {
    url.pathname = DEFAULT_ARTIFACT_ROUTE_PATH;
  }
  url.searchParams.set('key', key);
  return url.toString();
}

function buildArtifactRouteHeaders() {
  const bearer = clean(process.env.SCRIPT_ARTIFACT_BEARER_TOKEN);
  return bearer ? { authorization: `Bearer ${bearer}` } : {};
}

async function loadFromR2S3(key) {
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${requiredEnv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
    },
    forcePathStyle: true,
  });

  const result = await client.send(new GetObjectCommand({
    Bucket: requiredEnv('R2_BUCKET_NAME'),
    Key: key,
  }));

  const text = await result.Body.transformToString();
  return JSON.parse(text);
}

function hasR2S3Config() {
  return Boolean(
    clean(process.env.R2_ACCOUNT_ID) &&
      clean(process.env.R2_ACCESS_KEY_ID) &&
      clean(process.env.R2_SECRET_ACCESS_KEY) &&
      clean(process.env.R2_BUCKET_NAME),
  );
}

function encodeArtifactPath(key) {
  return key.split('/').map((part) => encodeURIComponent(part)).join('/');
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function requiredEnv(name) {
  const value = clean(process.env[name]);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}
