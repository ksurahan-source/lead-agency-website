import { proxyDashboard } from '@/lib/dashboardApi';

export const runtime = 'edge';

export async function GET(request) {
  return proxyDashboard(request, '/timeseries', { ttlSeconds: 60 });
}
