"use client";
import { useEffect, useRef, useState } from "react";
import Link from "./StudioLink";
import { Search, ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import { MCP_RELEASE } from "./mcpInstall.mjs";
import {
  HELP_TOPICS,
  HELP_ARTICLES,
  resolveHelpHash,
  searchHelp,
} from "./helpTopics.mjs";
import { HelpArticle, InstallGuide } from "./HelpArticles";
import styles from "./install.module.css";

function ArticleLinks({ articles, onNavigate }) {
  return (
    <ul className={styles.articleLinks}>
      {articles.map((a) => (
        <li key={a.id}>
          <a href={`#${a.id}`} onClick={onNavigate}>
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
export default function HelpCenter() {
  const [route, setRoute] = useState({ article: "", os: "" });
  const [query, setQuery] = useState("");
  const heading = useRef(null);
  const routeChange = useRef(false);
  useEffect(() => {
    const sync = () => {
      setRoute(resolveHelpHash(window.location.hash));
      setQuery("");
    };
    const navigate = () => {
      if (window.location.hash === "#help-content") return;
      routeChange.current = true;
      sync();
    };
    sync();
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  useEffect(() => {
    if (routeChange.current) {
      heading.current?.focus();
      routeChange.current = false;
    }
  }, [route]);
  const article = HELP_ARTICLES.find((a) => a.id === route.article);
  const topic = HELP_TOPICS.find(
    (t) => t.id === (article?.topic || route.article),
  );
  const searching = Boolean(query.trim());
  const results = searching ? searchHelp(query) : [];
  const home = !article && !topic && !searching;
  function resetSearch() {
    setQuery("");
    routeChange.current = true;
    setRoute((current) => ({ ...current }));
  }
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#help-content">
        본문으로 건너뛰기
      </a>
      <header className={styles.topbar}>
        <a
          href="#home"
          onClick={resetSearch}
          className={styles.brand}
          aria-label="HIOB 도움말 홈"
        >
          <strong>HIOB</strong>
          <span>도움말</span>
        </a>
        <nav aria-label="HIOB 서비스">
          <Link href="/mcp">프로젝트 연결</Link>
          <Link className={styles.outline} href="/studio/login?next=%2Fmcp">
            Studio 열기 <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </nav>
      </header>
      <div className={`${styles.searchArea} ${home ? styles.searchHome : ""}`}>
        {home && (
          <>
            <span className={styles.eyebrow}>HIOB MCP 시작 가이드</span>
            <h1 ref={heading} tabIndex={-1}>
              무엇을 도와드릴까요?
            </h1>
            <p>설치부터 첫 영상까지, 필요한 단계만 찾아보세요.</p>
          </>
        )}
        <form
          role="search"
          className={styles.searchBox}
          onSubmit={(e) => e.preventDefault()}
        >
          <Search size={21} aria-hidden="true" />
          <label className={styles.srOnly} htmlFor="help-search">
            도움말 검색
          </label>
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예: Windows 설치, 크레딧, 목소리"
            autoComplete="off"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}>
              지우기
            </button>
          )}
        </form>
      </div>
      <main
        id="help-content"
        className={`${styles.layout} ${home ? styles.homeLayout : ""}`}
      >
        {!home && (
          <aside className={styles.sidebar}>
            <nav aria-label="도움말 주제">
              <a href="#home" onClick={resetSearch}>
                도움말 홈
              </a>
              {HELP_TOPICS.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  aria-current={
                    topic?.id === t.id && !searching ? "true" : undefined
                  }
                >
                  {t.title}
                </a>
              ))}
            </nav>
          </aside>
        )}
        <div className={styles.content}>
          {searching ? (
            <section>
              <h1 ref={heading} tabIndex={-1}>
                검색 결과
              </h1>
              <p role="status">
                ‘{query.trim()}’ 관련 도움말 {results.length}개
              </p>
              {results.length ? (
                <ArticleLinks onNavigate={resetSearch} articles={results} />
              ) : (
                <div className={styles.empty}>
                  <BookOpen aria-hidden="true" />
                  <h2>일치하는 도움말이 없습니다</h2>
                  <p>
                    ‘설치’, ‘크레딧’, ‘음성’처럼 짧은 단어로 검색하거나 주제를
                    선택하세요.
                  </p>
                  <a href="#home" onClick={resetSearch}>
                    전체 도움말 보기 →
                  </a>
                </div>
              )}
            </section>
          ) : article ? (
            <>
              <nav className={styles.breadcrumb} aria-label="현재 위치">
                <a href="#home" onClick={resetSearch}>
                  도움말
                </a>
                <ChevronRight size={13} aria-hidden="true" />
                <a href={`#${topic.id}`}>{topic.title}</a>
              </nav>
              <article className={styles.article}>
                <h1 ref={heading} tabIndex={-1}>
                  {article.title}
                </h1>
                <p className={styles.lede}>{article.summary}</p>
                {article.id === "install" ? (
                  <InstallGuide os={route.os} />
                ) : (
                  <HelpArticle id={article.id} />
                )}
              </article>
              <section className={styles.related}>
                <h2>같은 주제의 도움말</h2>
                <ArticleLinks
                  onNavigate={resetSearch}
                  articles={HELP_ARTICLES.filter(
                    (a) => a.topic === topic.id && a.id !== article.id,
                  )}
                />
                {HELP_ARTICLES.filter((a) => a.topic === topic.id).length ===
                  1 && (
                  <a href="#home" onClick={resetSearch}>
                    전체 도움말 보기 →
                  </a>
                )}
              </section>
            </>
          ) : topic ? (
            <section>
              <h1 ref={heading} tabIndex={-1}>
                {topic.title}
              </h1>
              <p>{topic.description}</p>
              <ArticleLinks
                onNavigate={resetSearch}
                articles={HELP_ARTICLES.filter((a) => a.topic === topic.id)}
              />
            </section>
          ) : (
            <>
              <section className={styles.start}>
                <div>
                  <span className={styles.eyebrow}>처음 사용하시나요?</span>
                  <h2>이 순서로 시작하세요</h2>
                  <p>
                    Codex에 HIOB 도구를 연결해 자료를 읽고, 기획과 편집을
                    진행합니다.
                  </p>
                </div>
                <ol>
                  {[
                    {
                      id: "install",
                      title: "내 컴퓨터에 설치",
                      text: "운영체제 선택 · 명령 복사",
                    },
                    {
                      id: "connect",
                      title: "Studio 계정 연결",
                      text: "회원가입 · 프로젝트 승인",
                    },
                    {
                      id: "create",
                      title: "첫 영상 요청",
                      text: "자료 전달 · 기획과 비용 확인",
                    },
                  ].map((item, index) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>
                        <span className={styles.number}>{index + 1}</span>
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.text}</small>
                        </span>
                        <ArrowRight size={19} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
              <section className={styles.topicGrid} aria-label="주제별 도움말">
                {HELP_TOPICS.map((t, i) => (
                  <section className={styles.topic} key={t.id}>
                    <p className={styles.topicNumber}>0{i + 1}</p>
                    <h2>
                      <a href={`#${t.id}`}>{t.title}</a>
                    </h2>
                    <ArticleLinks
                      onNavigate={resetSearch}
                      articles={HELP_ARTICLES.filter((a) => a.topic === t.id)}
                    />
                  </section>
                ))}
              </section>
            </>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <span>HIOB MCP · 베타 {MCP_RELEASE.version}</span>
        <a href="#compatibility">지원 환경·다운로드</a>
        <a href="https://hi-ob.com/terms">이용약관</a>
        <a href="https://hi-ob.com/privacy">개인정보 처리방침</a>
      </footer>
    </div>
  );
}
