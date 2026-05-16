import fs from 'node:fs/promises';
import path from 'node:path';

import { isErrnoException } from '@/lib/errors';
import type { OpenAIModel } from '@/lib/types';

interface UsageEntry {
  timestamp: string;
  costUsd: number;
  model: OpenAIModel;
}

interface MonthlyUsageBucket {
  totalCostUsd: number;
  requests: UsageEntry[];
}

interface UsageStore {
  months: Record<string, MonthlyUsageBucket>;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const USAGE_FILE = path.join(DATA_DIR, 'openai-usage.json');

const EMPTY_STORE: UsageStore = { months: {} };

function getCurrentMonthKey(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readStore(): Promise<UsageStore> {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(USAGE_FILE, 'utf8');
    return JSON.parse(raw) as UsageStore;
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      return EMPTY_STORE;
    }

    throw error;
  }
}

async function writeStore(store: UsageStore) {
  await ensureDataDir();
  await fs.writeFile(USAGE_FILE, JSON.stringify(store, null, 2), 'utf8');
}

export async function getMonthlyOpenAIUsage() {
  const monthKey = getCurrentMonthKey();
  const store = await readStore();

  return {
    monthKey,
    totalCostUsd: store.months[monthKey]?.totalCostUsd ?? 0,
  };
}

export async function recordOpenAIUsage(entry: UsageEntry) {
  const monthKey = getCurrentMonthKey(new Date(entry.timestamp));
  const store = await readStore();
  const bucket = store.months[monthKey] ?? { totalCostUsd: 0, requests: [] };

  bucket.totalCostUsd += entry.costUsd;
  bucket.requests.push(entry);

  store.months[monthKey] = bucket;
  await writeStore(store);

  return {
    monthKey,
    totalCostUsd: bucket.totalCostUsd,
  };
}
