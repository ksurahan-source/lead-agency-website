import "./landing.css";
import "./analytics.mjs";
import { frameLayout, scrollProgress, sceneState } from "./scroll-scene.mjs";
import { createChapterPlayback } from "./chapter-playback.mjs";
const $ = (selector) => document.querySelector(selector);
const hero = $("#hero-video"),
  cinema = $(".cinema"),
  stage = $(".cinema-stage"),
  canvas = $("#three-stage");
const dialog = $("#video-dialog"),
  fullVideo = $("#full-video"),
  status = $(".media-status");
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
let manualReduced = false;
try {
  manualReduced = sessionStorage.getItem("hiob-reduced-motion") === "true";
} catch {
  /* Optional preference. */
}
const reduced = () =>
  motionQuery.matches ||
  manualReduced ||
  navigator.connection?.saveData === true;
let progress = 0,
  visible = true,
  frame = 0,
  engine,
  engineLoading = false,
  engineFailed = false,
  enhanceRequested = false,
  observed = -1,
  scrollSettling = false,
  settleTimer;
const descriptions = [
  "쓰던 AI와 HIOB를 연결하세요.",
  "자료에서 출발해, 기획은 함께 정합니다.",
  "확인한 기획으로 장면·목소리·자막을 만듭니다.",
  "좋은 건 남기고, 필요한 부분만 다듬습니다.",
  "영상과 프로젝트를 함께 가져가세요.",
];
function loadVideo() {
  if (!hero.getAttribute("src")) {
    hero.src = innerWidth < 700 ? hero.dataset.mobileSrc : hero.dataset.src;
    if (innerWidth < 700) hero.poster = hero.dataset.mobilePoster;
    hero.load();
  }
}
const playback = createChapterPlayback(hero, ({ paused, held }) => {
  $("#scene-pause").textContent = held
    ? "장면 완료"
    : paused
      ? "이어서 보기"
      : "일시정지";
  $("#scene-pause").disabled = held;
  $("#film-time").textContent = held
    ? "장면 완료 · 스크롤하면 다음 단계"
    : paused
      ? "일시정지"
      : "장면 재생 중 · 1×";
  stage.dataset.playback = held ? "held" : paused ? "paused" : "playing";
});
function revealSelectedFrame() {
  if (
    hero.readyState >= 2 &&
    !hero.seeking &&
    Math.floor(hero.currentTime / 6) === observed
  ) {
    stage.classList.remove("scene-loading");
  }
}
hero.addEventListener("seeked", () => {
  playback.ready();
  revealSelectedFrame();
});
hero.addEventListener("loadeddata", () => {
  status.textContent = "";
  playback.ready();
  revealSelectedFrame();
  schedule();
});
hero.addEventListener("error", () => {
  status.textContent =
    "영상을 불러오지 못했습니다. 아래 전체 보기로 다시 확인하세요.";
});
hero.addEventListener("timeupdate", playback.tick);
// Frame-accurate stopping where available, timeupdate fallback otherwise.
function videoFrame() {
  playback.tick();
  hero.requestVideoFrameCallback(videoFrame);
}
if (hero.requestVideoFrameCallback) hero.requestVideoFrameCallback(videoFrame);
$("#scene-pause").addEventListener("click", () => playback.togglePause());
$("#scene-replay").addEventListener("click", () => playback.replay());
async function startEngine() {
  if (engine || engineLoading || engineFailed || reduced() || !enhanceRequested)
    return;
  engineLoading = true;
  try {
    const { createStage } = await import("./stage-three.mjs");
    if (reduced()) return;
    engine = await createStage({
      container: canvas,
      video: hero,
      onReady: () => {
        if (!reduced()) stage.classList.add("webgl-ready");
      },
      onFail: () => {
        engineFailed = true;
        stage.classList.remove("webgl-ready");
      },
    });
    schedule();
  } catch (error) {
    engineFailed = true;
    stage.classList.remove("webgl-ready");
    console.warn(
      "HIOB 3D preview unavailable; native video remains available.",
      error.message,
    );
  } finally {
    engineLoading = false;
  }
}
function layoutFallback(state) {
  const aspect = hero.videoWidth
    ? hero.videoWidth / hero.videoHeight
    : innerWidth < 700
      ? 1
      : 16 / 9;
  const layout = frameLayout(
    stage.clientWidth,
    stage.clientHeight,
    state.open,
    aspect,
  );
  stage.style.setProperty("--film-width", `${layout.width}px`);
  stage.style.setProperty("--film-top", `${layout.y}px`);
  stage.style.setProperty("--film-aspect", aspect);
}
function paint() {
  frame = 0;
  const rect = cinema.getBoundingClientRect();
  visible = rect.bottom > 0 && rect.top < innerHeight;
  if (reduced()) {
    playback.setActive(false);
    engine?.setActive(false);
    return;
  }
  progress = scrollProgress(rect.top, rect.height, stage.offsetHeight);
  if (progress > 0) enhanceRequested = true;
  const state = sceneState(
    progress,
    Number.isFinite(hero.duration) ? hero.duration : 30,
  );
  stage.style.setProperty("--progress", state.progress);
  stage.style.setProperty("--open", state.open);
  stage.style.setProperty("--dark", state.dark);
  layoutFallback(state);
  stage.dataset.progress = state.progress.toFixed(4);
  if (observed !== state.chapter && !scrollSettling) {
    if (observed !== -1 || state.chapter !== 0)
      stage.classList.add("scene-loading");
    observed = state.chapter;
    stage.dataset.chapter = state.chapter;
    $("#chapter-description").textContent = descriptions[state.chapter];
    $(".chapter-count").textContent = `0${state.chapter + 1} — 05`;
    document.querySelectorAll("[data-jump]").forEach((button, index) => {
      if (index === state.chapter) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    playback.choose(state.chapter);
    revealSelectedFrame();
  }
  // The selected film and labels stay together while a fast gesture settles.
  state.chapter = Math.max(0, observed);
  const active = visible && !document.hidden && !dialog.open;
  engine?.setActive(active);
  engine?.update(state);
  playback.setActive(active);
  if (!active) {
    return;
  }
  loadVideo();
  startEngine();
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(paint);
}
addEventListener(
  "pointermove",
  () => {
    enhanceRequested = true;
    schedule();
  },
  { once: true, passive: true },
);
addEventListener(
  "scroll",
  () => {
    scrollSettling = true;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      scrollSettling = false;
      schedule();
    }, 160);
    schedule();
  },
  { passive: true },
);
addEventListener("resize", schedule, { passive: true });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    playback.setActive(false);
    engine?.setActive(false);
  } else schedule();
});
document.querySelectorAll("[data-jump]").forEach((button) =>
  button.addEventListener("click", () => {
    const top = scrollY + cinema.getBoundingClientRect().top;
    const target =
      Number(button.dataset.jump) *
      Math.max(1, cinema.offsetHeight - stage.offsetHeight);
    // Explicit selection is immediate; native gestures are never intercepted.
    clearTimeout(settleTimer);
    scrollSettling = false;
    scrollTo({ top: top + target, behavior: "instant" });
    schedule();
  }),
);
const motionButton = $(".motion-toggle");
function applyMotion() {
  const reduce = reduced();
  document.documentElement.classList.toggle("reduced-motion", reduce);
  motionButton.setAttribute("aria-pressed", String(reduce));
  motionButton.textContent = reduce ? "동작 줄이기 켜짐" : "동작 줄이기";
  if (reduce) {
    playback.setActive(false);
    stage.classList.remove("webgl-ready");
    engine?.setActive(false);
  } else {
    if (engine && !engineFailed) stage.classList.add("webgl-ready");
    observed = -1;
    schedule();
  }
}
motionButton.addEventListener("click", () => {
  if (motionQuery.matches || navigator.connection?.saveData) {
    status.textContent =
      "기기의 동작 줄이기 또는 데이터 절약 설정을 따르고 있습니다.";
    return;
  }
  manualReduced = !manualReduced;
  try {
    sessionStorage.setItem("hiob-reduced-motion", String(manualReduced));
  } catch {
    /* Optional preference. */
  }
  applyMotion();
  cinema.scrollIntoView({ behavior: "instant" });
});
motionQuery.addEventListener("change", applyMotion);
let returnFocus;
document.querySelectorAll("[data-video]").forEach((button) =>
  button.addEventListener("click", () => {
    returnFocus = button;
    $("#dialog-title").textContent = button.dataset.title;
    playback.setActive(false);
    engine?.setActive(false);
    fullVideo.src =
      innerWidth < 700 && button.dataset.mobileVideo
        ? button.dataset.mobileVideo
        : button.dataset.video;
    dialog.showModal();
    fullVideo.play().catch(() => {
      /* Native controls allow explicit playback. */
    });
  }),
);
$("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  fullVideo.pause();
  fullVideo.removeAttribute("src");
  fullVideo.load();
  returnFocus?.focus({ preventScroll: true });
  schedule();
});
// Native scrolling; no wheel interception, artificial momentum or scroll lock.
applyMotion();
addEventListener("pagehide", () => {
  playback.setActive(false);
  engine?.setActive(false);
});
addEventListener("pageshow", schedule);
