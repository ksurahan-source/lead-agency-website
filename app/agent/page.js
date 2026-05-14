import { cookies } from 'next/headers';
import { ShieldCheck } from 'lucide-react';
import AgentConsole from './AgentConsole';
import styles from './page.module.css';
import { AGENT_COOKIE_NAME, hasAgentAuthConfig, verifyAgentSessionToken } from '@/lib/agentAuth';

export const runtime = 'edge';

export const metadata = {
  title: 'HI-OB Agent | Private Engine',
  description: 'HI-OB private video generation engine.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AgentPage({ searchParams }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const isAuthenticated = await verifyAgentSessionToken(cookieStore.get(AGENT_COOKIE_NAME)?.value);

  if (isAuthenticated) {
    return <AgentConsole />;
  }

  return (
    <main className={styles.loginShell}>
      <section className={styles.loginPanel}>
        <div className={styles.brandMark}>
          <span>Hi</span>
          <i />
          <span>OB</span>
        </div>
        <p className={styles.kicker}>
          <ShieldCheck size={18} />
          Private agent
        </p>
        <h1>운영자 전용 광고 엔진</h1>
        <p className={styles.loginLead}>
          이 페이지는 등록된 운영자만 사용할 수 있습니다. 로그인 후 바로 영상 생성 콘솔이 열립니다.
        </p>

        {!hasAgentAuthConfig() ? (
          <p className={styles.error}>Cloudflare 환경변수 설정이 필요합니다.</p>
        ) : null}
        {params.error === '1' ? <p className={styles.error}>이메일 또는 비밀번호가 맞지 않습니다.</p> : null}

        <form className={styles.loginForm} action="/api/agent/login" method="post">
          <label>
            이메일
            <input autoComplete="email" inputMode="email" name="email" required type="email" />
          </label>
          <label>
            비밀번호
            <input autoComplete="current-password" name="password" required type="password" />
          </label>
          <button type="submit">로그인</button>
        </form>
      </section>
    </main>
  );
}
