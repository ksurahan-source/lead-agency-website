import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { STUDIO_COOKIE_NAME, hasStudioAuthConfig, verifyStudioSessionToken } from '@/lib/studioAuth';
import styles from './page.module.css';

export const runtime = 'edge';

export const metadata = {
  title: 'HI-OP Creative Studio 로그인',
  description: 'HI-OP Creative Studio 운영자 인증 페이지입니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudioLoginPage({ searchParams }) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const isAuthenticated = await verifyStudioSessionToken(cookieStore.get(STUDIO_COOKIE_NAME)?.value);
  const error = params.error;

  if (isAuthenticated) {
    redirect('/studio');
  }

  return (
    <main className={styles.loginShell}>
      <section className={styles.loginPanel} aria-labelledby="studio-login-title">
        <div className={styles.brandMark}>
          <span>HI</span>
          <i />
          <span>OP</span>
        </div>

        <div>
          <p className={styles.kicker}>Creative Studio</p>
          <h1 id="studio-login-title">소재 운영 콘솔 로그인</h1>
          <p className={styles.lead}>
            등록된 운영자만 쇼츠 제작 모듈과 Cost Meter를 확인할 수 있습니다.
          </p>
        </div>

        {!hasStudioAuthConfig() ? (
          <p className={styles.error} role="alert">
            Studio 인증 환경변수 설정이 필요합니다.
          </p>
        ) : null}
        {error === '1' ? (
          <p className={styles.error} role="alert">
            이메일 또는 비밀번호가 맞지 않습니다.
          </p>
        ) : null}
        {error === 'config' ? (
          <p className={styles.error} role="alert">
            Studio 인증 설정이 없어 로그인할 수 없습니다.
          </p>
        ) : null}

        <form className={styles.form} action="/api/creative/auth/login" method="post">
          <input name="next" type="hidden" value="/studio" />
          <label>
            이메일
            <input
              autoComplete="email"
              inputMode="email"
              name="email"
              placeholder="운영자 이메일"
              required
              type="email"
            />
          </label>
          <label>
            비밀번호
            <input
              autoComplete="current-password"
              name="password"
              placeholder="비밀번호"
              required
              type="password"
            />
          </label>
          <button type="submit">Studio 로그인</button>
        </form>
      </section>
    </main>
  );
}
