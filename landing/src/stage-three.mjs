import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  BoxGeometry,
  TextureLoader,
  VideoTexture,
  SRGBColorSpace,
  LinearFilter,
} from "three";
import { frameLayout } from "./scroll-scene.mjs";

export async function createStage({ container, video, onFail, onReady }) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: innerWidth >= 700,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, innerWidth < 700 ? 1 : 1.5),
  );
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 80);
  camera.position.z = 8;
  const group = new Group();
  scene.add(group);
  const screenGroup = new Group();
  group.add(screenGroup);
  const loader = new TextureLoader();
  let poster;
  try {
    poster = await loader.loadAsync(innerWidth < 700 ? container.dataset.mobilePoster : container.dataset.poster);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  poster.colorSpace = SRGBColorSpace;
  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;
  videoTexture.minFilter = LinearFilter;
  const surface = new MeshBasicMaterial({ map: poster, toneMapped: false });
  let aspect = video.videoWidth ? video.videoWidth / video.videoHeight : innerWidth < 700 ? 1 : 16 / 9;
  const screen = new Mesh(new PlaneGeometry(aspect, 1), surface);
  screen.position.z = 0.024;
  screenGroup.add(screen);
  const chassis = new Mesh(
    new BoxGeometry(aspect + 0.016, 1 + 0.016, 0.016),
    new MeshBasicMaterial({ color: "#444444" }),
  );
  screenGroup.add(chassis);
  let width = 1,
    height = 1,
    unit = 1,
    state = null,
    active = true,
    raf = 0,
    disposed = false,
    failed = false;
  let px = 0,
    py = 0,
    tx = 0,
    ty = 0;
  container.append(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  function fail() {
    failed = true;
    active = false;
    cancelAnimationFrame(raf);
    container.dataset.ready = "false";
    onFail();
  }
  renderer.domElement.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    fail();
  });
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    unit = height / (2 * Math.tan((17 * Math.PI) / 180) * 8);
    invalidate();
  }
  function paint() {
    raf = 0;
    // Keep the native surface until both the restored scroll pose and its
    // decoded video frame are ready; otherwise a deep reload flashes chapter 1.
    if (disposed || !active || !state || video.readyState < 2 || video.seeking)
      return;
    px += (tx - px) * 0.09;
    py += (ty - py) * 0.09;
    const decodedAspect = video.videoWidth / video.videoHeight;
    if (decodedAspect && decodedAspect !== aspect) {
      aspect = decodedAspect;
      screen.geometry.dispose();
      chassis.geometry.dispose();
      screen.geometry = new PlaneGeometry(aspect, 1);
      chassis.geometry = new BoxGeometry(aspect + 0.016, 1 + 0.016, 0.016);
    }
    const layout = frameLayout(width, height, state.open, aspect);
    const frameHeight = layout.width / aspect;
    screenGroup.scale.setScalar(frameHeight / unit);
    screenGroup.position.set(0, (height / 2 - layout.y) / unit, 0);
    screenGroup.rotation.set(
      (layout.mobile ? 0 : -0.035 * (1 - state.open)) + py * 0.018,
      (layout.mobile ? 0 : -0.075 * (1 - state.open)) +
        px * 0.025 +
        state.turn * 0.3,
      -0.007 * (1 - state.open),
    );
    camera.position.x = px * 0.035;
    camera.position.y = -py * 0.02;
    camera.lookAt(0, 0, 0);
    if (video.readyState >= 2 && surface.map !== videoTexture) {
      // A restored, paused video may have decoded before Three.js subscribed
      // to requestVideoFrameCallback. Upload that existing frame explicitly.
      videoTexture.needsUpdate = true;
      surface.map = videoTexture;
      surface.needsUpdate = true;
    }
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
      return;
    }
    if (container.dataset.ready !== "true") {
      container.dataset.ready = "true";
      onReady();
    }
    if (Math.abs(px - tx) + Math.abs(py - ty) > 0.002) invalidate();
  }
  function invalidate() {
    if (!disposed && active && !raf) raf = requestAnimationFrame(paint);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  const onPointer = (event) => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || !active)
      return;
    const rect = container.getBoundingClientRect();
    tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    invalidate();
  };
  const resetPointer = () => {
    tx = ty = 0;
    invalidate();
  };
  container.addEventListener("pointermove", onPointer, { passive: true });
  container.addEventListener("pointerleave", resetPointer);
  let frameCallback;
  const onVideoFrame = () => {
    invalidate();
    if (!disposed && video.requestVideoFrameCallback)
      frameCallback = video.requestVideoFrameCallback(onVideoFrame);
  };
  if (video.requestVideoFrameCallback)
    frameCallback = video.requestVideoFrameCallback(onVideoFrame);
  const refreshDecodedFrame = () => {
    videoTexture.needsUpdate = true;
    invalidate();
  };
  video.addEventListener("seeked", refreshDecodedFrame);
  video.addEventListener("timeupdate", invalidate);
  resize();
  return {
    update(next) {
      state = next;
      invalidate();
    },
    setActive(next) {
      active = next && !failed;
      if (active) invalidate();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      if (frameCallback) video.cancelVideoFrameCallback(frameCallback);
      observer.disconnect();
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", resetPointer);
      video.removeEventListener("seeked", refreshDecodedFrame);
      video.removeEventListener("timeupdate", invalidate);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) {
          object.material.map?.dispose();
          object.material.dispose();
        }
      });
      poster.dispose();
      videoTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
