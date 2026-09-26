import Link from "./StudioLink";
import {
  MCP_RELEASE,
  MCP_INSTALL_COMMAND,
  MCP_CODEX_INSTALL_COMMAND,
  MCP_WINDOWS_INSTALL_COMMAND,
  MCP_LINUX_INSTALL_COMMAND,
  MCP_VERIFY_PROMPT,
} from "./mcpInstall.mjs";
import CopyButton from "./CopyButton";
import styles from "./install.module.css";

const systems = { windows: "Windows", macos: "macOS", linux: "Linux" };
const commands = {
  windows: MCP_WINDOWS_INSTALL_COMMAND,
  macos: MCP_CODEX_INSTALL_COMMAND,
  linux: MCP_LINUX_INSTALL_COMMAND,
};
const connectPrompt =
  "HIOB MCP의 connection_begin으로 내 Studio 프로젝트 연결을 시작해줘. 내가 브라우저에서 프로젝트와 허용 범위를 확인하고 승인하면 connection_status와 connection_attach로 연결을 확인해줘. 아직 유료 생성은 하지 마.";
const firstPrompt =
  "HIOB MCP로 이 자료를 바탕으로 영상을 기획해줘. runtime_check로 제작 환경을 확인하고 연결한 Studio 프로젝트를 사용해줘. 제품 자료에 근거해 9초 이내 후킹, 장면, 대본, 자막, 음성 계획과 예상 비용을 먼저 보여줘. 내가 승인한 장면만 생성해줘. 최종 영상은 소리를 켜고 검수하고, 원본과 음원이 포함된 편집 가능한 프로젝트도 저장해줘. 현재 환경에서 할 수 없는 작업은 알려줘.";

export function Command({ text, label, prompt = false }) {
  return (
    <div className={styles.command}>
      <div className={styles.commandHeader}>
        <span>{prompt ? "Codex 대화창에 붙여넣기" : "터미널에서 실행"}</span>
        <CopyButton key={text} text={text} label={label} />
      </div>
      <pre>{text}</pre>
    </div>
  );
}
function Next({ href, children }) {
  return (
    <a className={styles.next} href={href}>
      {children}
      <span aria-hidden="true"> →</span>
    </a>
  );
}

