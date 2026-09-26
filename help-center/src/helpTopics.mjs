export const HELP_TOPICS = [
  {
    id: "setup",
    title: "설치와 준비",
    description: "내 컴퓨터에 HIOB를 연결합니다.",
  },
  {
    id: "account",
    title: "계정과 연결",
    description: "Studio 프로젝트의 접근 권한을 관리합니다.",
  },
  {
    id: "production",
    title: "제작과 저장",
    description: "자료로 시작하고, 검수한 작업을 이어갑니다.",
  },
  {
    id: "billing",
    title: "크레딧과 비용",
    description: "지급받은 잔액과 생성 비용을 확인합니다.",
  },
  {
    id: "fix",
    title: "문제 해결",
    description: "막힌 지점에 맞는 해결 방법을 찾습니다.",
  },
];
// Each article has one task category. Other articles cross-link to that source.
export const HELP_ARTICLES = [
  {id:"skills",topic:"production",title:"영상 제작 스킬 설치하고 사용하기",summary:"기획·목소리·편집·검수 순서를 Codex에 연결합니다.",keywords:"스킬 skill SKILL.md 다운로드 코덱스 이미지 나레이션"},
  {id:"payment",topic:"billing",title:"계좌이체로 충전하고 이메일 요청하기",summary:"요청 저장·실제 입금·운영자 확인·잔액 반영 순서입니다.",keywords:"계좌 이체 결제 입금 이메일 Gmail 크레딧 환불"},
  {id:"privacy",topic:"account",title:"내 정보와 제작 정보 수집 범위 확인하기",summary:"연락처 수정과 프로젝트 제목·키워드·완성본 활용 범위입니다.",keywords:"개인정보 전화번호 이름 업체명 이메일 콘텐츠 삭제"},
  {id:"windows-test",topic:"setup",title:"Windows에서 새 계정으로 처음부터 확인하기",summary:"다른 이메일 가입부터 충전·첫 영상·재접속까지 확인합니다.",keywords:"신규 처음 윈도우 테스트 첫 경험 가입 결제 검증"},
  {
    id: "install",
    topic: "setup",
    title: "HIOB MCP 설치하기",
    summary: "Windows · macOS · Linux 중 내 운영체제를 선택하세요.",
    keywords: "윈도우 맥 리눅스 다운로드 Node npm PowerShell 터미널 Codex 준비",
  },
  {
    id: "compatibility",
    topic: "setup",
    title: "지원 환경과 검증 범위 확인하기",
    summary: "내 컴퓨터에서 설치와 최종 렌더가 가능한지 확인합니다.",
    keywords:
      "Intel 인텔 Apple Silicon ARM64 x64 WSL 베타 버전 다운로드 API SHA",
  },
  {
    id: "manual",
    topic: "setup",
    title: "수동으로 Codex · 다른 AI 앱에 등록하기",
    summary: "자동 등록 대신 설정 파일을 사용하는 경우의 안내입니다.",
    keywords: "config.toml JSON command args PATH mcpServers 설정",
  },
  {
    id: "connect",
    topic: "account",
    title: "회원가입하고 Studio 프로젝트 연결하기",
    summary: "가입·이메일 확인 → 내 정보·작업공간 → 첫 프로젝트·Codex 연결 순서입니다.",
    keywords:
      "로그인 계정 브랜드 권한 24시간 만료 해제 connection_begin 음성 허용",
  },
  {
    id: "create",
    topic: "production",
    title: "첫 영상 제작 요청하기",
    summary: "자료 → 기획 확인 → 생성 승인 → 편집·검수 순서로 시작합니다.",
    keywords: "프롬프트 대본 자막 나레이션 후킹 9초 소리 MP4",
  },
  {
    id: "restore",
    topic: "production",
    title: "저장하고 다른 컴퓨터에서 이어하기",
    summary: "원본과 음원이 포함된 프로젝트를 복원합니다.",
    keywords: "백업 새 세션 업로드 다운로드 저장 이동 편집 복구",
  },
  {
    id: "credits",
    topic: "billing",
    title: "크레딧과 브랜드 잔액 확인하기",
    summary: "브랜드별 잔액과 생성 전에 확인할 비용을 안내합니다.",
    keywords: "결제 충전 PG 가격 요금 무료 예산 한도 잔액 부족 Windows",
  },
  {
    id: "tools",
    topic: "fix",
    title: "설치했는데 HIOB 도구가 안 보여요",
    summary: "실행 환경과 Codex 등록 상태를 확인합니다.",
    keywords: "node npm codex 찾을 수 없어요 ps1 정책 재시작 다른 앱 권한",
  },
  {
    id: "renderer",
    topic: "fix",
    title: "Docker 준비 · 영상 렌더가 멈췄어요",
    summary: "렌더 환경 점검과 첫 빌드 오류를 해결합니다.",
    keywords:
      "ready=false runtime_check setup-renderer Buildx timeout 시간 초과 linux 엔진 경로 쉼표 Colima",
  },
  {
    id: "voice",
    topic: "fix",
    title: "영상에 목소리가 빠져요",
    summary: "음원 복원, 배치, 생성 권한을 확인합니다.",
    keywords: "무음 소리 음성 Typecast 나레이터 오디오 나레이션",
  },
  {
    id: "update",
    topic: "fix",
    title: "설치가 실패했어요 · 새 버전으로 바꾸고 싶어요",
    summary: "기존 설정을 보존하고 설치 또는 업데이트를 다시 진행합니다.",
    keywords: "해시 SHA 무결성 이미 hiob 업그레이드 release 중단",
  },
];
export function resolveHelpHash(hash) {
  const id = hash.replace(/^#/, "");
  if (["windows", "macos", "linux"].includes(id))
    return { article: "install", os: id };
  const aliases = {
    codex: "manual",
    verify: "tools",
    requirements: "compatibility",
    troubleshooting: "fix",
  };
  const resolved = aliases[id] || id;
  return {
    article:
      HELP_ARTICLES.some((a) => a.id === resolved) ||
      HELP_TOPICS.some((t) => t.id === resolved)
        ? resolved
        : "",
    os: "",
  };
}
export function searchHelp(query) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return HELP_ARTICLES.filter((article) => {
    const haystack =
      `${article.title} ${article.summary} ${article.keywords}`.toLocaleLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}
