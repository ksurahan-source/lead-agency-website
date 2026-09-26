// A release is immutable: replace this descriptor only after testing the packed artifact.
export const MCP_RELEASE = Object.freeze({
  schema: 'HiobMcpInstall.v1',
  version: '0.6.0',
  channel: 'beta',
  transport: 'stdio',
  platforms: ['darwin-arm64', 'linux-arm64'],
  verificationUrl: 'https://studio.hi-ob.com/downloads/mcp/compatibility-0.6.0.json',
  compatibility: [
    { platform: 'darwin-arm64', label: 'macOS · Apple Silicon', toolsLabel: '설치·통신·자료 가져오기 통과', renderLabel: '3초 테스트 영상·음원 합성 통과' },
    { platform: 'darwin-x64', label: 'macOS · Intel (실험적)', toolsLabel: '0.6.0 검증 대기', renderLabel: '0.6.0 검증 대기' },
    { platform: 'win32-x64', label: 'Windows · x64', toolsLabel: '0.6.0 검증 대기', renderLabel: 'Docker 경로 제공 · 실기기 검증 대기' },
    { platform: 'win32-arm64', label: 'Windows · ARM64 (실험적)', toolsLabel: '실기기 검증 대기', renderLabel: 'Docker 경로 제공 · 실기기 검증 대기' },
    { platform: 'linux-x64', label: 'Linux · x64 (실험적)', toolsLabel: '실기기 검증 대기', renderLabel: 'Docker 경로 제공 · 실기기 검증 대기' },
    { platform: 'linux-arm64', label: 'Linux · ARM64 (가상 머신 검증)', toolsLabel: '설치·MCP·한글 경로 통과', renderLabel: 'Docker 영상·음원 합성 통과' },
  ],
  node: '>=22.18.0',
  packageUrl: 'https://studio.hi-ob.com/downloads/mcp/hiob-mcp-0.6.0.tgz',
  sha256: '72d2d94749940484c56efd0aa443471b8e345bbaa764c9ee694ccdae1123f8e2',
  installerUrl: 'https://studio.hi-ob.com/downloads/mcp/install-0.6.0.sh',
  toolsInstallerUrl: 'https://studio.hi-ob.com/downloads/mcp/install-tools-0.6.0.mjs',
  setupPlatforms: ['darwin-arm64', 'darwin-x64', 'win32-x64', 'win32-arm64', 'linux-x64', 'linux-arm64'],
  guideUrl: 'https://hi-ob.com/help',
  connectUrl: 'https://studio.hi-ob.com/mcp',
  signupUrl: 'https://studio.hi-ob.com/studio/signup?next=%2Fmcp',
  generationRequiresCredits: true,
});

export const MCP_INSTALL_COMMAND = `curl --fail --show-error --location --proto '=https' --tlsv1.2 '${MCP_RELEASE.installerUrl}' -o hiob-install.sh &&\nsh hiob-install.sh`;
export const MCP_CODEX_INSTALL_COMMAND = `${MCP_INSTALL_COMMAND} --codex`;

// Setup availability is separate from the exact-release render evidence in platforms.
export const MCP_WINDOWS_INSTALL_COMMAND = `Invoke-WebRequest -Uri '${MCP_RELEASE.toolsInstallerUrl}' -OutFile hiob-install.mjs -ErrorAction Stop\nif ($?) { node .\\hiob-install.mjs }`;
export const MCP_LINUX_INSTALL_COMMAND = `curl --fail --show-error --location --proto '=https' --tlsv1.2 '${MCP_RELEASE.toolsInstallerUrl}' -o hiob-install.mjs &&\nnode ./hiob-install.mjs`;
export const MCP_VERIFY_PROMPT = 'HIOB MCP의 release_check, runtime_check와 project_list를 실행해줘. 설치본과 공개 버전의 일치 여부, Studio 배포 버전, 운영체제, 프로젝트 조회 성공 여부, 최종 렌더 지원 여부를 따로 알려줘. 설치 확인 중에는 유료 생성이나 업로드를 실행하지 마. renderBackend와 ready를 확인해줘. Windows/Linux는 로컬 Docker Linux 엔진과 renderer_setup이 필요해. ready=false이면 원인과 설치 절차를 설명하고 보호 장치를 우회하지 마.';

// Kept narrower than general navigation: never put an arbitrary URL into an email.
export function mcpSignupNext(value) {
  if (typeof value !== 'string' || /[\u0000-\u001f\u007f]/.test(value)) return '/';
  if (value === '/mcp' || value === '/mcp/install') return value;
  if (typeof value === 'string' && /^\/mcp\?challenge=[a-f0-9]{64}$/.test(value)) return value;
  return '/';
}
