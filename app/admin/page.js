'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/leads?pw=${password}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        setIsLoggedIn(true);
        localStorage.setItem('admin_pw', password);
      } else {
        setError('비밀번호가 틀렸습니다.');
      }
    } catch (err) {
      setError('서버 연결 오류');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPw = localStorage.getItem('admin_pw');
    if (savedPw) {
      setPassword(savedPw);
      // 이전에 저장된 비번이 있으면 자동 시도
      const autoLogin = async () => {
        const res = await fetch(`/api/admin/leads?pw=${savedPw}`);
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          setIsLoggedIn(true);
        }
      };
      autoLogin();
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full"
        >
          <h1 className="text-4xl font-black mb-6 uppercase italic tracking-tighter">HI-OP ADMIN</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold uppercase mb-1">Access Key</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[3px] border-black p-3 font-bold focus:outline-none focus:bg-yellow-100"
                placeholder="****"
              />
            </div>
            {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-black py-4 uppercase hover:bg-yellow-400 hover:text-black transition-colors border-[3px] border-black"
            >
              {loading ? 'Authenticating...' : 'Enter Admin'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-6xl font-black tracking-tighter italic uppercase underline decoration-yellow-400">LEAD CONTROL</h1>
            <p className="font-bold text-xl mt-2">HI-OP Digital Agency Performance Dashboard</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_pw');
              window.location.reload();
            }}
            className="bg-white border-[3px] border-black px-6 py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total Leads" value={leads.length} color="bg-blue-400" />
          <StatCard title="Facebook/Meta" value={leads.filter(l => l.source === 'meta').length} color="bg-pink-400" />
          <StatCard title="Google/TikTok" value={leads.filter(l => l.source !== 'meta').length} color="bg-green-400" />
        </div>

        <div className="bg-white border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white uppercase text-sm">
                <th className="p-4 border-r border-white">Date</th>
                <th className="p-4 border-r border-white">Name</th>
                <th className="p-4 border-r border-white">Source</th>
                <th className="p-4 border-r border-white">Company</th>
                <th className="p-4 border-r border-white">Contact</th>
                <th className="p-4">Message</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {leads.map((lead, idx) => (
                <tr key={lead.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="p-4 border-b-[3px] border-r-[3px] border-black text-xs">
                    {new Date(lead.created_at).toLocaleString('ko-KR')}
                  </td>
                  <td className="p-4 border-b-[3px] border-r-[3px] border-black text-lg">
                    {lead.name}
                  </td>
                  <td className="p-4 border-b-[3px] border-r-[3px] border-black">
                    <SourceBadge source={lead.source} />
                  </td>
                  <td className="p-4 border-b-[3px] border-r-[3px] border-black italic">
                    {lead.company}
                  </td>
                  <td className="p-4 border-b-[3px] border-r-[3px] border-black text-sm">
                    {lead.email}<br/>{lead.phone}
                  </td>
                  <td className="p-4 border-b-[3px] border-black text-sm max-w-xs truncate" title={lead.inquiry}>
                    {lead.inquiry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <div className="p-20 text-center font-black text-4xl uppercase opacity-20 italic">
              No Leads Captured Yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`${color} border-[4px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
      <h3 className="text-sm font-black uppercase mb-2">{title}</h3>
      <p className="text-6xl font-black tracking-tighter">{value}</p>
    </div>
  );
}

function SourceBadge({ source }) {
  const colors = {
    meta: 'bg-pink-400',
    google: 'bg-green-400',
    'tiktok-moloco': 'bg-yellow-400',
    'hi-op': 'bg-gray-400'
  };

  return (
    <span className={`${colors[source] || 'bg-gray-300'} border-[2px] border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
      {source}
    </span>
  );
}
