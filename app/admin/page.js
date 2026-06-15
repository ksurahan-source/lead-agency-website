'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import styles from './page.module.css';

const fetchJson = async (path, pw) => {
  const url = `${path}${path.includes('?') ? '&' : '?'}pw=${encodeURIComponent(pw)}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `요청 실패 (${res.status})`);
  }
  return data;
};

const fetchLeads = async (pw) => {
  const data = await fetchJson('/api/leads', pw);
  return Array.isArray(data.leads) ? data.leads : [];
};

const fetchOverview = async (pw) => (await fetchJson('/api/dashboard/overview', pw)).overview;
const fetchTimeseries = async (pw) => (await fetchJson('/api/dashboard/timeseries', pw)).timeseries;
const fetchSources = async (pw) => (await fetchJson('/api/dashboard/sources', pw)).sources;

const DATE_RANGES = [
  { key: 'today', label: '오늘', ms: 24 * 60 * 60 * 1000 },
  { key: '7d', label: '7일', ms: 7 * 24 * 60 * 60 * 1000 },
  { key: '30d', label: '30일', ms: 30 * 24 * 60 * 60 * 1000 },
  { key: 'all', label: '전체', ms: null },
];

const sourceBadgeClass = (source) => {
  if (!source) return styles.badge;
  if (source.startsWith('meta') || source === 'capi-final-test') return `${styles.badge} ${styles.badgeMeta}`;
  if (source.startsWith('google')) return `${styles.badge} ${styles.badgeGoogle}`;
  if (source.includes('tiktok') || source.includes('moloco')) return `${styles.badge} ${styles.badgeTiktok}`;
  return styles.badge;
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
    const time = d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { date, time };
  } catch {
    return { date: '—', time: '' };
  }
};

const formatRelative = (iso) => {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return '—';
  const mins = Math.round(diff / 60000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}시간 전`;
  return `${Math.round(hrs / 24)}일 전`;
};

const formatNumber = (n) => (n == null ? '—' : Number(n).toLocaleString('ko-KR'));

