import fs from 'node:fs/promises';
import path from 'node:path';

import { isErrnoException } from '@/lib/errors';
import type { RenderJob } from '@/lib/types';

interface RenderStateStore {
  jobs: Record<string, RenderJob>;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const JOBS_FILE = path.join(DATA_DIR, 'render-jobs.json');
const STATE_KEY_PREFIX = 'render-state';

export async function saveRenderState(job: RenderJob) {
  const normalizedJob = {
    ...job,
    updatedAt: job.updatedAt || new Date().toISOString(),
  };

  if (shouldUseS3StateStore()) {
    await writeJobToS3(normalizedJob);
    return normalizedJob;
  }

  const store = await readLocalStore();
  store.jobs[normalizedJob.id] = normalizedJob;
  await writeLocalStore(store);
  return normalizedJob;
}

export async function getRenderState(id: string) {
  if (shouldUseS3StateStore()) {
    return readJobFromS3(id);
  }

  const store = await readLocalStore();
  return normalizePersistedJob(store.jobs[id]);
}

export async function updateRenderState(id: string, updater: (job: RenderJob) => RenderJob | Promise<RenderJob>) {
  const current = await getRenderState(id);
  if (!current) return null;

  return saveRenderState(await updater(current));
}

function shouldUseS3StateStore() {
  return Boolean(process.env.RENDER_STATE_S3_BUCKET?.trim());
}

async function readLocalStore(): Promise<RenderStateStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await fs.readFile(JOBS_FILE, 'utf8');
    return JSON.parse(raw) as RenderStateStore;
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === 'ENOENT') return { jobs: {} };
    throw error;
  }
}

async function writeLocalStore(store: RenderStateStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(JOBS_FILE, JSON.stringify(store, null, 2), 'utf8');
}

async function writeJobToS3(job: RenderJob) {
  const { PutObjectCommand, S3Client } = await import('@aws-sdk/client-s3');
  const client = new S3Client({ region: process.env.AWS_REGION });
  const bucket = requiredEnv('RENDER_STATE_S3_BUCKET');

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: stateKey(job.id),
    ContentType: 'application/json',
    Body: JSON.stringify(job, null, 2),
  }));
}

async function readJobFromS3(id: string) {
  const { GetObjectCommand, NoSuchKey, S3Client } = await import('@aws-sdk/client-s3');
  const client = new S3Client({ region: process.env.AWS_REGION });
  const bucket = requiredEnv('RENDER_STATE_S3_BUCKET');

  try {
    const response = await client.send(new GetObjectCommand({
      Bucket: bucket,
      Key: stateKey(id),
    }));
    const raw = await response.Body?.transformToString();

    return normalizePersistedJob(raw ? JSON.parse(raw) as RenderJob : null);
  } catch (error: unknown) {
    if (error instanceof NoSuchKey || isS3NoSuchKey(error)) return null;
    throw error;
  }
}

function stateKey(id: string) {
  return `${STATE_KEY_PREFIX}/${id}.json`;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function isS3NoSuchKey(error: unknown) {
  return Boolean(
    error &&
    typeof error === 'object' &&
    'name' in error &&
    (error as { name?: string }).name === 'NoSuchKey'
  );
}

function normalizePersistedJob(job: RenderJob | null | undefined) {
  if (!job) return null;

  return {
    ...job,
    provider: 'aws-remotion' as const,
  };
}
