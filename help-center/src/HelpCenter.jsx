import Link from "./StudioLink";
import { Search, ArrowRight, ChevronRight } from "lucide-react";
import { MCP_RELEASE } from "./mcpInstall.mjs";
import { HELP_TOPICS, HELP_ARTICLES } from "./helpTopics.mjs";
import { helpHref } from "./routes.mjs";
import { HelpArticle, InstallGuide } from "./HelpArticles";
import styles from "./install.module.css";

export function PublicHeader() {
  return (
    <header className={styles.topbar}>
      <a href="/" className={styles.brand} aria-label="HIOB 홈페이지">
        <strong>HIOB</strong>
        <span>영상 제작 도구</span>
      </a>
      <nav aria-label="HIOB 서비스">
        <a href="/mcp">MCP 소개</a>
        <a href="/help">도움말</a>
        <Link className={styles.outline} href="/studio/login?next=%2Fmcp">
          Studio 열기 <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <span>HIOB MCP · 베타 {MCP_RELEASE.version}</span>
      <a href={helpHref("compatibility")}>지원 환경·다운로드</a>
      <a href="mailto:hiob4515@gmail.com">도움 요청</a>
      <a href="/terms">이용약관</a>
      <a href="/privacy">개인정보 처리방침</a>
    </footer>
  );
}
function ArticleLinks({ articles }) {
  return (
    <ul className={styles.articleLinks}>
      {articles.map((a) => (
        <li key={a.id}>
          <a href={helpHref(a.id)}>
            <span>
              {a.title}
              <small>{a.summary}</small>
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
export default function HelpCenter({ route = {} }) {
  const article = HELP_ARTICLES.find((a) => a.id === route.article);
  const topic = HELP_TOPICS.find(
    (t) => t.id === (article?.topic || route.article),
  );
  const home = !article && !topic;
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#help-content">
        본문으로 건너뛰기
      </a>
      <PublicHeader />
      <div
        className={styles.searchArea + (home ? " " + styles.searchHome : "")}
      >
        {home && (
          <>
            <span className={styles.eyebrow}>HIOB MCP 시작 가이드</span>
            <h1>첫 영상까지, 한 단계씩.</h1>
            <p>
              처음 연결하는 순간부터 목소리가 빠진 순간까지. 지금 필요한 답을
              찾으세요.
            </p>
          </>
        )}
        <form
          role="search"
          action="/help"
          className={styles.searchBox}
          data-help-search
        >
          <Search size={21} aria-hidden="true" />
          <label className={styles.srOnly} htmlFor="help-search">
            도움말 검색
          </label>
          <input
            id="help-search"
            name="q"
            type="search"
            placeholder="예: Windows 설치, 크레딧, 목소리"
            autoComplete="off"
          />
          <button type="submit">검색</button>
          <button type="button" data-search-clear hidden>
            지우기
          </button>
        </form>
        <noscript>
          <p className="no-script">
            검색과 자동 복사는 JavaScript를 켜면 사용할 수 있습니다. 아래 모든
            안내와 설치 명령은 그대로 읽고 복사할 수 있습니다.
          </p>
        </noscript>
      </div>
      <main
        id="help-content"
        className={styles.layout + (home ? " " + styles.homeLayout : "")}
      >
        {!home && (
          <aside className={styles.sidebar}>
            <nav aria-label="도움말 주제">
              <a href="/help">도움말 홈</a>
              {HELP_TOPICS.map((t) => (
                <a
                  key={t.id}
                  href={helpHref(t.id)}
                  aria-current={topic?.id === t.id ? "true" : undefined}
                >
                  {t.title}
                </a>
              ))}
            </nav>
          </aside>
        )}
        <div className={styles.content}>
          <section data-search-results hidden>
            <h2>검색 결과</h2>
            <p role="status" data-search-status />
            <ul className={styles.articleLinks} data-search-list />
          </section>
          <div data-doc-body>
            {article ? (
              <>
                <nav className={styles.breadcrumb} aria-label="현재 위치">
                  <a href="/help">도움말</a>
                  <ChevronRight size={13} aria-hidden="true" />
                  <a href={helpHref(topic.id)}>{topic.title}</a>
                </nav>
                <article className={styles.article}>
                  <h1>{route.title || article.title}</h1>
                  <p className={styles.lede}>
                    {route.description || article.summary}
                  </p>
                  <div data-article-toc />
                  {article.id === "install" ? (
                    <InstallGuide os={route.os || ""} />
                  ) : (
                    <HelpArticle id={article.id} />
                  )}
                </article>
                <section className={styles.related}>
                  <h2>다음에 읽을 안내</h2>
                  <ArticleLinks
                    articles={HELP_ARTICLES.filter(
                      (a) => a.topic === topic.id && a.id !== article.id,
                    )}
                  />
                  <a href="/help">전체 도움말 보기 →</a>
                </section>
              </>
            ) : topic ? (
              <section>
                <h1>{topic.title}</h1>
                <p>{topic.description}</p>
                <ArticleLinks
                  articles={HELP_ARTICLES.filter((a) => a.topic === topic.id)}
                />
              </section>
            ) : (
              <>
                <section className="help-discovery">
                  <div>
                    <span className={styles.eyebrow}>아직 HIOB가 낯설다면</span>
                    <h2>AI와 대화한 다음, 영상은 어떻게 만들어질까요?</h2>
                    <p>
                      사람이 정할 것, AI와 함께 다듬을 것, HIOB에 맡길 일을 먼저
                      살펴보세요.
                    </p>
                  </div>
                  <a href="/mcp">제작 과정 알아보기 →</a>
                </section>
                <section className={styles.start}>
                  <div>
                    <span className={styles.eyebrow}>처음 사용하시나요?</span>
                    <h2>이 순서로 시작하세요</h2>
                    <p>
                      설치 확인에는 유료 영상 생성이 필요하지 않습니다. 내
                      환경을 확인하고, 기획과 비용을 검토한 뒤 제작을
                      시작하세요.
                    </p>
                  </div>
                  <ol>
                    {[
                      [
                        "install",
                        "내 컴퓨터에 설치",
                        "운영체제 선택 · 명령 복사",
                      ],
                      [
                        "connect",
                        "내 작업 공간 연결",
                        "가입 · 내 정보 · Codex 승인",
                      ],
                      [
                        "create",
                        "첫 영상 요청",
                        "자료 전달 · 기획과 비용 확인",
                      ],
                    ].map(([id, title, text], i) => (
                      <li key={id}>
                        <a href={helpHref(id)}>
                          <span className={styles.number}>{i + 1}</span>
                          <span>
                            <strong>{title}</strong>
                            <small>{text}</small>
                          </span>
                          <ArrowRight size={19} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
                <section
                  className={styles.topicGrid}
                  aria-label="주제별 도움말"
                >
                  {HELP_TOPICS.map((t, i) => (
                    <section className={styles.topic} key={t.id}>
                      <p className={styles.topicNumber}>0{i + 1}</p>
                      <h2>
                        <a href={helpHref(t.id)}>{t.title}</a>
                      </h2>
                      <ArticleLinks
                        articles={HELP_ARTICLES.filter((a) => a.topic === t.id)}
                      />
                    </section>
                  ))}
                </section>
              </>
            )}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