const toCsv = (rows) => {
  const headers = ['created_at', 'name', 'source', 'company', 'email', 'phone', 'inquiry'];
  const escape = (v) => {
    const s = (v ?? '').toString().replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const body = rows.map((r) => headers.map((h) => escape(r[h])).join(','));
  return [headers.join(','), ...body].join('\n');
};

const SOURCE_PALETTE = ['#E65828', '#F59E0B', '#3B82F6', '#22C55E', '#A855F7', '#06B6D4', '#EC4899', '#84CC16'];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [leads, setLeads] = useState([]);
  const [overview, setOverview] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [range, setRange] = useState('30d');
  const [activeSource, setActiveSource] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = '#0E0F12';
    return () => { document.body.style.background = prevBg; };
  }, []);

  const reload = useCallback(async (pw) => {
    setLoading(true);
    setError('');
    try {
      const [leadsData, overviewData, timeseriesData, sourcesData] = await Promise.all([
        fetchLeads(pw),
        fetchOverview(pw).catch(() => null),
        fetchTimeseries(pw).catch(() => []),
        fetchSources(pw).catch(() => []),
      ]);
      setLeads(leadsData);
      setOverview(overviewData);
      setTimeseries(timeseriesData);
      setEventTypes(sourcesData);
    } catch (err) {
      setError(err.message || '서버 연결 오류');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    try {
      await reload(password);
      setIsLoggedIn(true);
      localStorage.setItem('admin_pw', password);
    } catch {
      // error state already set
    }
  };

  useEffect(() => {
    const savedPw = localStorage.getItem('admin_pw');
    if (!savedPw) return;
    setPassword(savedPw);
    (async () => {
      try {
        await reload(savedPw);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem('admin_pw');
      }
    })();
  }, [reload]);

  const sourceCounts = useMemo(() => {
    const map = new Map();
    leads.forEach((l) => {
      const s = l.source || '(unknown)';
      map.set(s, (map.get(s) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  const filtered = useMemo(() => {
    const rangeDef = DATE_RANGES.find((r) => r.key === range);
    const cutoff = rangeDef?.ms ? Date.now() - rangeDef.ms : null;
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (cutoff && new Date(l.created_at).getTime() < cutoff) return false;
      if (activeSource !== 'all' && l.source !== activeSource) return false;
      if (q) {
        const hay = `${l.name || ''} ${l.email || ''} ${l.phone || ''} ${l.company || ''} ${l.inquiry || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, range, activeSource, query]);

  const leadStats = useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    return {
      total: leads.length,
      filtered: filtered.length,
      today: leads.filter((l) => new Date(l.created_at).getTime() > now - day).length,
      week: leads.filter((l) => new Date(l.created_at).getTime() > now - 7 * day).length,
    };
  }, [leads, filtered]);

  const timeseriesPretty = useMemo(
    () => timeseries.map((d) => ({ ...d, label: d.day.slice(5) /* MM-DD */ })),
    [timeseries],
  );

  const eventTypesPretty = useMemo(
    () => eventTypes.slice(0, 8).map((e, i) => ({ ...e, fill: SOURCE_PALETTE[i % SOURCE_PALETTE.length] })),
    [eventTypes],
  );

  const exportCsv = () => {
    const blob = new Blob(['﻿' + toCsv(filtered)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hiop-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginShell}>
        <div className={styles.loginCard}>
          <div className={styles.brandRow}>
            <span className={styles.brandDot} />
            <span className={styles.brandLabel}>hi-ob · admin</span>
          </div>
          <h1 className={styles.loginTitle}>Lead Control</h1>
          <p className={styles.loginSub}>관리자 비밀번호를 입력하세요.</p>
          <form onSubmit={handleLogin}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pw">Access Key</label>
              <input
                id="pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            {error && <div className={styles.errorBox}>{error}</div>}
            <button type="submit" disabled={loading} className={styles.primaryBtn}>
              {loading ? '인증 중…' : '입장'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const maxSourceCount = sourceCounts[0]?.[1] || 1;

  return (
    <div className={styles.dashboard}>
      <div className={styles.topbar}>
        <div>
          <div className={styles.brandRow}>
            <span className={styles.brandDot} />
            <span className={styles.brandLabel}>hi-ob · lead control</span>
          </div>
          <h1 className={styles.title}>리드 대시보드</h1>
          <p className={styles.subtitle}>
            소스 · 트래픽 · 리드 통합 — 갱신 {new Date().toLocaleString('ko-KR')}
          </p>
        </div>
        <div className={styles.toolbar}>
          <button
            className={styles.ghostBtn}
            onClick={() => reload(password).catch(() => {})}
            disabled={loading}
          >
            {loading ? '새로고침 중…' : '새로고침'}
          </button>
          <button className={styles.ghostBtn} onClick={exportCsv} disabled={filtered.length === 0}>
            CSV 내보내기
          </button>
          <button
            className={styles.ghostBtn}
            onClick={() => {
              localStorage.removeItem('admin_pw');
              window.location.reload();
            }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {error && <div className={styles.errorBox} style={{ marginBottom: 24 }}>{error}</div>}

      {/* TRAFFIC SECTION (BQ events) */}
      <SectionHead title="트래픽" sub="sGTM → Pub/Sub → BigQuery · 30분 cron 배치" />

      <div className={styles.statGrid}>
        <Stat
          label="이벤트 총계"
          value={formatNumber(overview?.events_total)}
          accent="#E65828"
          delta={overview?.last_event_at ? `마지막 ${formatRelative(overview.last_event_at)}` : '데이터 없음'}
        />
        <Stat label="오늘 이벤트" value={formatNumber(overview?.events_today)} accent="#F59E0B" delta="Asia/Seoul" />
        <Stat label="최근 7일" value={formatNumber(overview?.events_7d)} accent="#3B82F6" delta="이벤트 합계" />
        <Stat label="이벤트 종류" value={formatNumber(eventTypes.length)} accent="#22C55E" delta="14일 distinct" />
      </div>

      <div className={styles.chartGrid}>
        <div className={`${styles.chartCard} ${styles.chartCardWide}`}>
          <div className={styles.chartHead}>
            <span className={styles.chartTitle}>14일 이벤트 추이</span>
            <span className={styles.chartSub}>일별 합계 · Asia/Seoul</span>
          </div>
          <div className={styles.chartBody}>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={timeseriesPretty} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="eventGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E65828" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#E65828" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(247,248,250,0.06)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="rgba(247,248,250,0.35)"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(247,248,250,0.35)"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ stroke: 'rgba(247,248,250,0.15)' }}
                  contentStyle={{
                    background: '#15171C',
                    border: '1px solid rgba(247,248,250,0.1)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'rgba(247,248,250,0.7)' }}
                  itemStyle={{ color: '#F7F8FA' }}
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  stroke="#E65828"
                  strokeWidth={2}
                  fill="url(#eventGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHead}>
            <span className={styles.chartTitle}>이벤트 종류 (14일)</span>
            <span className={styles.chartSub}>top {eventTypesPretty.length}</span>
          </div>
          <div className={styles.chartBody}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={eventTypesPretty} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid stroke="rgba(247,248,250,0.05)" strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="rgba(247,248,250,0.35)"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="event_name"
                  stroke="rgba(247,248,250,0.5)"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(247,248,250,0.04)' }}
                  contentStyle={{
                    background: '#15171C',
                    border: '1px solid rgba(247,248,250,0.1)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: 'rgba(247,248,250,0.7)' }}
                  itemStyle={{ color: '#F7F8FA' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {eventTypesPretty.map((entry) => (
                    <Cell key={entry.event_name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LEAD SECTION (D1 leads) */}
      <SectionHead title="리드" sub="Cloudflare D1 · 폼 제출 캡처" />

      <div className={styles.statGrid}>
        <Stat label="전체 리드" value={leadStats.total} accent="#E65828" />
        <Stat label="오늘" value={leadStats.today} accent="#F59E0B" delta="최근 24시간" />
        <Stat label="최근 7일" value={leadStats.week} accent="#3B82F6" />
        <Stat label="현재 필터" value={leadStats.filtered} accent="#22C55E" delta={`${range} · ${activeSource}`} />
      </div>

      {sourceCounts.length > 0 && (
        <div className={styles.sourceList}>
          <div className={styles.sourceListHead}>
            <span>리드 소스별 분포</span>
            <span>{leads.length} 건</span>
          </div>
          {sourceCounts.map(([source, count]) => (
            <div key={source} className={styles.sourceRow}>
              <span className={styles.sourceName}>{source}</span>
              <div className={styles.sourceBarTrack}>
                <div
                  className={styles.sourceBarFill}
                  style={{ width: `${(count / maxSourceCount) * 100}%` }}
                />
              </div>
              <span className={styles.sourceCount}>{count}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.filterRow}>
        {DATE_RANGES.map((r) => (
          <button
            key={r.key}
            className={range === r.key ? styles.chipActive : styles.chip}
            onClick={() => setRange(r.key)}
          >
            {r.label}
          </button>
        ))}
        <span className={styles.divider} aria-hidden />
        <button
          className={activeSource === 'all' ? styles.chipActive : styles.chip}
          onClick={() => setActiveSource('all')}
        >
          전체 소스
        </button>
        {sourceCounts.slice(0, 6).map(([source]) => (
          <button
            key={source}
            className={activeSource === source ? styles.chipActive : styles.chip}
            onClick={() => setActiveSource(source)}
          >
            {source}
          </button>
        ))}
        <input
          className={styles.search}
          placeholder="이름·이메일·전화·회사·문의 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>일시</th>
                <th>이름</th>
                <th>소스</th>
                <th>연락처</th>
                <th>문의</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const { date, time } = formatDate(lead.created_at);
                return (
                  <tr key={lead.id}>
                    <td className={styles.cellDate}>
                      <div className={styles.cellDateMain}>{date}</div>
                      <div className={styles.cellDateSub}>{time}</div>
                    </td>
                    <td>
                      <div className={styles.cellName}>{lead.name || '—'}</div>
                      {lead.company && <div className={styles.cellCompany}>{lead.company}</div>}
                    </td>
                    <td>
                      <span className={sourceBadgeClass(lead.source)}>{lead.source || 'unknown'}</span>
                    </td>
                    <td className={styles.cellContact}>
                      {lead.email && (
                        <div><a href={`mailto:${lead.email}`}>{lead.email}</a></div>
                      )}
                      {lead.phone && (
                        <div><a href={`tel:${lead.phone}`}>{lead.phone}</a></div>
                      )}
                    </td>
                    <td>
                      <div className={styles.cellMessage} title={lead.inquiry}>
                        {lead.inquiry || '—'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>표시할 리드가 없습니다</div>
            <div className={styles.emptySub}>필터를 조정하거나 새로고침하세요.</div>
          </div>
        )}
        {filtered.length > 0 && (
          <div className={styles.tableFoot}>
            {filtered.length} / {leads.length} 건 표시 중
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHead({ title, sub }) {
  return (
    <div className={styles.sectionHead}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {sub && <span className={styles.sectionSub}>{sub}</span>}
    </div>
  );
}

function Stat({ label, value, accent, delta }) {
  return (
    <div
      className={`${styles.stat} ${styles.statAccent}`}
      style={{ '--accent': accent }}
    >
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
      {delta && <div className={styles.statDelta}>{delta}</div>}
    </div>
  );
}