export function InstallGuide({ os }) {
  return (
    <>
      <nav className={styles.osOptions} aria-label="설치할 운영체제">
        {Object.entries(systems).map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={os === id ? "true" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      {!os ? (
        <div className={styles.callout}>
          <strong>위에서 내 컴퓨터의 운영체제를 선택하세요.</strong>
          <p>
            선택한 환경의 준비물과 설치 명령만 표시합니다. WSL에서 Codex를
            사용한다면 Linux를 선택하세요.
          </p>
        </div>
      ) : (
        <div key={os}>
          <p className={styles.supportNote}>
            {os === "windows"
              ? "Windows는 설치 경로를 제공하며, 실제 Windows 고객 환경의 최종 검증은 진행 전입니다."
              : os === "macos"
                ? "Apple Silicon Mac에서 설치·영상·음원 합성을 확인했습니다. Intel Mac은 검증 전입니다."
                : "Linux ARM64 가상 머신에서 설치·렌더를 확인했습니다. x64·WSL은 검증 전입니다."}{" "}
            <a href="#compatibility">지원 범위 보기</a>
          </p>
          <ol className={styles.steps}>
            <li>
              <h2>준비 프로그램 설치하기</h2>
              <p>
                {systems[os]}에서{" "}
                <a href="https://nodejs.org/en/download">Node.js 22.18 이상</a>
                과 <a href="https://developers.openai.com/codex/cli">Codex</a>를
                설치하고 Codex에 로그인하세요. 이미 설치했다면 다음 단계로
                넘어갑니다.
              </p>
              {os === "macos" ? (
                <details>
                  <summary>Mac 영상 렌더에 필요한 프로그램</summary>
                  <p>
                    FFmpeg·FFprobe와 Xcode Command Line Tools가 필요합니다.
                    Homebrew가 설치되어 있다면 아래 명령을 사용하세요. Xcode
                    설치 창이 열리면 설치를 마친 뒤 나머지를 실행합니다.
                  </p>
                  <Command
                    text={"xcode-select --install\nbrew install node ffmpeg"}
                    label="macOS 준비 명령 복사"
                  />
                  <a href="https://brew.sh">Homebrew 공식 설치 안내</a>
                </details>
              ) : (
                <p>
                  최종 영상 합성에는{" "}
                  {os === "windows" ? (
                    <a href="https://docs.docker.com/desktop/setup/install/windows-install/">
                      Docker Desktop
                    </a>
                  ) : (
                    <a href="https://docs.docker.com/engine/install/">
                      Docker Engine과 Buildx
                    </a>
                  )}
                  도 필요합니다. 설치 후 실행하세요. Windows는 Linux 컨테이너
                  모드를 사용합니다.
                </p>
              )}
            </li>
            <li>
              <h2>HIOB 설치 명령 실행하기</h2>
              <p>
                {os === "windows"
                  ? "시작 메뉴에서 PowerShell을 검색해 새 창을 여세요."
                  : os === "macos"
                    ? "Spotlight에서 터미널을 검색해 여세요."
                    : "Codex를 사용할 Linux 환경의 터미널을 여세요."}{" "}
                아래 명령을 복사해 붙여넣고 Enter를 누릅니다.
              </p>
              <Command
                text={commands[os]}
                label={`${systems[os]} 설치 명령 복사`}
              />
              <p className={styles.note}>
                설치가 파일과 도구 연결을 점검합니다. HIOB 비밀번호나 API 키를
                입력하지 않습니다.
              </p>
            </li>
            <li>
              <h2>Codex 등록과 렌더 준비하기</h2>
              {os === "macos" ? (
                <p>
                  설치가 Codex 등록과 렌더 준비를 함께 처리합니다. 기존 hiob
                  등록 때문에 멈췄다면 <a href="#update">업데이트 안내</a>를
                  확인하세요.
                </p>
              ) : (
                <>
                  <p>
                    설치가 끝나면 터미널에 표시되는{" "}
                    <strong>Codex 등록 명령</strong>과{" "}
                    <strong>setup-renderer 명령</strong>을 순서대로 복사해
                    실행하세요. 첫 렌더 준비는 수 분 걸릴 수 있습니다.
                  </p>
                  <details>
                    <summary>출력에서 어떤 명령을 찾나요?</summary>
                    <p>
                      등록 명령에는 <code>mcp add hiob</code>, 렌더 준비
                      명령에는 <code>setup-renderer</code>가 포함됩니다. 경로는
                      컴퓨터마다 다르므로 설치 결과에 출력된 명령 전체를
                      사용하세요.
                    </p>
                    <p>
                      등록 전{" "}
                      <code>
                        {os === "windows" ? "codex.cmd" : "codex"} mcp get hiob
                      </code>
                      로 기존 등록을 확인합니다. 이미 등록되어 있다면{" "}
                      <a href="#update">업데이트 안내</a>를 따르세요.
                    </p>
                  </details>
                </>
              )}
              <p>
                이후{" "}
                <strong>Codex를 완전히 종료했다가 다시 열고 새 대화</strong>를
                시작하세요.
              </p>
              <a href="#manual">앱만 사용하거나 수동 설정이 필요한가요?</a>
            </li>
            <li>
              <h2>Codex에서 설치 확인하기</h2>
              <Command
                text={MCP_VERIFY_PROMPT}
                label="무료 설치 점검 요청 복사"
                prompt
              />
              <div className={styles.callout}>
                <strong>다음 단계로 넘어가는 기준</strong>
                <p>
                  HIOB 도구가 보이고, 버전 {MCP_RELEASE.version}과 프로젝트
                  조회가 확인되어야 합니다. 최종 영상 제작은 렌더 준비 결과{" "}
                  <code>ready=true</code>까지 확인한 뒤 진행하세요.
                </p>
              </div>
              <p>
                <a href="#tools">도구가 안 보이나요?</a> ·{" "}
                <a href="#renderer">렌더 준비가 안 되나요?</a>
              </p>
            </li>
          </ol>
          <Next href="#connect">다음: Studio 계정과 프로젝트 연결</Next>
        </div>
      )}
    </>
  );
}

export function HelpArticle({ id }) {
  switch (id) {
    case "connect":
      return (
        <>
          <ol className={styles.steps}>
            <li>
              <h2>HIOB 계정 만들기</h2>
              <p>
                <Link href="/start">HIOB 시작하기</Link>에서 준비할 순서를 확인하고{" "}
                <Link href="/studio/signup?next=%2Fstart">계정을 만드세요</Link>.
                계정이 있다면 <Link href="/studio/login?next=%2Fstart">로그인</Link>해
                환영 화면에서 이어갑니다. Codex 로그인과 HIOB 계정은 별개입니다.
              </p>
            </li>
            <li>
              <h2>이메일 확인하기</h2>
              <p>
                가입한 주소로 받은 인증 메일의 링크를 여세요. 이메일 확인을 마친
                계정으로 <Link href="/start">환영 화면</Link>에 돌아오면 다음 준비
                단계를 확인할 수 있습니다.
              </p>
            </li>
            <li>
              <h2>내 정보와 작업공간 설정하기</h2>
              <p><Link href="/onboarding?next=%2Fstart">내 작업 공간</Link>에서 이름과 개인·업체 사용 여부를 입력하세요. 업체 사용은 업체명도 필요하며 전화번호는 선택입니다. 이미 생성된 작업 공간을 설정하므로 다시 가입하거나 새 공간을 만들 필요가 없습니다.</p>
            </li>
            <li>
              <h2>첫 프로젝트 준비하기</h2>
              <p>
                <Link href="/start">환영 화면</Link>에서 작업할 브랜드와 첫
                프로젝트를 준비하세요. 무엇을 만들지 알아볼 수 있는 프로젝트
                이름을 정합니다. 이미 프로젝트가 있다면 해당 프로젝트로
                이어가세요. 크레딧은 같은 브랜드의 팀원들이 공유합니다.
              </p>
            </li>
            <li>
              <h2>Codex에 연결 요청하기</h2>
              <p>
                아직 설치하지 않았다면 <a href="#install">내 운영체제의 설치 안내</a>를
                마친 뒤 Codex에 아래와 같이 요청하세요.
              </p>
              <Command
                text={connectPrompt}
                label="프로젝트 연결 요청 복사"
                prompt
              />
              <p>
                Codex가 보여주는 Studio 링크를 여세요. 연결 번호와 프로젝트를
                확인하고 필요한 권한만 승인합니다.
              </p>
            </li>
            <li>
              <h2>연결된 프로젝트 확인하기</h2>
              <p>
                승인 후 Codex에 “연결 상태를 확인해줘”라고 요청하세요. 선택한
                프로젝트에 실제로 접근하면 연결 관리에 “프로젝트 연결 확인됨”이 표시됩니다. “승인됨”만 보이면 Codex로 돌아가 연결 확인을 마치세요.
              </p>
            </li>
          </ol>
          <div className={styles.callout}>
            <strong>유료 생성은 별도로 허용합니다</strong>
            <p>
              생성 상한의 기본값은 0입니다. 영상·음성을 만들려면 크레딧과 생성
              상한을 확인하고, 음성 생성도 별도로 허용하세요. 연결은 24시간 후
              만료되며 <Link href="/mcp">연결 관리</Link>에서 해제할 수
              있습니다.
            </p>
          </div>
          <Next href="#create">다음: 첫 영상 제작 요청</Next>
        </>
      );
    case "create":
      return (
        <>
          <ol className={styles.steps}>
            <li>
              <h2>제품 자료를 준비하세요</h2>
              <p>
                설치 시 지정한 자료 폴더에 제품 설명, 사진, 참고 영상을
                넣으세요. 기본 폴더는 <code>Documents/HIOB Sources</code>입니다.
                영상의 목적, 길이, 화면 비율과 원하는 목소리도 알려주세요.
              </p>
            </li>
            <li>
              <h2>기획과 비용부터 확인하세요</h2>
              <Command text={firstPrompt} label="첫 제작 요청 복사" prompt />
              <p>
                장면과 대본을 확인한 뒤 생성할 부분만 승인하세요. 수정하지 않은
                영상과 음원을 다시 생성할 필요는 없습니다.
              </p>
            </li>
            <li>
              <h2>소리를 켜고 검수하세요</h2>
              <p>
                목소리가 끝까지 들리는지, 제품 설명과 자막이 맞는지, 마지막 행동
                안내가 자연스러운지 확인하세요. 수정은 “이 문장 더 빠르게”,
                “자막 두 줄로”처럼 구체적으로 요청합니다.
              </p>
            </li>
          </ol>
          <Next href="#restore">다음: 결과 저장과 이어서 작업</Next>
        </>
      );
    case "restore":
      return (
        <>
          <h2>작업을 끝내기 전에</h2>
          <p>
            Codex에 최종 MP4와 함께 원본 영상, 분리 음원, 자막, 편집 가능한
            프로젝트를 저장하도록 요청하세요. Studio 저장 결과와 복원 가능한
            자료 목록을 확인합니다.
          </p>
          <h2>다른 컴퓨터 또는 새 세션에서</h2>
          <ol>
            <li>그 컴퓨터에 HIOB MCP를 설치하세요.</li>
            <li>
              같은 Studio 계정으로 로그인하고 같은 프로젝트에 새 연결을
              승인하세요.
            </li>
            <li>
              Codex에 승인된 프로젝트를 복원하고 원본·음원 누락 여부를
              확인하도록 요청하세요.
            </li>
            <li>짧게 미리보기한 뒤 편집을 이어가세요.</li>
          </ol>
          <div className={styles.callout}>
            <strong>연결 키는 복사하지 마세요</strong>
            <p>
              전체 <code>.hiob-mcp</code> 폴더를 다른 컴퓨터에 옮기지 않습니다.
              프로젝트 복원과 계정 연결은 별도 절차입니다. 현재 앱에서 렌더
              준비가 되었는지도 다시 확인하세요.
            </p>
          </div>
          <Next href="#connect">프로젝트 다시 연결하기</Next>
        </>
      );
    case "credits":
      return <><p>크레딧은 브랜드 팀이 공유하며 같은 계정·브랜드로 접속하면 운영체제와 관계없이 같은 잔액을 사용합니다.</p><ol className={styles.steps}><li><h2>브랜드 준비하기</h2><p><Link href="/mcp">내 프로젝트</Link>에서 브랜드와 빈 프로젝트를 만듭니다. 이 단계에는 생성비가 들지 않습니다.</p></li><li><h2>현재 잔액 보기</h2><p><Link href="/billing">크레딧 · 충전</Link>에서 사용할 브랜드를 선택하세요. 전체 잔액과 예약액, 사용 가능한 금액을 구분합니다.</p></li><li><h2>필요한 만큼 충전하기</h2><p>1크레딧 = 충전액 1원입니다. 생성 전에 견적을 확인하고, 부족한 금액은 <a href="#payment">계좌이체로 충전</a>합니다. 영상·음성 생성 비용과 AI 앱 구독료는 별도입니다.</p></li></ol><Next href="#payment">계좌이체 충전하기</Next></>;
    case "payment":
      return <><p>카드 결제는 준비 중입니다. 계좌이체 요청은 웹에 저장되며 운영자가 실제 입금을 확인한 후 크레딧에 반영합니다.</p><ol className={styles.steps}><li><h2>내 정보 확인</h2><p><Link href="/account">내 정보</Link>에서 이름을 확인하고 업체명·연락처를 수정할 수 있습니다. 전화번호는 선택 항목입니다. 가입 이메일과 입금자명을 정확히 확인하세요.</p></li><li><h2>충전 요청 저장</h2><p><Link href="/billing">크레딧 · 충전</Link>에서 브랜드, 금액, 입금자명을 입력하고 ‘충전 요청 저장’을 누릅니다. ‘계좌이체 안내를 준비 중’이면 아직 송금하지 마세요.</p></li><li><h2>표시된 계좌로 입금</h2><p>저장된 요청에 표시되는 은행·계좌번호·예금주를 확인하고 요청 금액을 송금하세요. 이메일에만 있는 다른 계좌로 송금하지 마세요. 이미 입금했다면 다시 입금하지 않습니다.</p></li><li><h2>이메일로 입금 확인 요청</h2><p>‘입금 확인 요청 이메일 작성’을 누르면 요청 번호·가입 이메일·금액·입금자명이 채워집니다. 입금 시각을 적고 직접 발송하세요. 이메일 앱이 없으면 ‘요청 내용 복사’ 후 웹메일에서 요청에 표시된 수신 주소로 보냅니다.</p></li><li><h2>반영된 잔액 확인</h2><p>‘입금 처리 · 잔액 새로고침’을 누릅니다. 운영자가 입금을 확인하면 ‘크레딧 반영’으로 바뀝니다. 대기 중에는 추가 송금하지 마세요. 금액·입금자 불일치, 환불 요청은 요청 번호와 함께 운영자에게 문의하세요.</p></li></ol><Next href="#create">기획을 확인하고 제작하기</Next></>;
    case "skills":
      return <><p>HIOB MCP는 프로젝트·소재·음성·렌더 도구를 연결합니다. 제작 스킬은 Codex가 어떤 순서로 기획하고 검수할지 설명합니다. 두 가지를 함께 사용하세요.</p><ol className={styles.steps}><li><h2>제작 스킬 받기</h2><p><a href="/help/hiob-video-skill-1.1.0.zip" download>HIOB 영상 제작 스킬 1.1.0 다운로드</a> · <a href="/help/skills/hiob-video-1.1.0/SKILL.md">내용 먼저 보기</a></p><p>압축을 풀면 hiob-video 폴더가 나옵니다. 이 파일에는 개인 계정 정보나 공급자 API 키가 없습니다.</p></li><li><h2>Codex에 설치 요청</h2><Command prompt text={"다운로드한 hiob-video-skill-1.1.0.zip의 내용을 먼저 읽고 HIOB 영상 제작 스킬을 내 Codex 사용자 스킬 폴더에 설치해줘. 기존 hiob-video 스킬이 있다면 덮어쓰기 전에 차이를 보여줘. 다른 설정과 파일은 변경하지 마."} label="스킬 설치 요청 복사"/><p>압축 파일을 Codex에 첨부하거나 다운로드 경로를 지정합니다. 설치 후 새 대화에서 스킬이 보이는지 확인하세요. 앱에 스킬 설치 기능이 없다면 SKILL.md를 읽어 달라고 요청할 수 있습니다.</p></li><li><h2>스킬을 지정해 제작 요청</h2><Command prompt text={"hiob-video 스킬을 사용해 첨부 자료로 첫 영상을 기획해줘. HIOB MCP 연결과 렌더 환경부터 확인하고, 9초 이내 훅·대본·목소리 후보·장면·자막·견적을 먼저 보여줘. 목소리를 들어보고 승인한 뒤 필요한 소재만 생성해줘."} label="스킬 사용 요청 복사"/></li></ol><h2>어떻게 만들어지나요?</h2><p>자료 검토 → 훅·장면 설계 → 짧은 목소리 비교 → 비용 승인 → 이미지·영상 소재 생성 → 실제 발화에 맞춘 편집 → 화면·소리 검수 → Studio 저장 순서입니다. 고칠 때는 해당 문장이나 컷만 바꿉니다.</p><p>이미지 생성은 사용하는 AI 앱의 도구와 이용권에 따라 다릅니다. HIOB 설치가 Codex 구독이나 이미지 생성 권한을 포함하지는 않습니다. 최종 청취와 제품 사실 확인은 반드시 진행하세요.</p><Next href="#create">첫 영상 요청 예시 보기</Next></>;
    case "privacy":
      return <><h2>계정과 연락처</h2><p>이메일은 가입 인증·계정 식별에 사용합니다. 이름은 작업 공간 설정에 필요하고, 업체명은 업체·팀으로 사용할 때 필요합니다. 전화번호는 선택 항목이며 동의 후 저장합니다. <Link href="/account">내 정보</Link>에서 정보를 변경할 수 있으며 선택 연락처는 비워서 삭제할 수 있습니다.</p><h2>프로젝트와 콘텐츠</h2><p>HIOB에 저장한 프로젝트 제목·키워드·완성본은 제작 지원과 서비스 운영을 위해 관리자에게 표시됩니다. 별도 키워드가 없으면 제목의 단어를 표시하며 추출 출처를 구분합니다. 공유 브랜드에서는 팀이 같은 콘텐츠와 크레딧을 사용합니다.</p><h2>계좌이체와 지원</h2><p>충전 요청에는 가입 계정, 브랜드, 요청 금액, 입금자명, 요청 시각과 처리 내역을 저장합니다. 은행 비밀번호·카드번호를 입력하지 않습니다. 결제 및 서비스 기록의 보관·삭제 요청은 운영 이메일로 문의하세요.</p><h2>기기 안의 자료</h2><p>HIOB에 저장하지 않은 컴퓨터의 다른 폴더, 개인 계정 인증 파일, Codex 대화는 이 고객 관리 기능에서 수집하지 않습니다. 스킬은 자료의 사용 범위와 업로드 대상을 먼저 확인하게 합니다.</p><p><a href="https://hi-ob.com/privacy">개인정보 처리방침</a> · <a href="mailto:hiob4515@gmail.com">운영자에게 문의하기</a></p></>;
    case "windows-test":
      return (
        <>
          <p>첫 테스트는 평소 관리자 계정과 다른 이메일로 진행하세요. Windows 최종 렌더는 실제 고객 기기에서 확인하는 단계입니다.</p>
          <ol className={styles.steps}>
            <li>
              <h2>다른 이메일로 회원가입하고 확인하기</h2>
              <p>브라우저의 새 프로필이나 비공개 창에서 <Link href="/studio/signup?next=%2Fstart">가입</Link>합니다. 새 이메일의 인증 메일을 열고 해당 계정으로 <Link href="/start">환영 화면</Link>에 돌아오세요.</p>
            </li>
            <li>
              <h2>내 정보·작업공간과 첫 프로젝트 준비</h2>
              <p>환영 화면의 순서대로 이름과 개인·업체 사용 여부를 입력합니다. 업체 사용은 업체명도 필요하며 전화번호는 선택입니다. 작업공간을 설정한 뒤 사용할 브랜드와 첫 프로젝트를 준비하세요.</p>
            </li>
            <li>
              <h2>Windows에 설치하고 Codex 연결</h2>
              <p><a href="#windows">Windows 안내</a>에 따라 Codex·Node·Docker를 준비하고 HIOB를 설치합니다. 도구 목록과 runtime_check가 통과한 뒤 <a href="#connect">만든 프로젝트를 Codex에 연결</a>하세요. 브라우저 승인 후 실제 프로젝트 접근까지 확인합니다.</p>
            </li>
            <li>
              <h2>소액 충전 요청</h2>
              <p><a href="#payment">계좌이체 절차</a>로 필요한 소액을 요청하고 실제 송금·이메일 발송을 진행합니다. 관리자가 요청을 확인하고 지급하면 고객 화면의 잔액도 바뀌어야 합니다.</p>
            </li>
            <li>
              <h2>첫 영상 검수</h2>
              <p><a href="#skills">제작 스킬</a>로 기획과 짧은 목소리를 먼저 확인합니다. 승인한 견적만 실행하고, 완성본의 실제 목소리·자막·CTA를 확인하세요. Codex를 닫았다 열어 같은 프로젝트의 원본·음원·영상이 복원되는지 확인합니다.</p>
            </li>
          </ol>
          <p>막힌 단계가 있다면 운영자에게 요청 번호, OS, AI 앱, 오류 문구를 보내세요. 비밀번호·API 키는 보내지 마세요.</p>
        </>
      );
    case "tools":
      return (
        <>
          <ol>
            <li>Codex와 터미널을 완전히 종료했다가 다시 여세요.</li>
            <li>
              설치한 계정·운영체제와 Codex 실행 환경이 같은지 확인하세요. WSL과
              Windows의 설정은 별개입니다.
            </li>
            <li>터미널에서 아래 명령으로 hiob 등록을 확인하세요.</li>
          </ol>
          <Command
            text={"codex mcp get hiob --json\ncodex mcp list"}
            label="Codex 등록 확인 명령 복사"
          />
          <p>
            Windows에서 스크립트 실행 오류가 나면 <code>codex</code> 대신{" "}
            <code>codex.cmd</code>, <code>npm</code> 대신 <code>npm.cmd</code>를
            사용하세요. 실행 정책을 해제할 필요는 없습니다.
          </p>
          <details>
            <summary>node · npm · codex를 찾을 수 없다고 나와요</summary>
            <p>
              Node.js 22.18 이상과 npm이 설치되어 있는지 확인하세요. Codex CLI가
              없다면 <code>npm install -g @openai/codex</code>로 설치합니다.
              권한 오류가 있으면 사용자 계정용 Node 환경을 사용하세요.
            </p>
          </details>
          <p>
            도구가 보이면 Codex 대화에서 점검을 요청하세요. 터미널에서 성공해도
            앱의 실행 권한에 따라 결과가 달라질 수 있습니다.
          </p>
          <Command
            text={MCP_VERIFY_PROMPT}
            label="무료 설치 점검 요청 복사"
            prompt
          />
          <Next href="#manual">등록 경로와 수동 설정 확인하기</Next>
        </>
      );
    case "renderer":
      return (
        <>
          <p>
            Windows·Linux의 최종 영상 합성은 로컬 Docker Linux 엔진을
            사용합니다. Mac 기본 렌더에는 FFmpeg·FFprobe와 Xcode Command Line
            Tools가 필요합니다.
          </p>
          <h2>Docker를 사용하는 경우</h2>
          <ol>
            <li>Docker를 실행하고 아래 명령을 확인하세요.</li>
            <li>
              운영체제 결과가 <code>linux</code>인지 확인하세요. 원격 Docker와
              Windows 컨테이너 모드는 지원하지 않습니다.
            </li>
            <li>
              설치 마지막에 출력된 <code>setup-renderer</code> 명령을 터미널에서
              실행하세요.
            </li>
            <li>
              완료 후 Codex에서 <code>runtime_check</code>를 요청하고{" "}
              <code>ready=true</code>인지 확인하세요.
            </li>
          </ol>
          <Command
            text={
              'docker version\ndocker info --format "{{.OSType}}"\ndocker buildx version'
            }
            label="Docker 점검 명령 복사"
          />
          <details>
            <summary>첫 빌드가 오래 걸리거나 시간 초과돼요</summary>
            <p>
              최초 준비는 수 분 걸립니다. AI 앱에서 시간 초과되면 설치가 출력한
              명령을 터미널에서 실행하세요. 최소 2 CPU·4GB 메모리와 이미지·소재
              저장 공간이 필요합니다. Buildx가 없으면 Docker Desktop을
              업데이트하거나 Linux의 docker-buildx-plugin을 설치하세요.
            </p>
          </details>
          <details>
            <summary>자료 폴더를 읽지 못해요</summary>
            <p>
              Docker의 폴더 공유를 확인하세요. Colima에서는 macOS 시스템 임시
              폴더 대신 사용자 폴더의 전용 하위 폴더를 사용합니다. 설치·자료
              경로에 쉼표가 있다면 쉼표 없는 경로를 사용하세요. WSL은 Docker
              Desktop에서 해당 배포판의 연결을 켜야 합니다.
            </p>
          </details>
          <p>
            새 MCP 버전이나 변경된 소스로 업데이트한 뒤에는 렌더 준비를 다시
            실행하세요. <code>ready=false</code>이면 표시된 원인을 해결하고
            재점검합니다. 보호 설정을 해제하지 마세요.
          </p>
          <Next href="#install">운영체제별 준비 단계 보기</Next>
        </>
      );
    case "voice":
      return (
        <>
          <h2>아래 순서로 확인하세요</h2>
          <ol>
            <li>
              <strong>파일:</strong> 해당 문장의 음원이 생성·저장되었고 현재
              컴퓨터에 복원되어 있는지 확인합니다.
            </li>
            <li>
              <strong>배치:</strong> 음원이 타임라인에 놓여 있는지,
              음소거·볼륨·트림 때문에 들리지 않는지 확인합니다.
            </li>
            <li>
              <strong>권한:</strong> 아직 생성되지 않은 음성이라면 Studio 연결의
              음성 허용, 생성 상한, 크레딧을 확인합니다.
            </li>
            <li>
              <strong>렌더:</strong> 필요한 음성을 포함한 짧은 구간을 렌더하고
              실제 소리를 들어봅니다.
            </li>
          </ol>
          <Command
            text="HIOB MCP에서 목소리가 빠진 원인을 확인해줘. 문장별 음원 파일, 복원 상태, 타임라인 배치, 음소거와 트림, 생성 권한을 점검해줘. 빠진 음성을 무음으로 대체하지 말고 수정할 부분과 비용을 먼저 알려줘."
            label="음성 점검 요청 복사"
            prompt
          />
          <Next href="#renderer">최종 렌더 환경 확인하기</Next>
        </>
      );
    case "update":
      return (
        <>
          <h2>실행 중인 버전부터 확인하세요</h2>
          <p><code>release_check</code>는 설치 버전, 공개 배포 버전과 Studio 배포 정보를 무료로 확인합니다. 현재 공개 패키지는 {MCP_RELEASE.version}이며 베타입니다. 업데이트를 자동 설치하지 않습니다.</p>
          <ul>
            <li><strong>current:</strong> 버전이 같습니다. 프로젝트 연결과 렌더 준비는 따로 확인하세요.</li>
            <li><strong>update_available:</strong> 공개된 새 버전으로 아래 절차에 따라 업데이트하세요.</li>
            <li><strong>candidate · different_version:</strong> 내부 후보이거나 공개판과 다른 버전입니다. 현재 등록 경로를 먼저 확인하세요.</li>
            <li><strong>unavailable:</strong> 공개 정보를 확인하지 못했습니다. 잠시 후 다시 확인하고 기존 프로젝트를 유지하세요.</li>
          </ul>
          <p>구버전에 이 도구가 없다면 아래 업데이트 절차를 이용하세요. 버전 일치는 설치 파일 무결성이나 영상 품질의 증거가 아닙니다.</p>
          <h2>기존 hiob 등록을 바꾸려면</h2>
          <ol>
            <li>
              Codex의 <code>config.toml</code>을 백업하세요.
            </li>
            <li>
              <code>codex mcp get hiob --json</code>으로 현재 버전의 경로를
              확인하세요.
            </li>
            <li>
              교체하려는 등록이 맞으면 <code>codex mcp remove hiob</code> 후 새
              설치가 출력한 등록 명령을 실행하세요. Mac은 <code>--codex</code>{" "}
              설치를 다시 실행합니다.
            </li>
            <li>Codex를 다시 열고 설치 점검을 요청하세요.</li>
          </ol>
          <p>
            등록 제거는 원본·프로젝트를 삭제하지 않습니다. Windows는{" "}
            <code>codex.cmd</code>를 사용할 수 있습니다.
          </p>
          <h2>설치 중단 · 해시 오류가 나면</h2>
          <p>
            먼저 설치 명령을 다시 실행하세요. 불완전한 버전 폴더 때문에 계속
            멈추면 안내된 <code>releases/{MCP_RELEASE.version}</code> 폴더만
            별도 이름으로 보관하고 재시도하세요. 전체 프로젝트 폴더를 지우거나
            무결성 검사를 건너뛰지 않습니다.
          </p>
          <details>
            <summary>문제 진단 결과를 전달하려면</summary>
            <p>
              Windows·Linux는 내려받은 설치 파일에{" "}
              <code>node hiob-install.mjs --check</code>를 실행할 수 있습니다.
              설치 폴더의 <code>install-report-{MCP_RELEASE.version}.json</code>
              에서 OS·버전·통신 결과와 오류 문구를 확인하세요. 지원 담당자에게는
              이 정보만 전달하고 비밀번호·연결 키·전체 설정 파일은 보내지
              마세요.
            </p>
          </details>
          <Next href="#install">설치 다시 시작하기</Next>
        </>
      );
    case "manual":
      return (
        <>
          <p>
            자동 등록이 어려울 때만 이 방법을 사용하세요. Windows·Linux 설치
            폴더에 생성된 <code>codex-{MCP_RELEASE.version}.toml</code>에는 이
            컴퓨터의 실제 경로가 들어 있습니다.
          </p>
          <ol>
            <li>Codex 설정 파일을 백업합니다.</li>
            <li>
              생성된 TOML의 <code>[mcp_servers.hiob]</code> 내용을 추가하세요.
              이미 같은 항목이 있으면 그 항목만 수정합니다.
            </li>
            <li>
              Codex를 완전히 종료했다가 다시 열어 도구가 보이는지 확인합니다.
            </li>
          </ol>
          <dl className={styles.definitions}>
            <dt>Windows 설치 폴더</dt>
            <dd>
              <code>%LOCALAPPDATA%\HIOB\MCP</code>
            </dd>
            <dt>Mac·Linux 설치 폴더</dt>
            <dd>
              <code>~/.local/share/hiob-mcp</code>
            </dd>
            <dt>Windows Codex 설정</dt>
            <dd>
              <code>%USERPROFILE%\.codex\config.toml</code>
            </dd>
            <dt>Mac·Linux Codex 설정</dt>
            <dd>
              <code>~/.codex/config.toml</code>
            </dd>
          </dl>
          <p>
            <code>CODEX_HOME</code>을 별도로 지정했다면 그 폴더의 config.toml을
            사용하세요. 설정 파일 전체를 덮어쓰지 마세요.
          </p>
          <details>
            <summary>Mac 일반 설치 · 다른 AI 앱 설정</summary>
            <Command
              text={MCP_INSTALL_COMMAND}
              label="macOS 일반 설치 명령 복사"
            />
            <p>
              설치가 출력한 <code>mcpServers</code> JSON을 해당 앱의 MCP 설정에
              추가하세요. Codex는 TOML을 사용하므로 command, args, env.PATH 값을
              같은 이름의 항목으로 옮깁니다. command는 Node 실행 파일, args의 첫
              항목은 cli.mjs입니다. 모두 출력된 절대 경로를 사용하세요.
            </p>
            <p>
              Windows·Linux도 설치가 출력한 앱별 설정을 사용합니다. 앱마다
              runtime_check를 다시 실행하세요.
            </p>
          </details>
          <p className={styles.callout}>
            <code>/api/mcp/install</code>은 설치 정보를 제공하는 API입니다. 원격
            MCP 서버 주소로 입력하지 마세요.
          </p>
          <p>
            <a href="https://developers.openai.com/codex/mcp">
              OpenAI 공식 MCP 설정 안내
            </a>{" "}
            ·{" "}
            <a href="https://developers.openai.com/codex/windows">
              Windows 안내
            </a>
          </p>
          <Next href="#tools">등록 확인하기</Next>
        </>
      );
    case "compatibility":
      return (
        <>
          <p>
            설치 경로 제공과 실제 기기 검증은 구분합니다. 아래는 MCP{" "}
            {MCP_RELEASE.version}의 테스트 결과이며, 고객 광고의 창작 품질을
            보증하는 표는 아닙니다.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <caption>운영체제별 검증 범위</caption>
              <thead>
                <tr>
                  <th scope="col">환경</th>
                  <th scope="col">설치·도구</th>
                  <th scope="col">최종 렌더</th>
                </tr>
              </thead>
              <tbody>
                {MCP_RELEASE.compatibility.map((item) => (
                  <tr key={item.platform}>
                    <th scope="row">{item.label}</th>
                    <td>{item.toolsLabel}</td>
                    <td>{item.renderLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2>설치 파일과 검증 기록</h2>
          <ul>
            <li>
              <a href={MCP_RELEASE.installerUrl}>macOS 설치 파일</a>
            </li>
            <li>
              <a href={MCP_RELEASE.toolsInstallerUrl}>
                Windows·Linux 설치 파일
              </a>
            </li>
            <li>
              <a href={MCP_RELEASE.packageUrl}>
                MCP {MCP_RELEASE.version} 패키지
              </a>
            </li>
            <li>
              <a href={MCP_RELEASE.verificationUrl}>정확한 패키지 검증 기록</a>
            </li>
            <li>
              <a href="https://studio.hi-ob.com/api/mcp/install">설치 정보 API</a>
            </li>
          </ul>
          <details>
            <summary>패키지 무결성 확인</summary>
            <p>설치 프로그램이 아래 SHA-256으로 패키지를 검증합니다.</p>
            <code className={styles.hash}>{MCP_RELEASE.sha256}</code>
          </details>
          <Next href="#install">설치 시작하기</Next>
        </>
      );
    default:
      return null;
  }
}
