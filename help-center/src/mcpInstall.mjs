import { MCP_RELEASE } from './mcpRelease.generated.mjs';
export { MCP_RELEASE };

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
