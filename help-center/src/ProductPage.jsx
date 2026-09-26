import { PublicHeader, PublicFooter } from "./HelpCenter";
import { MCP_RELEASE } from "./mcpInstall.mjs";
import { Command } from "./HelpArticles";
import styles from "./install.module.css";

export default function ProductPage({ media }) {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">
        본문으로 건너뛰기
      </a>
      <PublicHeader />
      <main id="main" className="product">
        <section className="product-hero">
          <div>
            <p className="kicker">HIOB MCP · CODEX와 함께</p>
            <h1>
              대화의 다음 장면을
              <br />
              <em>영상으로.</em>
            </h1>
            <p className="hero-lede">
              “이 자료로 영상을 만들고 싶어.”
              <br />그 말에서 시작해, 다시 고칠 수 있는 프로젝트까지.
            </p>
            <p>
              당신이 방향을 정하고, AI와 기획을 다듬고,
              <br />
              HIOB가 영상·목소리·편집 도구를 연결합니다.
            </p>
            <div className="product-actions">
              <a className="solid-button" href="/help/install">
                내 컴퓨터에 연결하기 ↗
              </a>
              <a href="/watch/hiob">30초로 흐름 보기 →</a>
            </div>
            <p className="hero-note">
              베타 {MCP_RELEASE.version} · 설치 점검 후 기획과 비용을 확인하고
              시작하세요.
            </p>
          </div>
          <figure className="product-preview">
            <a href="/watch/hiob" aria-label="HIOB 사용 흐름 영상 보기">
              <img
                src={media.poster}
                width="960"
                height="540"
                fetchPriority="high"
                alt="HIOB가 자료와 기획, 장면과 음성을 하나의 제작 과정으로 연결하는 소개 영상"
              />
              <span>▶ 30초 사용 흐름</span>
            </a>
            <figcaption>제작 과정을 표현한 연출 영상입니다.</figcaption>
          </figure>
        </section>
        <nav className="product-jump" aria-label="MCP 소개 목차">
          <a href="#what">MCP란?</a>
          <a href="#workflow">만드는 과정</a>
          <a href="#example">요청 예시</a>
          <a href="#cost">비용과 권한</a>
          <a href="#start">시작하기</a>
        </nav>
        <section className="product-section" id="what">
          <p className="kicker">01 / 연결의 역할</p>
          <h2>
            AI가 이해한 기획을,
            <br />
            실제 제작 도구로 이어줍니다.
          </h2>
          <p className="section-lede">
            MCP는 AI 앱이 외부 도구를 사용할 수 있게 연결하는 규약입니다. HIOB
            MCP를 연결하면 Codex 대화에서 Studio 프로젝트를 조회하고, 허용한
            자료와 제작 도구로 작업을 이어갈 수 있습니다.
          </p>
          <div className="role-grid">
            <section>
              <span>YOU</span>
              <h3>당신은 방향을 정합니다.</h3>
              <p>
                누구에게 무엇을 보여줄지, 어떤 표현을 남길지 결정합니다.
                대본·인물·장면을 확인하고 생성 범위와 최종 편집을 승인합니다.
              </p>
            </section>
            <section>
              <span>AI</span>
              <h3>AI와 함께 다듬습니다.</h3>
              <p>
                공유한 자료를 읽고 대본과 장면을 제안합니다. 마음에 들지 않는
                이유를 설명하면 기획을 다시 검토하고 필요한 도구를 사용합니다.
              </p>
            </section>
            <section>
              <span>HIOB</span>
              <h3>제작과 저장을 연결합니다.</h3>
              <p>
                프로젝트 권한과 크레딧을 확인하고 영상·음성·렌더 도구를
                연결합니다. 음원과 원본이 포함된 프로젝트로 다음 편집을
                이어갑니다.
              </p>
            </section>
          </div>
        </section>
        <section className="product-section" id="workflow">
          <p className="kicker">02 / 한 편이 만들어지는 과정</p>
          <h2>
            한 번에 맡기기보다,
            <br />
            좋은 선택을 함께 쌓으세요.
          </h2>
          <ol className="workflow-list">
            {[
              [
                "자료로 시작",
                "제품 페이지, PDF, 이미지와 사용 가능한 원본을 공유하세요. 대상·목적·길이·화면 비율을 정하고, 자료로 확인되지 않는 효과나 수치는 구분합니다.",
              ],
              [
                "기획을 먼저 확인",
                "대본·등장인물·장면·목소리·자막 방향을 검토합니다. 짧은 광고라면 9초 이내 훅과 제품이 등장할 이유부터 확인하세요.",
              ],
              [
                "확인한 장면을 제작",
                "예상 비용과 권한을 확인한 뒤 승인한 영상과 음성을 만듭니다. 이미지 도구는 사용하는 AI 앱의 제공 범위에 따라 달라집니다.",
              ],
              [
                "보면서, 들으면서 편집",
                "영상뿐 아니라 목소리·자막·음악의 타이밍을 함께 확인하세요. 잘된 부분은 남기고 필요한 문장이나 장면부터 고칩니다.",
              ],
              [
                "영상과 프로젝트를 함께 저장",
                "최종 MP4, 원본 영상, 음원, 자막과 편집 정보를 확인합니다. 새 앱이나 컴퓨터에서는 같은 프로젝트를 연결하고 자료를 복원합니다.",
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span className="step-index">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href="/help/create">첫 영상 제작 순서 자세히 보기 →</a>
        </section>
        <section className="product-section" id="example">
          <p className="kicker">03 / 대화가 구체적일수록</p>
          <h2>
            “멋지게 만들어줘”에서
            <br />한 걸음 더.
          </h2>
          <p className="section-lede">
            아래는 요청 예시입니다. 실제 제품 자료와 사용할 수 있는
            이미지·음원을 함께 제공하세요.
          </p>
          <Command
            prompt
            label="첫 기획 요청 예시 복사"
            text="이 제품 자료로 45초 세로 광고를 기획해줘. 한 사람의 불편을 중심으로 9초 안에 관심을 끌고, 제품이 등장하는 이유와 마지막 행동이 이어지게 해줘. 대본·장면·나레이션·자막 계획과 예상 비용을 먼저 보여줘. 자료에 없는 효과는 만들지 말고, 아직 유료 생성은 하지 마."
          />
          <div className="example-grid">
            <section>
              <h3>제품 광고</h3>
              <p>
                “제품을 갑자기 따로 보여주지 말고, 인물이 들거나 사용하는
                장면으로 이어줘.”
              </p>
            </section>
            <section>
              <h3>서비스 소개</h3>
              <p>
                “처음 쓰는 사람이 이해하도록, 자료 입력부터 결과 확인까지 16:9
                영상으로 설명해줘.”
              </p>
            </section>
            <section>
              <h3>기존 영상 수정</h3>
              <p>
                “본편은 유지하고 오프닝 대사만 세 가지로 비교해줘. 바뀌는 음원과
                자막부터 확인할게.”
              </p>
            </section>
          </div>
          <p>
            요청은 출발점입니다. AI 제안의 정확성, 인물·제품의 일관성, 최종
            음성은 직접 검수해야 합니다. 일정한 광고 성과나 한 번의 생성으로
            완성되는 품질을 보장하지 않습니다.
          </p>
          <a href="/help/skills">제작·검수 순서를 담은 스킬 함께 쓰기 →</a>
        </section>
        <section className="product-section" id="cost">
          <p className="kicker">04 / 시작하기 전에 알 것</p>
          <h2>
            비용과 접근 범위는
            <br />
            먼저 확인하세요.
          </h2>
          <div className="role-grid">
            <section>
              <h3>언제 비용이 드나요?</h3>
              <p>
                설치·환경 점검은 유료 영상 생성과 구분합니다. 영상·Typecast 음성
                생성 전에는 연결한 브랜드의 잔액, 견적과 허용 한도를 확인합니다.
                AI 앱 이용 요금은 별도입니다.
              </p>
              <a href="/help/credits">크레딧과 비용 →</a>
            </section>
            <section>
              <h3>무엇에 접근하나요?</h3>
              <p>
                Studio에 로그인한 뒤 사용할 프로젝트와 권한을 승인합니다.
                로그인만으로 AI 앱의 프로젝트 연결이 완료되지는 않습니다. 새
                앱이나 세션에서는 연결 상태를 다시 확인하세요.
              </p>
              <a href="/help/connect">계정과 프로젝트 연결 →</a>
            </section>
            <section>
              <h3>어떤 정보가 남나요?</h3>
              <p>
                계정·연락처와 HIOB에 저장한 프로젝트 제목·키워드·완성본 링크의
                이용 범위를 안내합니다. 개인 폴더 전체를 넘기지 말고 필요한
                자료만 선택하세요.
              </p>
              <a href="/help/privacy">제작 정보 수집 범위 →</a>
            </section>
          </div>
        </section>
        <section className="product-section" id="start">
          <p className="kicker">05 / 내 환경에서 시작</p>
          <h2>
            먼저 연결을 확인하고,
            <br />첫 기획을 시작하세요.
          </h2>
          <p className="section-lede">
            설치 안내가 있다는 것과 실제 기기 검증이 끝났다는 것은 다릅니다.
            현재 릴리스의 검증 범위를 공개합니다.
          </p>
          <div className="os-start">
            <a href="/help/install/macos">
              <strong>macOS ↗</strong>
              <span>
                Apple Silicon 설치·짧은 영상 합성 확인
                <br />
                Intel 검증 대기
              </span>
            </a>
            <a href="/help/install/windows">
              <strong>Windows ↗</strong>
              <span>
                PowerShell·Docker 설치 경로 제공
                <br />
                실제 고객 기기 검증 대기
              </span>
            </a>
            <a href="/help/install/linux">
              <strong>Linux ↗</strong>
              <span>
                ARM64 가상 머신 렌더 확인
                <br />
                x64·WSL 검증 대기
              </span>
            </a>
          </div>
          <p>
            현재 MCP 버전은 {MCP_RELEASE.version}, Node.js 요구 조건은{" "}
            {MCP_RELEASE.node}입니다. 확인한 테스트는 광고 품질이나 모든 고객
            환경의 성공을 뜻하지 않습니다.
          </p>
          <div className="product-actions">
            <a className="solid-button" href="/help/install">
              운영체제별 설치 안내 ↗
            </a>
            <a href="/help/compatibility">검증 범위 자세히 보기 →</a>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
