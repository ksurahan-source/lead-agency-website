import { getCreativeEnv } from '@/lib/creativeUsageStore';

const DEFAULT_CONTENT_TYPE = 'application/octet-stream';

export function getCreativeArtifactKey(input = {}) {
  const type = cleanSegment(input.type) || 'artifacts';
  const runId = cleanSegment(input.runId) || 'unassigned';
  const ownerId = cleanSegment(input.jobId || input.assetId || input.id) || crypto.randomUUID();
  const fileName = cleanFileName(input.fileName) || `${ownerId}.${cleanExtension(input.extension) || 'json'}`;

  return `creative/${type}/${runId}/${ownerId}/${fileName}`;
}

export async function putCreativeArtifact(input = {}) {
  const { env, isCloudflare } = getCreativeEnv();
  const bucket = env.HI_OB_R2;

  if (!bucket) {
    if (isCloudflare) throw new Error('HI_OB_R2 binding is not configured');
    return {
      key: input.key || getCreativeArtifactKey(input),
      stored: false,
      fallback: 'local_no_r2_binding',
    };
  }

  const key = input.key || getCreativeArtifactKey(input);
  const body = input.body ?? JSON.stringify(input.json ?? {}, null, 2);
  const contentType = input.contentType || (input.json ? 'application/json' : DEFAULT_CONTENT_TYPE);

  await bucket.put(key, body, {
    httpMetadata: {
      contentType,
    },
    customMetadata: stringifyMetadata({
      ...input.metadata,
      mock: input.mock === false ? 'false' : 'true',
    }),
  });

  return {
    key,
    stored: true,
  };
}

export async function getCreativeArtifactMetadata(key) {
  const { env, isCloudflare } = getCreativeEnv();
  const bucket = env.HI_OB_R2;

  if (!bucket) {
    if (isCloudflare) throw new Error('HI_OB_R2 binding is not configured');
    return null;
  }

  const object = await bucket.head(key);
  if (!object) return null;

  return {
    key,
    size: object.size,
    uploadedAt: object.uploaded?.toISOString?.() ?? null,
    etag: object.etag,
    httpMetadata: object.httpMetadata ?? {},
    customMetadata: object.customMetadata ?? {},
  };
}

export async function getCreativeArtifactObject(key) {
  const { env, isCloudflare } = getCreativeEnv();
  const bucket = env.HI_OB_R2;

  if (!bucket) {
    if (isCloudflare) throw new Error('HI_OB_R2 binding is not configured');
    return null;
  }

  return bucket.get(key);
}

function cleanSegment(value) {
  return typeof value === 'string'
    ? value.trim().replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : '';
}

function cleanFileName(value) {
  return typeof value === 'string'
    ? value.trim().replace(/[^\w.-]/g, '-').replace(/-+/g, '-')
    : '';
}

function cleanExtension(value) {
  return typeof value === 'string' ? value.trim().replace(/^\./, '').replace(/[^\w]/g, '') : '';
}

function stringifyMetadata(metadata = {}) {
  return Object.fromEntries(
    Object.entries(metadata)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]),
  );
}
