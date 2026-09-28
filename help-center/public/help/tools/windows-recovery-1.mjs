#!/usr/bin/env node
// Official HIOB Windows recovery. No credentials, project files or paid APIs.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';
const execute = promisify(execFile);
const failure = (code, action) => Object.assign(new Error(code), { recoveryCode: code, action });
const json = value => JSON.parse(value);

export async function recoverWindows({ repair = false, installDir } = {}, dependencies = {}) {
  const { platform = process.platform, env = process.env, run = execute, files = fs, progress = () => {} } = dependencies;
  const report = { schema: 'HiobWindowsRecovery.v1', platform, mode: repair ? 'repair' : 'diagnose',
    ready: false, checks: [], actions: [], paidCalls: 0, voice: 'not_checked', videoRender: 'not_tested' };
  const childEnv = Object.fromEntries(['PATH', 'HOME', 'USERPROFILE', 'SystemRoot', 'SYSTEMROOT', 'APPDATA',
    'LOCALAPPDATA', 'TEMP', 'TMP', 'DOCKER_HOST', 'DOCKER_CONTEXT', 'DOCKER_CONFIG', 'DOCKER_TLS_VERIFY', 'DOCKER_CERT_PATH']
    .filter(key => typeof env[key] === 'string').map(key => [key, env[key]]));
  let stage = 'platform';
  const command = (file, args, timeout = 15000) => run(file, args, {
    env: childEnv, timeout, maxBuffer: 1024 * 1024, windowsHide: true,
  });
  try {
    if (platform !== 'win32') throw failure('WINDOWS_REQUIRED', '이 복구 도구는 실제 Windows PC에서 실행하세요. 다른 운영체제는 변경하지 않았습니다.');
    stage = 'docker_cli';
    await command('docker', ['--version']);
    report.checks.push('docker_cli');
    stage = 'docker_context';
    const endpoint = env.DOCKER_CONTEXT || !env.DOCKER_HOST
      ? json((await command('docker', ['context', 'inspect', '--format', '{{json .Endpoints.docker.Host}}'])).stdout.trim())
      : env.DOCKER_HOST;
    // Never change the context or send local files to a remote daemon.
    if (typeof endpoint !== 'string' || !/^npipe:\/\/\/\/\.\/pipe\/[a-zA-Z0-9_.-]+$/.test(endpoint)) {
      throw failure('LOCAL_DOCKER_REQUIRED', '현재 Docker 컨텍스트가 로컬 Windows 엔진이 아닙니다. docker context ls로 확인하고 의도한 로컬 Docker Desktop 컨텍스트를 직접 선택하세요.');
    }
    report.checks.push('local_context');
    // Pin the verified endpoint for every later command, including the MCP child.
    // A parallel `docker context use` must not redirect recovery to a remote host.
    delete childEnv.DOCKER_CONTEXT;
    childEnv.DOCKER_HOST = endpoint;
    stage = 'docker_engine';
    let os;
    try { os = (await command('docker', ['info', '--format', '{{.OSType}}'])).stdout.trim(); }
    catch {
      if (!repair) throw failure('DOCKER_ENGINE_STOPPED', 'Docker Desktop을 실행하거나 이 도구를 --repair로 실행하세요.');
      stage = 'docker_start';
      progress('Docker Desktop 시작을 요청합니다. 최대 45초 기다립니다.');
      await command('docker', ['desktop', 'start', '--timeout', '45'], 50000);
      report.actions.push('docker_start_requested');
      stage = 'docker_engine';
      os = (await command('docker', ['info', '--format', '{{.OSType}}'])).stdout.trim();
    }
    if (os !== 'linux') throw failure('LINUX_CONTAINERS_REQUIRED', 'Docker Desktop에서 Linux 컨테이너 모드를 선택하세요. 실행 중인 다른 컨테이너에 영향을 줄 수 있어 자동 전환하지 않았습니다.');
    report.checks.push('linux_engine');
    stage = 'buildx';
    await command('docker', ['buildx', 'version']);
    report.checks.push('buildx');
    stage = 'installation';
    const rootInput = installDir || (env.LOCALAPPDATA && path.win32.join(env.LOCALAPPDATA, 'HIOB', 'MCP'));
    if (!rootInput || !path.win32.isAbsolute(rootInput)) throw failure('MCP_INSTALL_NOT_FOUND', 'HIOB 설치 폴더를 찾지 못했습니다. 사용자 지정 설치라면 --install-dir 절대경로를 지정하세요.');
    const root = await files.realpath(rootInput);
    const active = json(await files.readFile(path.win32.join(root, 'current.json'), 'utf8'));
    if (active.schema !== 'HiobMcpActiveRelease.v1' || !/^0\.6\.\d+$/.test(active.version) ||
        !/^[a-f0-9]{64}$/.test(active.sha256) || active.sessionContract !== 1) {
      throw failure('MCP_INSTALL_INVALID', '현재 설치 기록을 확인할 수 없습니다. HIOB 0.6 관리형 설치 안내를 확인하세요. 기존 자료와 설정은 보존했습니다.');
    }
    const release = path.win32.join(root, 'releases', active.version);
    const cli = path.win32.join(release, 'node_modules', '@hiob', 'mcp', 'src', 'cli.mjs');
    const same = (a, b) => path.win32.normalize(a).toLowerCase() === path.win32.normalize(b).toLowerCase();
    if (!same(await files.realpath(release), release) || !same(await files.realpath(cli), cli)) {
      throw failure('MCP_INSTALL_INVALID', '설치 경로가 외부로 연결돼 있어 실행하지 않았습니다. HIOB 설치 안내를 확인하세요.');
    }
    const receipt = (await files.readFile(path.win32.join(release, '.release-sha256'), 'utf8')).trim();
    const pkg = json(await files.readFile(path.win32.join(release, 'node_modules', '@hiob', 'mcp', 'package.json'), 'utf8'));
    if (receipt !== active.sha256 || pkg.name !== '@hiob/mcp' || pkg.version !== active.version || pkg.hiobSessionContract !== 1) {
      throw failure('MCP_INSTALL_INVALID', '버전·설치 영수증이 일치하지 않아 실행하지 않았습니다. 원본을 보존하고 HIOB 설치를 확인하세요.');
    }
    report.version = active.version;
    report.checks.push('installation_receipt');
    // Explicit local backend; no provider secrets are inherited by this child.
    const local = async (args, timeout) => run(process.execPath, [cli, ...args], {
      env: { ...childEnv, HIOB_RENDER_BACKEND: 'docker' }, timeout, maxBuffer: 2 * 1024 * 1024, windowsHide: true,
    });
    const doctor = async () => {
      try { return json((await local(['doctor'], 60000)).stdout); }
      catch (error) { if (error.code === 2 && error.stdout) return json(error.stdout); throw error; }
    };
    stage = 'renderer_check';
    let result = await doctor();
    if (!result.ready) {
      if (!repair) throw failure('RENDERER_NOT_READY', '로컬 Linux 엔진은 실행 중입니다. --repair로 HIOB 렌더 이미지를 준비하고 다시 검사하세요.');
      stage = 'renderer_setup';
      progress('설치된 HIOB 버전의 렌더 이미지를 준비합니다. 최초 준비에는 수 분이 걸립니다. 앱을 재시작하지 마세요.');
      await local(['setup-renderer'], 950000);
      report.actions.push('renderer_setup_completed');
      stage = 'renderer_check';
      result = await doctor();
    }
    if (result.ready !== true || result.platform !== 'win32' || result.renderBackend !== 'docker') {
      throw failure('RENDERER_NOT_READY', '렌더 실행 검사에 통과하지 못했습니다. 같은 Windows AI 앱에서 runtime_check의 오류를 확인하세요.');
    }
    report.checks.push('renderer_execution');
    report.ready = true;
    report.nextAction = '같은 Windows AI 앱에서 runtime_check를 다시 확인하세요. 음성은 connection_status의 voiceGenerationAllowed·생성 상한·역할·만료를 별도로 확인하세요. 이 결과는 실제 영상 성공이나 음성 승인이 아닙니다.';
  } catch (error) {
    const defaults = {
      docker_cli: ['DOCKER_CLI_UNAVAILABLE', 'Docker Desktop 설치와 PATH를 확인하세요. 설치돼 있다면 새 PowerShell 창에서 docker --version을 확인하세요.'],
      docker_context: ['DOCKER_CONTEXT_UNAVAILABLE', 'docker context ls로 로컬 Docker Desktop 컨텍스트를 확인하세요.'],
      docker_start: ['DOCKER_START_FAILED', 'Docker Desktop을 직접 여세요. 약관·WSL·가상화 안내가 있으면 해당 화면에서 확인하세요. 구버전 Docker에는 desktop start 명령이 없을 수 있습니다.'],
      docker_engine: ['DOCKER_ENGINE_UNAVAILABLE', 'Docker Desktop의 엔진 상태와 WSL 오류를 확인하세요. 시스템 재시작·설정 초기화는 자동 실행하지 않았습니다.'],
      buildx: ['BUILDX_UNAVAILABLE', 'Docker Desktop의 Buildx 설치 상태를 확인하세요.'],
      installation: ['MCP_INSTALL_NOT_FOUND', 'HIOB 관리형 설치 기록을 확인하세요. 사용자 지정 경로는 --install-dir로 지정할 수 있습니다.'],
      renderer_setup: ['RENDERER_SETUP_FAILED', '렌더 이미지 준비가 실패했습니다. Docker Desktop의 네트워크·디스크·빌드 상태를 확인하세요. 기존 자료와 설치는 보존했습니다.'],
      renderer_check: ['RENDERER_CHECK_FAILED', '같은 Windows AI 앱에서 runtime_check를 실행하고 실패한 검사를 확인하세요.'],
    };
    const [code, action] = defaults[stage] || ['CHECK_FAILED', 'HIOB 도움말에서 이 실패 코드를 확인하세요.'];
    report.blocker = { stage, code: error.recoveryCode || code, action: error.action || action };
  }
  return report;
}

export function parseOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--repair' && !options.repair) options.repair = true;
    else if (args[i] === '--install-dir' && !options.installDir && args[i + 1] && !args[i + 1].startsWith('--')) options.installDir = args[++i];
    else throw new Error('사용법: node windows-recovery-1.mjs [--repair] [--install-dir 절대경로]');
  }
  return options;
}
const entry = process.argv[1] ? await fs.realpath(process.argv[1]).catch(() => null) : null;
if (entry && pathToFileURL(entry).href === import.meta.url) {
  try {
    const result = await recoverWindows(parseOptions(process.argv.slice(2)), { progress: message => process.stderr.write(message + '\n') });
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    if (!result.ready) process.exitCode = 2;
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
