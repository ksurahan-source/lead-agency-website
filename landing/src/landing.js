import "./landing.css";
import "./analytics.mjs";
import { frameLayout, scrollProgress, sceneState } from "./scroll-scene.mjs";
import { createScrollPlayback } from "./scroll-playback.mjs";
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
  observed = -1;
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
const playback = createScrollPlayback(hero, {
  onDecoded: (time, milliseconds) => {
    stage.dataset.decodedTime = time.toFixed(3);
    stage.dataset.seekMs = milliseconds.toFixed(1);
    stage.classList.remove("scene-loading");
  },
});
hero.addEventListener("seeked", playback.decoded);
hero.addEventListener("loadeddata", () => {
  status.textContent = "";
  playback.ready();
  schedule();
});
hero.addEventListener("error", () => {
  status.textContent =
    "영상을 불러오지 못했습니다. 아래 전체 보기로 다시 확인하세요.";
});
// The compositor's mediaTime verifies the displayed frame, not just a seek request.
function videoFrame(_now, metadata) {
  stage.dataset.presentedTime = metadata.mediaTime.toFixed(3);
  hero.requestVideoFrameCallback(videoFrame);
}
if (hero.requestVideoFrameCallback) hero.requestVideoFrameCallback(videoFrame);
$("#scene-replay").addEventListener("click", () =>
  jumpTo(Math.max(0, observed) / 5 + 1 / 900),
);
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
  if (!hero.hasAttribute("src") && state.chapter > 0)
    stage.classList.add("scene-loading");
  if (observed !== state.chapter) {
    observed = state.chapter;
    stage.dataset.chapter = state.chapter;
    $("#chapter-description").textContent = descriptions[state.chapter];
    $(".chapter-count").textContent = `0${state.chapter + 1} — 05`;
    document.querySelectorAll("[data-jump]").forEach((button, index) => {
      if (index === state.chapter) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  }
  stage.dataset.targetTime = state.time.toFixed(3);
  $("#film-time").textContent = `${state.time.toFixed(1)} / 30초 · 스크롤 연동`;
  playback.seek(state.time);
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
addEventListener("scroll", schedule, { passive: true });
addEventListener("resize", schedule, { passive: true });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    playback.setActive(false);
    engine?.setActive(false);
  } else schedule();
});
function jumpTo(position) {
  const top = scrollY + cinema.getBoundingClientRect().top;
  const target =
    position * Math.max(1, cinema.offsetHeight - stage.offsetHeight);
  scrollTo({ top: top + target, behavior: "instant" });
  schedule();
}
document
  .querySelectorAll("[data-jump]")
  .forEach((button) =>
    button.addEventListener("click", () => jumpTo(Number(button.dataset.jump))),
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
let returnFocus, returnScrollY = 0;
document.querySelectorAll("[data-video]").forEach((button) =>
  button.addEventListener("click", () => {
    returnFocus = button;
    returnScrollY = scrollY;
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
  scrollTo({ top: returnScrollY, behavior: "instant" });
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
