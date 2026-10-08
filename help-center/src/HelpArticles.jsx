import CreativeVault from './CreativeVault';
import AdvertisingGuide from './AdvertisingGuide';
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
  "HIOB MCP의 connection_ensure()로 기존 연결을 먼저 찾아줘. 사용할 프로젝트의 정확한 runId로 자동 연결하고, 이미 허용된 범위라면 사이트 재방문 없이 이어가. 처음 연결하거나 실제 만료·철회된 경우에만 한 번 로그인하고 범위를 정하게 해줘. 아직 유료 생성은 하지 마.";
const firstPrompt =
  "HIOB로 이 자료의 핵심을 이해하고 광고를 만들어줘. 먼저 production_check와 project_context의 현재 단계·승인·제작 지침을 읽고 capability_list로 사용 가능한 기능과 다음 행동을 확인해줘. 기존 기획·인물 카드·기획 이미지가 없으면 HIOB 도구로 준비할 일을 설명하고, 새 영상 생성 전 reference_prepare로 현재 기획과 참조를 확인해줘. 기존 참조 파일과 선택을 재사용하고 capability_prepare로 필요한 준비 상태를 확인해줘. 진행 중 검사는 같은 작업 ID로 조회해. 전체 광고는 한 나레이터로 이어가고 고객에게 정확한 대본 전문과 비용을 보여줘. 승인 원문·성공 소재·이전 완성본은 보존해. 기존 녹음과 선택한 음성 방식을 유지하고, 직접 녹음이면 실제 대사·길이·쉼에 맞춰 장면과 자막을 설계해줘. Typecast나 혼합을 선택한 경우에만 승인된 음성 범위로 합성해줘. 9초 이내 훅과 필요한 설명·근거·CTA를 포함한 본편 기획을 보여주고 이미 승인한 프로젝트·예산 범위에서만 생성해줘. 짧은 편집 시안은 본편 대본을 줄이거나 승인 원문을 바꾸지 않는 검토용으로 구분해줘. 실제 화면과 소리를 검수하고 수정 구간만 바꿔줘. 완성 영상과 다시 열 수 있는 프로젝트까지 저장하고, 할 수 없는 단계는 정확하게 알려줘.";

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
                ? "Apple Silicon Mac에서 설치·MCP 통신을 확인했습니다. AWS 최종 제작과 Intel Mac은 별도 검증 대기입니다."
                : "Linux x64·ARM64의 새 서버 제작 경로는 실기기 검증 대기입니다. 기존 가상 머신 검사는 AWS 최종 제작을 검증하지 않습니다."}{" "}
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
              <p>최종 렌더는 Studio의 Remotion AWS Lambda 작업으로 처리합니다. 고객 컴퓨터에 렌더 엔진을 설치하지 않습니다. 설치한 버전의 서버 렌더 지원은 연결 후 확인합니다.</p>
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
              <h2>Codex에 HIOB 연결하기</h2>
              {os === "macos" ? (
                <p>
                  설치가 Codex 등록을 처리합니다. 기존 hiob
                  등록 때문에 멈췄다면 <a href="#update">업데이트 안내</a>를
                  확인하세요.
                </p>
              ) : (
                <>
                  <p>
                    설치가 끝나면 터미널에 표시되는{" "}
                    <strong>Codex 등록 명령</strong>을 복사해 실행하세요.
                  </p>
                  <details>
                    <summary>출력에서 어떤 명령을 찾나요?</summary>
                    <p>
                      등록 명령에는 <code>mcp add hiob</code>가 포함됩니다. 경로는
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
                최초 등록 후 HIOB MCP를 연결하고 새 대화에서 확인하세요.
                이미 관리형 실행기를 사용한다면 업데이트마다 앱을 닫을 필요가 없습니다.
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
                  조회가 확인되어야 합니다. 점검의 준비 결과는 유료 실행 승인이나 납품 검증을 대신하지 않습니다. 현재 단계의 부족한 자료와 다음 행동을 확인하고, 새 생성·렌더는 해당 프로젝트의 견적과 허용 범위 안에서 진행하세요.
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
              생성 상한의 기본값은 0입니다. 새 영상 생성·Typecast 합성에는 크레딧과 생성
              상한을 확인하고, Typecast 합성만 별도로 허용하세요. 직접 녹음에는 이 합성 허용이 필요하지 않습니다. 연결은 기본 24시간이며 1시간·3일·7일도 직접 선택할 수 있습니다. 만료 전에도 <Link href="/mcp">연결 관리</Link>에서 해제할 수
              있습니다.
            </p>
          </div>
          <Next href="#create">다음: 첫 영상 제작 요청</Next>
        </>
      );
    case "creative-vault":
      return <CreativeVault Command={Command} />;
    case "advertising":
      return <AdvertisingGuide Command={Command} />;
    case "create":
      return (
        <>
          <p><a href="/help/advertising">광고 기획·인물카드·제품·편집 프롬프트: HIOB 광고 사용설명서</a></p>
          <h2>목소리부터 선택하세요</h2>
          <ul>
            <li><strong>직접 녹음:</strong> WAV·MP3·M4A 녹음을 자료 폴더에 넣으세요. 실제 말과 길이·쉼을 기준으로 장면과 자막을 만듭니다.</li>
            <li><strong>Typecast:</strong> 원하는 AI 목소리의 문장별 후보를 확인하고 선택합니다.</li>
            <li><strong>혼합:</strong> 내 녹음을 유지하고 필요한 문장만 AI 음성으로 보완합니다.</li>
          </ul>
          <p>직접 녹음에는 Typecast 합성 권한·비용이 필요하지 않습니다. 영상 생성과 최종 렌더 비용은 별도입니다. 원본 녹음부터 프로젝트에 저장해 길이·음량·쉼을 검사할 수 있으며, 완성 대본이나 편집 파일을 먼저 만들 필요는 없습니다. 전사한 문구는 실제 녹음과 대조하고 원본은 보존합니다.</p>
          <Command prompt label="내 녹음으로 제작 요청 복사" text="이 녹음을 기준으로 HIOB 영상을 만들어줘. 먼저 원본을 보존하고 project_sync로 저장한 뒤 audio_inspect와 audio_inspection_status로 길이·음량·쉼을 확인해. plan_save의 narrationSource는 recording으로 저장하고, 실제 발화에 맞춰 장면과 구절 자막을 설계해 audio_set으로 연결해. Typecast로 대체 합성하지 마. 녹음 끝을 자르거나 일괄 배속하지 말고, 전사나 타이밍이 불확실하면 검수 대상으로 남겨. 검사 대기 중에는 같은 작업을 조회하고, 기존 프로젝트의 승인과 자산을 재사용해. 최종 영상은 AWS 서버로 렌더해." />
          <h2>사용할 수 있는 기능과 준비 상태를 확인하세요</h2>
          <p><code>capability_list</code>는 프로젝트에서 가능한 제작·편집·복원 기능과 다음 도구를 보여줍니다. <code>capability_prepare</code>는 Studio에 저장된 현재 자료를 읽고 대본·참조·편집의 준비 상태와 부족한 자료를 확인합니다. 이 검사는 새 영상이나 음성을 생성하지 않습니다. 새 영상을 생성하기 전에는 기획·인물 카드·기획 이미지를 확인하고 <code>reference_prepare</code>로 참조 준비를 검사합니다. 구버전 참조는 기존 파일과 선택을 보존한 채 서버 확인을 이어갑니다. 검사 대기 중에는 같은 요청을 조회하며, 준비 상태는 고객 승인이나 유료 실행 허가를 대신하지 않습니다.</p>
          <p>초안과 자료 정리는 자유롭게 이어갑니다. 새 유료 제작은 해당 단계에 필요한 원문과 자료, 현재 견적·권한을 확인한 뒤 접수합니다. 자료가 바뀌면 다시 확인합니다. 전체 나레이터 대본을 먼저 읽고 원하는 표현을 선택하세요. 파일 검사가 통과했다는 사실은 실제 화면·발화의 품질이나 고객 승인을 대신하지 않습니다.</p>
          <Command prompt label="기능과 준비 상태 확인 요청 복사" text="현재 HIOB 프로젝트에서 capability_list로 사용할 수 있는 기능과 다음 행동을 찾아줘. 저장된 자료에 capability_prepare를 적용하고 준비된 부분과 부족한 부분을 설명해. 새 영상 생성 전에 기획·인물 카드·기획 이미지를 확인하고 reference_prepare로 현재 참조를 검증해. 내 승인 대본과 성공 소재를 보존하고, 이미 허용한 프로젝트·예산 범위 안에서 이어가. 접수된 작업은 같은 작업 ID로 복구해." />
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
              <h2>먼저 짧은 편집 시안을 확인하세요</h2>
              <p>
                생성 원본 대신 목소리·자막·제품 자료가 연결된 시안을 확인하세요. 목소리가 끝까지 들리는지, 제품 설명과 자막이 맞는지, 마지막 행동
                안내가 자연스러운지 확인하세요. 짧은 시안은 검토용이며 본편의 설명·근거·CTA나 승인된 대본을 자동으로 줄이지 않습니다. 수정은 “이 문장 더 빠르게”,
                “자막 두 줄로”처럼 구체적으로 요청합니다.
              </p>
            </li>
            <li>
              <h2>완성본과 프로젝트를 함께 받으세요</h2>
              <p>시안의 방향을 확인한 뒤 완성본을 요청하세요. 완성본도 화면과 소리를 다시 확인합니다. 원본 영상·음원·자막이 포함된 프로젝트의 Studio 저장이 끝났는지 확인하면 다른 세션에서 이어서 수정할 수 있습니다.</p>
            </li>
          </ol>
          <p>{MCP_RELEASE.version} 베타는 AI에게 현재 제작 단계와 다음 작업을 안내합니다. 소재 검사는 프레임 이미지와 무음 검토본을 제공하며, 최종본 검사는 이미 완료된 AWS 영상을 사용하므로 검사를 위해 다시 렌더할 필요가 없습니다. 검사는 워크스페이스 전체에서 미완료 10,000개, UTC 하루 신규 접수 10,000개·재시도 포함 실행 10,000회를 지원합니다. 실제 처리는 전체 서버 4개씩 진행합니다. 검사 대기 중에는 같은 작업을 약 60초 간격으로 조회하며, 일일 한도는 한국 시각 오전 9시에 초기화됩니다. <a href="/help/skills/inspection-guide-1.3.1.md">검사 한도·오류 대응 안내</a>. 화면 의미와 실제 목소리는 직접 확인하고, 편집을 바꾸면 다시 검수하세요. <a href={`/help/skills/production-guide-${MCP_RELEASE.version}.md`}>전체 제작 매뉴얼 보기</a>.</p><p>영상 원본 화질은 H3 480p·768p·1080p, Seedance는 모델에 따라 480p·720p·1080p 중에서 선택합니다. Fast·Mini는 1080p를 지원하지 않으므로 모델 가이드에서 옵션을 확인하세요. 초안은 H3 768p·Seedance 720p가 기본이며, 최종 고화질은 1080p로 새 견적을 받아 생성합니다. 화질에 따라 비용이 달라집니다.</p>
          <h2>이미 만든 소재부터 확인하세요</h2><p>Studio 프로젝트의 생성 소재에서 애셋별 성공·대기·실패와 결과 파일을 확인할 수 있습니다. 기존 소재로 편집 이어가기 요청에는 현재 프로젝트와 성공 작업 ID가 포함됩니다. AI는 generation_status로 상태를 다시 확인하고 성공 소재를 재사용합니다. 연결 만료·서버 차단·미확인 상태는 정상으로 표시하지 않습니다. 권한 승인은 프로젝트 단위이며 애셋별 별도 승인 기능은 아직 없습니다.</p><h2>음악·효과음·제목으로 마무리하세요</h2>
          <p>기존 HIOB 공용 음원에서 배경음악과 효과음을 검색하고 선택한 파일을 프로젝트로 가져올 수 있습니다. 기존 목소리는 유지하면서 음악은 구간의 흐름에, 효과음은 클릭·등장·확인 같은 화면 사건에 맞춥니다. 음원의 광고 이용권과 실제 소리는 선택할 때 확인하세요.</p>
          <Command prompt label="음악·효과음·제목 편집 요청 복사" text="hiob-creative-edit 스킬과 creative_catalog를 읽고 기존 영상의 마무리 편집을 해줘. 기존 목소리와 대사를 보존하고 HIOB 라이브러리에서 배경음악과 화면 사건에 맞는 효과음을 찾아줘. 제목은 구간의 핵심 메시지로, 자막은 실제 발화로 구분해. 먼저 시간별 편집표와 후보를 보여주고 현재 권한·예산 안에서 이어가줘." />
          <p><a href="/help/skills/hiob-creative-edit-1.9.25/SKILL.md">사운드·제목·반응 편집 스킬 보기</a>. MCP 도구에서 새 기능이 보이지 않으면 최신 버전으로 업데이트한 뒤 HIOB 연결을 새로 고침하세요.</p>
          <h2>짤·GIF·스티커 검색과 특수효과</h2>
          <p>KLIPY·GIPHY의 공식 API로 반응 소재를 검색하고 미리볼 수 있습니다. 해당 제공사의 API 키 설정이 필요하며 검색 결과는 광고 MP4에 자동 삽입되지 않습니다. 실제 영상에는 사용 권한을 확인한 원본을 사용하세요. 현재 편집에는 고정된 제목·자막 진입 모션이 있으며, 임의 줌·흔들림·글리치·GIF 오버레이는 아직 연결되지 않았습니다.</p>
          <h2>배경음이 작거나 편집 조립이 오래 걸릴 때</h2>
          <p>“나레이션과 배경음의 실제 음량을 비교하고, 원본을 보존한 보정본을 만들어줘”라고 요청하세요. 작은 PCM WAV는 추가 프로그램 없이 보정본을 만들 수 있습니다. 보정 후 서버에서 다시 검사하고 선택하며, 이미 높인 음량을 두 번 올리지 않습니다. 최종 영상의 목소리와 음악은 함께 들어보고 조절하세요.</p>
          <p>편집 조립은 작업 번호를 먼저 반환합니다. AI가 그 번호로 음원 확인·영상 확인·편집 저장의 진행 상태를 조회합니다. 조립 완료 후에 저장·렌더를 진행하며, 대기가 길다고 영상이나 목소리를 다시 생성할 필요는 없습니다. 실패한 작업은 오류와 현재 편집 상태를 확인한 뒤 재개합니다.</p>
          <h2>제목과 말하는 자막을 함께 넣으세요</h2>
          <p>큰 제목은 위에, 단계나 보충 설명은 중앙에, 실제 말하는 자막은 아래에 둘 수 있습니다. 같은 시간에 보인다는 이유로 오류가 나지 않습니다. 글자가 실제로 겹칠 때는 AI가 어느 문구의 위치나 시간을 고쳐야 하는지 확인합니다. 제목을 넣으려고 말하는 자막을 지울 필요는 없습니다.</p>
          <Command prompt label="제목·자막 편집 요청 복사" text="기존 영상과 음원은 재사용해. 위에는 핵심 제목, 중앙에는 필요한 안내, 아래에는 실제 말하는 자막을 넣어줘. project_context의 serviceScope를 읽고 edit_check로 충돌한 항목만 고친 뒤 edit_assemble과 job_status로 조립해. 음성이나 문구를 몰래 삭제하지 말고, 지원하지 않는 효과는 먼저 설명해." />
          <h2>현재 할 수 있는 편집과 서비스 범위</h2>
          <ul>
            <li><strong>영상:</strong> 편집·최종 렌더는 세로 9:16·가로 16:9·정사각형 1:1, 최대 90초, 30fps입니다. 기존 원본을 재사용하거나 허용한 모델로 필요한 소재만 생성합니다. 새 생성의 비율·해상도는 선택한 모델의 현재 지원 옵션과 견적을 확인합니다.</li>
            <li><strong>음성·음악:</strong> 직접 녹음, Typecast, 문장별 혼합과 배경음·효과음을 연결합니다. 지원 범위 안에서 트림·속도·음량을 수정합니다.</li>
            <li><strong>제목·자막:</strong> 1–2줄 구절, 위·중앙·아래의 역할별 위치, 강조, 표시 시간과 기본·질문·정보·CTA 스타일을 편집합니다. 글자 크기는 타이포 프리셋으로 선택합니다.</li>
            <li><strong>저장·납품:</strong> 편집 프로젝트와 SRT를 저장하고, 최종 MP4는 Remotion AWS Lambda에서 렌더합니다. 실제 화면과 소리를 검수하고 같은 버전으로 이어서 수정합니다.</li>
          </ul>
          <p>자유 좌표·회전·임의 코드 애니메이션, 자동 전사·립싱크 교정, CapCut 프로젝트 왕복 편집, 저작권 음악 자동 확보는 현재 공개 편집 도구의 지원 범위가 아닙니다. 사용 중인 AI 앱의 구독·이미지 도구 이용권과 광고 게시·집행은 별도입니다. 유효한 프로젝트 허용·예산 안에서는 AI가 작업을 이어가며, 문구나 자막만 바꿀 때 전체 영상을 다시 생성하지 않습니다.</p>
          <h2>Windows에서 처음 사용할 때</h2>
          <p>설치한 뒤 Codex 또는 Aside에서 위 요청을 보내세요. 작업이 막히면 “현재 단계, 부족한 자료와 다음 행동을 알려줘”라고 요청하면 됩니다. Windows 실기기 검증은 아직 대기 중이며, 서버 렌더 지원·권한과 실제 작업 성공은 별도로 확인합니다. 설치 성공만으로 광고 제작 성공이 확인되는 것은 아닙니다.</p>
          <Next href="#restore">다음: 결과 저장과 이어서 작업</Next>
        </>
      );
    case "assets":
      return (
        <>
          <h2>계정의 프로젝트 자료를 한곳에서 찾기</h2>
          <p><a href="https://studio.hi-ob.com/assets">Studio 애셋 라이브러리 열기</a>에서 계정 → 작업공간 → 프로젝트 → 폴더 순서로 자료를 찾으세요. 이미지·영상·음성·문서를 검색하고 새 폴더를 만들 수 있습니다.</p>
          <p><a href="/help/skills/asset-library-guide-1.3.2.md">AI용 공유·권한·복구 안내</a></p>
          <h2>다른 프로젝트에 추가하거나 이동하기</h2>
          <ol>
            <li>출발 프로젝트에서 애셋을 최대 50개 선택하고 “프로젝트·폴더에 추가·이동”을 누르세요.</li>
            <li>같은 작업공간의 편집 가능한 대상 프로젝트와 폴더를 고르세요. 폴더를 비우면 최상위에 둡니다.</li>
            <li>“다른 프로젝트에도 추가”는 양쪽 목록에 남깁니다. “프로젝트로 이동”은 출발 목록에서 숨깁니다. 같은 프로젝트를 고르면 폴더만 옮깁니다.</li>
          </ol>
          <p>원본 파일과 기존 저장 버전·완성 영상은 보존됩니다. 다른 고객 작업공간으로는 이동할 수 없습니다. 추가·이동만으로 유료 생성이 실행되지는 않습니다.</p>
          <h2>편집 자료로 사용하기</h2>
          <p>대상 프로젝트에서 공유 애셋을 선택해 “현재 편집 자료에 가져오기”를 누르면 새 저장 버전이 생깁니다. 한 번에 20개, 파일당 200 MiB, 기존 자료를 포함한 총 256 MiB까지 가능합니다. 빈 프로젝트에는 미디어·문서를 가져올 수 있고 코드·폰트는 기존 편집 프로젝트가 필요합니다.</p>
          <p>AI에는 대상 프로젝트를 연결하고 asset_browse → asset_search → asset_get으로 찾도록 요청하세요. asset_read는 공유 이미지·문서도 해시를 검증해 읽습니다. 공유 영상·음성은 Studio에서 확인하고, 편집하려면 새 저장 버전을 복원하세요. 로컬 변경을 먼저 저장하고 원본 프로젝트 ID로 연결 권한을 바꾸지 마세요.</p>
          <p>결과가 불확실하면 같은 선택으로 재시도하세요. 권한 오류는 두 프로젝트의 작업공간·편집 권한을 확인하고, 충돌 오류는 목록을 새로고침하세요.</p>
          <Next href="#restore">새 저장 버전 복원하기</Next>
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
          <h2>다른 컴퓨터·새 세션에서 이어서 만들기</h2>
          <ol>
            <li>같은 컴퓨터·OS 사용자의 새 세션은 AI가 connection_ensure로 기존 연결을 찾아 붙입니다. 온라인 프로젝트가 같은 새 작업 폴더도 정확한 runId로 연결하며 사이트 재방문이나 단계별 허용은 필요하지 않습니다. 기존 사용량과 만료는 유지됩니다.</li>
            <li>
              새 컴퓨터라면 MCP 설치 후 같은 Studio 계정의 프로젝트를 처음 연결하세요. 기존 연결이 만료·철회된 때도 이때만 승인을 갱신합니다.
            </li>
            <li>
              Codex에 승인된 프로젝트를 복원하고 원본·음원 누락 여부를
              확인하도록 요청하세요.
            </li>
            <li>기존 서버 결과와 원본·선택 음원을 확인한 뒤 편집을 이어가세요. 재진입 때문에 전체를 재생성하지 않습니다.</li>
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
      return <><p>HIOB MCP는 프로젝트·소재·음성·렌더 도구를 연결합니다. 현재 오류별 안내는 오류 코드 사전에서 확인하세요. 아래 제작 스킬은 같은 MCP 버전의 제작 절차와 오류 복구 문서를 포함합니다. 제작 스킬은 Codex가 어떤 순서로 기획하고 검수할지 설명합니다. 두 가지를 함께 사용하세요.</p><ol className={styles.steps}><li><h2>제작 스킬 받기</h2><p><a href="/help/hiob-video-skill-1.9.25.zip" download>HIOB 영상 제작 스킬 1.9.25 다운로드</a> · <a href="/help/skills/hiob-video-1.9.25/SKILL.md">내용 먼저 보기</a></p><p>압축을 풀면 hiob-video 폴더가 나옵니다. 이 파일에는 개인 계정 정보나 공급자 API 키가 없습니다.</p></li><li><h2>Codex에 설치 요청</h2><Command prompt text={"다운로드한 hiob-video-skill-1.9.25.zip의 내용을 먼저 읽고 HIOB 영상 제작 스킬을 내 Codex 사용자 스킬 폴더에 설치해줘. 기존 hiob-video 스킬이 있다면 덮어쓰기 전에 차이를 보여줘. 다른 설정과 파일은 변경하지 마."} label="스킬 설치 요청 복사"/><p>압축 파일을 Codex에 첨부하거나 다운로드 경로를 지정합니다. 설치 후 새 대화에서 스킬이 보이는지 확인하세요. 앱에 스킬 설치 기능이 없다면 SKILL.md를 읽어 달라고 요청할 수 있습니다.</p></li><li><h2>스킬을 지정해 제작 요청</h2><Command prompt text={"hiob-video 스킬을 사용해 첨부 자료로 첫 영상을 기획해줘. HIOB MCP 연결과 렌더 환경부터 확인하고, 한국 릴스 설득 가이드와 42초 전체 예시를 읽고 요청한 본편 길이·전체 대본·목소리 후보·실제 동영상 동작·자막·견적을 먼저 보여줘. 유명인 발언은 원본과 제품 추천 여부를 확인하고, 제품 차이·작동 방식·이점·근거·구매 질문을 연결해. 직접 녹음이 있으면 그 음성의 대사·길이·쉼부터 장면과 자막에 맞춰줘. 새 AI 음성이 필요한 경우만 후보를 비교하고, 기존 승인 범위 안에서 필요한 소재만 생성해줘."} label="스킬 사용 요청 복사"/></li></ol><h2>한국 릴스: 길이보다 먼저 설득을 채우세요</h2><p>설명·구매형 첫 실험은 42초로 제안합니다. 0–3초 후킹, 3–12초 공감, 12–27초 제품 차이·작동 방식·이점, 27–37초 근거와 구매 질문, 37–42초 CTA를 이어갑니다. 요청한 길이를 우선하고 실제 발화에 맞춥니다.</p><p>유명인의 일반 발언, 실제 제품 추천, 고객 후기, 제품 실증을 구분하세요. 이미지 카드는 기획 참조이며 핵심 사용 장면은 시작·행동·끝이 있는 동영상으로 만듭니다.</p><p><a href="/help/skills/hiob-creative-harness-1.9.25/references/korean-reels-grammar.md">한국 릴스 설득 가이드 MD</a> · <a href="/help/skills/hiob-creative-harness-1.9.25/references/42s-persuasion-example.md">42초 전체 대본·동작표 MD</a> · <a href="/help/advertising">단계별 광고 사용설명서</a></p><h2>제품·원리 장면과 배속</h2><p>만드는 방법과 실행 방법을 나눠 확인하세요. 느린 외부 나레이션은 1.05–1.2배를 비교하고 자막을 다시 맞춥니다. 화면 인물이 말하는 컷은 음성만 가속하지 않습니다.</p><p><a href="/help/skills/hiob-creative-harness-1.9.25/references/product-science-scenes.md">장면 제작법·프롬프트 8개</a> · <a href="/help/skills/hiob-creative-harness-1.9.25/references/product-motion-execution.md">MCP 실행 절차·지원 범위</a></p><h2>기존 영상의 화면을 그대로 유지하기</h2><p>음성·배경음악·효과음만 추가할 때는 “원본 화면 보존 모드로 음향만 합쳐줘”라고 요청하세요. 영상 데이터를 재인코딩하지 않고 서버에서 소리만 합친 뒤 동일성을 검증합니다. 각 파일 200MiB·영상 10분·32트랙 이내이며, 새 제목·자막·화면 효과에는 일반 편집이 필요합니다. 한도를 맞추려고 원본을 저화질로 압축하지 않습니다.</p><h2>음악·효과음·제목 편집 스킬</h2><p><a href="/help/skills/hiob-creative-edit-1.9.25/SKILL.md">hiob-creative-edit 스킬 보기·저장</a>. 이 스킬은 최신 MCP에도 포함되어 있습니다. “사운드·제목 편집 스킬을 읽고 기존 목소리는 보존하면서 음악·효과음·제목을 다듬어줘”라고 요청하세요. 별도 설치 시 hiob-creative-edit 폴더 안에 SKILL.md로 저장합니다.</p><h2>입력 오류가 나오면 대안까지 확인하세요</h2><p><a href="/help/errors/input#HIOB_REFERENCE_PROMPT_TOO_LONG">참조를 붙인 프롬프트가 너무 긴 경우</a>와 <a href="/help/errors/seedance#SEEDANCE_LEGACY_FACE_FRAME_BLOCKED">Seedance에 과거 얼굴 시작 프레임이 남은 경우</a>는 오류별 복구 순서와 조건부 대안을 제공합니다. AI가 기존 성공 자산·현재 지원 입력·승인 범위를 확인하고 이어갑니다. 현재 승인한 모델과 목소리를 자동으로 바꾸지 않습니다.</p><h2>오래된 생성 소재 찾기</h2><p>Studio 생성 소재 목록의 “이전 작업 240건”으로 이전 결과를 찾을 수 있습니다. AI에게 기존 작업 ID로 상태를 조회하고 성공한 소재를 다시 써 달라고 요청하세요. 첫 화면에서 보이지 않는다는 이유로 새로 생성하지 않습니다.</p><h2>기존 영상에 지정 음성 입모양 맞추기</h2><p>화면에서 말하는 인물은 현재 선택한 모델과 음성 경로를 사용합니다. H3·Seedance 2·Seedance 2.5 각각에서 순정 또는 지정 음성 립싱크 경로를 선택합니다. 순정은 원본 얼굴과 발화를 보존합니다. 지정 음성 립싱크는 현재 모델·어댑터가 지원하는 원본 길이·화질을 확인하고 선택된 Typecast 승인 전문의 해당 구간을 연결합니다. lipsync_prepare가 같은 발화 구간과 파일 동기화를 준비하면 반환한 인자로 lipsync_quote에 연결하세요. 전송 중에는 같은 작업을 조회합니다. 무발화 동작·손 전용 컷은 인물·브랜드·배경·카메라 연속성을 검수합니다. 승인 범위 안에서 접수하며 원본과 파생본을 함께 보존합니다. 얼굴 외 화면의 동일성과 실제 발화는 직접 검수해야 합니다. <a href="https://studio.hi-ob.com/downloads/mcp/lipsync-guide-1.5.2.md">립싱크 호출 예시</a>.</p><h2>기획을 바꾼 뒤 기존 음원이 연결되지 않을 때</h2><p>AUDIO_PLAN_STALE이면 AI가 audio_recovery로 기존 저장 이력과 현재 기획을 대조합니다. 대본·목소리·발화 방식·타이밍이 그대로라면 기존 대사·음악·효과음 전체를 보존해 다시 연결합니다. 달라진 항목이 있으면 기존 승인 기록부터 확인합니다. 음원을 새로 만들거나 고객에게 파일·해시를 반복 입력시키지 않습니다. <a href="/help/errors/revision#AUDIO_PLAN_STALE">음원 연결 오류와 복구 절차</a>.</p><h2>업데이트 후 예전 촬영을 다시 만들라고 할 때</h2><p>AI가 현재 기획·연출·참조와 저장된 촬영 입력을 대조합니다. 육도 연기 안내만 추가된 경우에는 기존 성공 작업과 검수 이력을 찾아 이어갑니다. 새로운 감정 검수에 통과했다는 뜻은 아니므로 원본·립싱크·최종 영상의 실제 연기는 별도로 확인합니다. 새 생성 입력이 길이 한계를 넘더라도 검증된 기존 영상은 보존하며, 새로 만들 컷만 중복 설명을 정리합니다.</p><h2>피드백 확인에서 계속 멈출 때</h2><p>AI가 문제의 원본 해시와 같은 작업 ID를 찾아 당시 영상을 검사합니다. 과거 영상과 현재 선택한 모델이 다르면 구분해서 안내하며, 기존 대본·목소리·성공한 자료는 보존합니다. 검사 자료가 준비되면 실제 화면과 소리를 보고 문제와 수정 방향을 기록합니다. 다른 준비된 소재의 검사도 이어갈 수 있으며, 검사 수신만으로 문제가 해결됐다고 처리하지 않습니다. <a href="/help/errors/guided#GUIDED_REPAIR_INSPECTION_MISMATCH">피드백 원본과 검사 연결 오류의 복구 절차</a>.</p><h2>수정 의견이 저장되지 않았다고 나올 때</h2><p>AI가 원래 의견과 요청 ID를 보존하고 어떤 기획이나 영상에 관한 기록인지 확인합니다. 저장된 기획 또는 검사된 원본에 연결되기 전에는 같은 전송을 반복하지 않습니다. 원본 연결을 복구한 뒤 같은 요청으로 이어가며, 과거 목소리나 대본 선택을 현재 선택에 자동으로 덮어쓰지 않습니다. 기획이나 영상이 아직 없어도 고객 지시·거부·제작 차단의 원문은 별도 중앙 이력에 보관할 수 있습니다. 원본 연결이 막힌 의견은 원래 요청 ID와 본문을 그대로 보관하며, 같은 프로젝트에 연결한 다른 호스트도 조회할 수 있습니다. 과거 기록의 보관은 현재 승인이나 영상품질 통과가 아니므로, 원본 연결과 실제 재검수는 계속 진행합니다. AI는 project_note_list와 저장 수신 결과로 본문 보관을 확인합니다. <a href="/help/errors/inspection#DESKTOP_MEDIA_FEEDBACK_SOURCE_MISMATCH">피드백 원본 연결 오류와 복구 절차</a>.</p><h2>인물의 감정이 실제 영상에 담겼는지 확인하기</h2><p>육도 감정을 이름으로만 적지 않고 시작 표정·자세 → 행동 → 반응으로 검수합니다. AI가 emotion_review로 승인 의도를 읽고 원본·립싱크·최종 영상의 같은 구간을 실제로 관찰한 뒤 emotion_review_save에 기록합니다. 손 전용 컷은 손의 움직임을 확인합니다. 정지 프레임만 보았거나 아직 보지 않은 동작을 통과로 처리하지 않습니다. 관찰 기록은 파일과 시간 구간에만 해당하며 기존 원본·목소리·렌더 입력은 보존합니다. <a href="/help/errors/inspection#EMOTION_REVIEW_STALE">감정 관찰 오류와 복구 안내</a>.</p><h2>어떻게 만들어지나요?</h2><p>자료 검토 → 훅·장면 설계 → 직접 녹음 또는 AI 목소리 선택 → 비용 확인 → 이미지·영상 소재 생성 → 실제 발화에 맞춘 편집 → 화면·소리 검수 → Studio 저장 순서입니다. 고칠 때는 해당 문장이나 컷만 바꿉니다.</p><p>고품질 영상을 위해 기획 이미지 3장과 별도 인물·소품·배경 카드를 준비하세요. 일반 기획 누락은 안내합니다. 사회적 증거·원리 자료화면은 실제 참고 이미지를 고객에게 보여주고, 새로 생성할 영상은 선택한 모델의 참조 방식에 맞춰 준비합니다. Seedance의 인물은 얼굴 없는 소품·배경 참조와 CHARACTER 텍스트 규칙을 따르며, 인물 첫 프레임을 대신 업로드하지 않습니다. 이미지가 없거나 열리지 않으면 이미지 준비를 이어가고 해당 자료화면을 제작 준비 완료로 표시하지 않습니다. AI 앱에서 이미지를 만들 수 없으면 HIOB의 image_generation_quote로 Seedream·GPT Image 2.5 옵션과 견적을 확인하고 승인된 한도에서 생성할 수 있습니다. AI 앱 구독료와 이미지 생성 비용은 별도입니다. 최종 청취와 제품 사실 확인은 반드시 진행하세요.</p><Next href="#create">첫 영상 요청 예시 보기</Next></>;
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
              <p><a href="#windows">Windows 안내</a>에 따라 Codex·Node를 준비하고 HIOB를 설치합니다. 도구 목록과 runtime_check가 통과한 뒤 <a href="#connect">만든 프로젝트를 Codex에 연결</a>하세요. 브라우저 승인 후 실제 프로젝트 접근까지 확인합니다.</p>
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
      return <>
        <h2>서버 렌더 상태부터 확인하세요</h2>
        <p>최종 영상은 Studio → Hephaestus → Remotion AWS Lambda로 처리합니다. 로컬 엔진 설치로 서버 권한이나 운영 한도 문제를 해결하지 않습니다.</p>
        <ol><li><code>release_check</code>로 실제 실행 버전을 확인합니다. <code>render_status</code>가 없는 구버전이면 서버 렌더를 사용할 수 없습니다. 공개 업데이트 상태를 먼저 확인하세요.</li>
        <li><code>production_check</code>와 <code>render_status</code>로 프로젝트 지원, 연결과 한도를 확인합니다. <code>runtime_check</code> 성공만으로 서버 렌더 성공을 판단하지 않습니다.</li>
        <li>유효한 연결은 그대로 사용합니다. 서버 장애를 새 프로젝트 승인으로 해결하지 않습니다.</li>
        <li>진행 중 작업은 같은 ID로 조회합니다. 접수 여부가 불명확하면 새 유료 작업을 만들지 않습니다.</li>
        <li>완료된 작업은 <code>render_download</code>로 받아 실제 화면·음성을 검수합니다.</li></ol>
        <Command prompt text="HIOB의 기존 프로젝트와 연결을 찾아 production_check와 render_status로 확인해줘. 유효한 승인과 접수된 작업을 재사용해. 같은 작업을 다시 결제하거나 로컬 final로 대체하지 마. 새 권한이 필요한 이유와 서버 장애를 구분하고, 설치 버전에 서버 렌더 도구가 없으면 현재 공개 업데이트 상태를 알려줘." label="서버 렌더 점검 요청 복사" />
        <p>예전 Windows 엔진 복구 도구는 종료했습니다. 기존 프로젝트·설치 파일은 삭제하지 않습니다.</p>
        <Next href="#update">설치 버전과 업데이트 확인</Next>
      </>;
    case "voice":
      return (
        <>
          <h2>영상·음성을 모두 만들 수 있게 연결하기</h2>
          <p>크레딧 충전과 AI 연결의 사용 허용은 별개입니다. 영상은 생성됐는데 음성이 막히면 연결의 생성 상한, 음성 허용과 만료를 먼저 확인하세요. 잔액이 있어도 음성 미허용이나 연결 상한 소진이면 요청이 차단됩니다.</p>
          <p>직접 녹음·Typecast·혼합 중 선택한 방식부터 확인하세요. 녹음 파일을 사용하는 경우 Typecast 음성 생성 권한은 필요하지 않습니다. 혼합은 요청한 문장만 합성하며 기존 녹음을 유지합니다. 생성 권한 오류를 해결하려고 내 녹음을 다시 합성하지 마세요.</p>
          <ol>
            <li>현재 프로젝트의 연결 상태를 확인하세요. 유효한 승인 범위 안에서는 그대로 제작하고, 권한을 추가할 때만 새 승인 화면을 엽니다.</li>
            <li>새 영상이나 Typecast 합성을 선택했다면 Studio의 <strong>전체 제작 설정</strong>으로 필요한 범위를 준비하고 실제 사용할 권한·상한을 확인하세요. 직접 녹음을 저장·검사하는 데 합성 허용이나 렌더 견적은 필요하지 않습니다.</li>
            <li>프로젝트, 생성 요청 상한과 선택한 유효기간(기본 24시간)을 확인하고 <strong>이 프로젝트 연결 허용</strong>을 누르세요. 설정 버튼만으로 권한이 바뀌거나 크레딧이 차감되지 않습니다.</li>
            <li>같은 Windows AI로 돌아가 <code>connection_status</code> → <code>connection_attach</code> → <code>connection_diagnose</code>로 실제 연결을 확인하세요. 기존 영상과 사용할 수 있는 음원은 재생성하지 않습니다.</li>
          </ol>
          <p><a href="#renderer">서버 렌더 지원과 현재 작업 상태</a>를 확인합니다. 서버 렌더 권한 숫자만 올려도 지원되지 않는 프로젝트에서 AWS 렌더가 켜지는 것은 아닙니다.</p>
          <h2>AI가 먼저 한 번에 점검합니다</h2>
          <p><code>production_check</code>는 크레딧, 현재 연결에 남은 생성 한도, 선택한 방식의 제공사 상태, 가격표와 서버 렌더 지원을 함께 확인합니다. Typecast 구독·허용은 합성을 선택한 때만 필요하며 직접 녹음을 막지 않습니다. 검사 자체로 생성하거나 차감하지 않습니다.</p>
          <p>먼저 <code>connection_ensure</code>로 기존 허용을 자동 확인합니다. 최초 로그인·실제 만료·철회·허용 범위 변경일 때만 고객 확인이 필요합니다. 만료된 연결은 <code>connection_resume</code>로 기존 프로젝트를 유지합니다. 같은 승인 주소를 재사용하고, 웹 승인이 확인되면 AI가 연결을 마칩니다. 유효한 연결에 권한을 추가하려면 새 범위를 직접 승인해야 합니다.</p>
          <h2>소리가 빠졌다면 확인할 항목</h2>
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
              <strong>권한:</strong> Typecast로 새로 생성할 음성일 때만 Studio 연결의
              음성 허용, 생성 상한, 크레딧을 확인합니다.
            </li>
            <li>
              <strong>렌더:</strong> 필요한 음성을 포함한 짧은 구간을 렌더하고
              실제 소리를 들어봅니다.
            </li>
          </ol>
          <Command
            text="HIOB MCP에서 목소리가 빠진 원인을 확인해줘. 직접 녹음인지 Typecast 합성인지 먼저 확인하고, 녹음에는 합성 권한을 요구하지 마. 문장별 음원 파일, 복원 상태, 타임라인 배치, 음소거와 트림, 생성 권한을 점검해줘. 빠진 음성을 무음으로 대체하지 말고 수정할 부분과 비용을 먼저 알려줘."
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
          <h2>업데이트마다 앱을 다시 켜야 하나요?</h2>
          <p>
            관리형 설치는 앱 전체 재시작 없이 업데이트합니다. 설치 파일을 실행하면
            새 버전을 별도 폴더에서 검사하고, 진행 중인 호출이 끝난 뒤 다음 호출부터
            전환합니다. 이미 시작한 렌더와 원본·음원·프로젝트는 그대로 유지됩니다.
          </p>
          <ol>
            <li>현재 운영체제의 설치 명령을 다시 실행하세요. 기존 버전 폴더를 지우지 마세요.</li>
            <li>AI에게 <code>update_status</code>와 <code>release_check</code>를 요청하세요.</li>
            <li>실행 버전과 설치 버전이 같은지 확인한 뒤, 필요한 도구도 AI의 연결 도구 목록에 보이는지 확인하세요.</li>
            <li><code>waiting_for_calls</code>는 호출 종료를 기다리는 상태입니다. <code>update_blocked</code>면 기존 버전을 유지하므로 오류 문구를 확인하세요.</li>
          </ol>
          <p><code>current</code>는 실행 버전 확인입니다. 새 도구가 AI에 표시됐다는 뜻은 아닙니다. <code>update_status</code>의 <code>toolDiscovery</code>에서 호스트 도구 목록 갱신이 필요하다고 나오거나 <code>reference_prepare</code>·<code>capability_list</code>·<code>capability_prepare</code>·<code>capability_execute</code>가 보이지 않으면, 진행 중인 도구 호출이 끝난 뒤 AI 앱에서 HIOB 연결만 다시 연결하세요. 이미 접수한 제작은 같은 작업 ID로 조회하며 새로 접수하지 않습니다.</p>
          <h2>업데이트 후 참조 준비를 다시 이어가려면</h2>
          <p>기존 기획·참조 이미지·선택을 보존하고 <code>reference_prepare</code>를 이어가세요. 로컬 영수증이 없거나 구버전으로 복원됐어도 완료 기록이 있으면 같은 요청 ID와 서버 버전으로 영수증을 다시 받습니다. 확인 중 시간이 초과되면 같은 요청 ID로 조회하며 새 이미지나 영상을 생성하지 않습니다. 기획이나 이미지가 바뀌었다면 변경된 입력을 먼저 확인해야 합니다. 참조 준비는 고객 승인이나 유료 실행 승인이 아닙니다.</p>
          <h2>예전 설치를 쓰고 있다면 — 한 번만 전환</h2>
          <p>
            <code>codex mcp get hiob --json</code>의 경로에 <code>releases/버전/.../cli.mjs</code>가 있거나
            <code>update_status</code> 도구가 없으면 예전 방식입니다.
          </p>
          <details>
            <summary>Mac에서 예전 등록 때문에 설치가 멈춘 경우</summary>
            <p>처음 전환할 때는 자동 등록 옵션 없이 아래 명령으로 설치하세요. 이후 생성된 TOML을 보고 기존 HIOB 항목만 수정합니다.</p>
            <Command text={MCP_INSTALL_COMMAND} label="Mac 관리형 전환 설치 명령 복사" />
          </details>
          <ol>
            <li><code>config.toml</code>을 백업하고 새 설치 파일을 실행하세요. 예전 Mac 등록이 있으면 위 전환 명령을 사용하세요.</li>
            <li>설치가 만든 <code>codex-{MCP_RELEASE.version}.toml</code>을 열어 기존 <code>[mcp_servers.hiob]</code>의 command·args만 교체하세요. 작업 폴더·환경변수·다른 MCP는 보존하세요.</li>
            <li>경로가 <code>launcher-v3.mjs</code>로 바뀌었는지 확인하고, 앱이 제공하는 HIOB MCP 재연결 또는 새 대화로 설정을 반영하세요.</li>
          </ol>
          <p>
            앱이 연결 새로 고침을 제공하지 않으면 이 최초 전환 때만 앱 재실행이 필요할 수 있습니다.
            이후 호환 업데이트는 같은 연결에서 적용됩니다. 도구 목록 변경을 반영하지 않는 앱이나
            실행기 호환 계약이 바뀌는 업데이트에서는 MCP 재연결이 필요할 수 있습니다.
            Windows 실기기 검증 여부는 <a href="#compatibility">호환성 안내</a>를 확인하세요.
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
              HIOB MCP를 재연결하거나 새 대화에서 도구를 확인합니다. 앱에 재연결 기능이 없을 때만 최초 설정 반영을 위해 앱을 다시 실행합니다.
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
              항목은 launcher-v3.mjs입니다. 모두 출력된 절대 경로를 사용하세요.
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
