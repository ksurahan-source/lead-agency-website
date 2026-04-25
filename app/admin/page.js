'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const STATUS_OPTIONS = [
  { value: 'new',       label: '신규',     color: '#7c3aed' },
  { value: 'contacted', label: '연락완료', color: '#2563eb' },
  { value: 'converted', label: '전환완료', color: '#16a34a' },
  { value: 'closed',    label: '종료',     color: '#6b7280' },
];

const statusInfo = (val) => STATUS_OPTIONS.find(s => s.value === val) || STATUS_OPTIONS[0];

const fmt = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
};

export default function AdminPage() {
  const pwInputRef          = useRef(null);
  const [pw, setPw]         = useState('');
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Auto-login via URL: /admin?pw=hiop2025
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPw = params.get('pw');
    if (urlPw) fetchLeads(urlPw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeads = useCallback(async (password) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/leads?pw=${encodeURIComponent(password)}`);
      if (res.status === 401) {
        setError('비밀번호가 올바르지 않습니다.');
        setAuthed(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setAuthed(true);
      setPw(password); // store for future API calls
    } catch {
      setError('서버 오류가 발생했습니다.');
    }
    setLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Read directly from DOM — works regardless of how value was set
    const inputVal = pwInputRef.current?.value || '';
    fetchLeads(inputVal);
  };

  const updateStatus = async (id, status) => {
    await fetch(`/api/leads?pw=${encodeURIComponent(pw)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const deleteLead = async (id) => {
    if (!confirm('이 리드를 삭제하시겠습니까?')) return;
    await fetch(`/api/leads?pw=${encodeURIComponent(pw)}&id=${id}`, { method: 'DELETE' });
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filterStatus === 'all' ? leads : leads.filter(l => l.status === filterStatus);

  const stats = STATUS_OPTIONS.map(s => ({
    ...s,
    count: leads.filter(l => l.status === s.value).length,
  }));

  // ── Login Screen
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-logo">HI-OP</div>
          <h1 className="admin-login-title">관리자 로그인</h1>
          <p className="admin-login-sub">리드 관리 대시보드</p>
          <form onSubmit={handleLogin}>
            <div className="admin-field">
              <label htmlFor="admin-pw">비밀번호</label>
              <input
                id="admin-pw"
                name="admin-pw"
                type="password"
                ref={pwInputRef}
                defaultValue=""
                placeholder="관리자 비밀번호 입력"
                className="admin-input"
                required
              />
            </div>
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? '확인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    );
  }


  // ── Dashboard
  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">HI-OP</div>
        <p className="sidebar-label">대시보드</p>
        <nav className="sidebar-nav">
          <button className="sidebar-link active">📋 리드 관리</button>
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={() => { setAuthed(false); setPw(''); setLeads([]); }}>
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-header">
          <h1>리드 관리</h1>
          <button className="admin-refresh" onClick={() => fetchLeads(pw)}>↻ 새로고침</button>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card total">
            <p className="stat-num">{leads.length}</p>
            <p className="stat-label">전체 리드</p>
          </div>
          {stats.map(s => (
            <div key={s.value} className="stat-card" style={{ borderColor: s.color + '55' }}>
              <p className="stat-num" style={{ color: s.color }}>{s.count}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="admin-filters">
          {['all', ...STATUS_OPTIONS.map(s => s.value)].map(v => (
            <button
              key={v}
              className={`filter-btn ${filterStatus === v ? 'active' : ''}`}
              onClick={() => setFilterStatus(v)}
            >
              {v === 'all' ? '전체' : statusInfo(v).label}
            </button>
          ))}
        </div>

        {/* Table + Detail */}
        <div className="admin-content">
          {/* Lead List */}
          <div className={`lead-list ${selected ? 'split' : ''}`}>
            {loading ? (
              <div className="admin-empty">불러오는 중...</div>
            ) : filtered.length === 0 ? (
              <div className="admin-empty">리드가 없습니다.</div>
            ) : (
              <table className="lead-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>회사</th>
                    <th>출처</th>
                    <th>상태</th>
                    <th>신청일시</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <tr
                      key={lead.id}
                      className={`lead-row ${selected?.id === lead.id ? 'selected' : ''}`}
                      onClick={() => setSelected(lead)}
                    >
                      <td className="lead-name">{lead.name}</td>
                      <td className="lead-phone">{lead.phone}</td>
                      <td>{lead.company || '-'}</td>
                      <td>
                        <span style={{
                          background: lead.source === 'chart-leaders' ? 'rgba(16,185,129,0.1)' : 'rgba(124,58,237,0.1)',
                          color: lead.source === 'chart-leaders' ? '#10b981' : '#7c3aed',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}>
                          {lead.source === 'chart-leaders' ? 'Chart Leaders' : 'HI-OP'}
                        </span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={lead.status}
                          style={{ color: statusInfo(lead.status).color }}
                          onClick={e => e.stopPropagation()}
                          onChange={e => updateStatus(lead.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="lead-date">{fmt(lead.createdAt)}</td>
                      <td>
                        <button
                          className="btn-del"
                          onClick={e => { e.stopPropagation(); deleteLead(lead.id); }}
                        >✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className="lead-detail">
              <div className="detail-header">
                <h3>{selected.name}</h3>
                <button className="detail-close" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="detail-body">
                <div className="detail-row"><span>이메일</span><a href={`mailto:${selected.email}`}>{selected.email}</a></div>
                <div className="detail-row"><span>연락처</span><a href={`tel:${selected.phone}`}>{selected.phone}</a></div>
                <div className="detail-row"><span>회사명</span><p>{selected.company || '-'}</p></div>
                <div className="detail-row"><span>출처</span><p>{selected.source === 'chart-leaders' ? 'Chart Leaders' : 'HI-OP'}</p></div>
                <div className="detail-row"><span>신청일시</span><p>{fmt(selected.createdAt)}</p></div>
                <div className="detail-row"><span>최근 업데이트</span><p>{fmt(selected.updatedAt)}</p></div>
                <div className="detail-row"><span>상태</span>
                  <select
                    className="status-select"
                    value={selected.status}
                    style={{ color: statusInfo(selected.status).color }}
                    onChange={e => updateStatus(selected.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                {selected.inquiry && (
                  <div className="detail-inquiry">
                    <span>문의 내용</span>
                    <p>{selected.inquiry}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
