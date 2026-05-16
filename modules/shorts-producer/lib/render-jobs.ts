import fs from 'node:fs/promises';
import path from 'node:path';

import { isErrnoException } from '@/lib/errors';
import type { RenderJob } from '@/lib/types';

interface RenderJobStore {
  jobs: Record<string, RenderJob>;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const JOBS_FILE = path.join(DATA_DIR, 'render-jobs.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readStore(): Promise<RenderJobStore> {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(JOBS_FILE, 'utf8');
    return JSON.parse(raw) as RenderJobStore;
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      return { jobs: {} };
    }

    throw error;
  }
}

async function writeStore(store: RenderJobStore) {
  await ensureDataDir();
  await fs.writeFile(JOBS_FILE, JSON.stringify(store, null, 2), 'utf8');
}

export async function saveRenderJob(job: RenderJob) {
  const store = await readStore();
  store.jobs[job.id] = job;
  await writeStore(store);
  return job;
}

export async function getRenderJob(id: string) {
  const store = await readStore();
  return store.jobs[id] ?? null;
}
