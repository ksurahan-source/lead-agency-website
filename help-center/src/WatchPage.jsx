import { PublicHeader, PublicFooter } from "./HelpCenter";
import styles from "./install.module.css";
export default function WatchPage({ media, transcript }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">
        본문으로 건너뛰기
      </a>
      <PublicHeader />
      <main id="main" className="watch-page">
        <p className="kicker">HIOB / 30초 사용 흐름</p>
        <h1>대화에서 영상 프로젝트까지.</h1>
        <p>
          자료를 공유하고, 기획을 확인하고, 필요한 장면을 만들고, 영상과
          프로젝트를 함께 남기는 흐름입니다.
        </p>
        <video
          controls
          playsInline
          preload="metadata"
          poster={media.poster}
          width="1920"
          height="1080"
        >
          <source src={media.film} type="video/mp4" />
          <track
            kind="captions"
            src={media.captions}
            srcLang="ko"
            label="한국어"
            default
          />
          브라우저가 영상을 지원하지 않으면{" "}
          <a href={media.film}>영상 파일 보기</a>를 이용하세요.
        </video>
        <p className="watch-caption">
          사용 과정을 표현한 연출 영상입니다. 실제 고객 화면 녹화나 설치 성공의
          증거 영상은 아닙니다.
        </p>
        <section className="transcript">
          <h2>영상 대본</h2>
          <ol>
            {transcript.map((cue) => (
              <li key={cue.time}>
                <time>{cue.time}</time>
                <span>{cue.text}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="watch-next">
          <h2>이제 내 프로젝트로 시작하세요.</h2>
          <p>
            사람·AI·HIOB의 역할과 필요한 준비물을 읽은 뒤 설치 안내로
            이어가세요.
          </p>
          <a href="/mcp">HIOB MCP 알아보기 →</a>
          <a href="/help/install">내 컴퓨터에 설치하기 →</a>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
