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
  CatmullRomCurve3,
  Vector3,
  TubeGeometry,
  TorusGeometry,
  LinearFilter,
  Raycaster,
  Vector2,
} from "three";
import { smoothstep, frameLayout } from "./scroll-scene.mjs";

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
    poster = await loader.loadAsync(container.dataset.poster);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  poster.colorSpace = SRGBColorSpace;
  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;
  videoTexture.minFilter = LinearFilter;
  const surface = new MeshBasicMaterial({ map: poster, toneMapped: false });
  const screen = new Mesh(new PlaneGeometry(16 / 9, 1), surface);
  screen.position.z = 0.024;
  screenGroup.add(screen);
  const chassis = new Mesh(
    new BoxGeometry(16 / 9 + 0.032, 1 + 0.032, 0.032),
    new MeshBasicMaterial({ color: "#44443b" }),
  );
  screenGroup.add(chassis);
  const cableMaterial = new MeshBasicMaterial({
    color: "#b15c3c",
    transparent: true,
    opacity: 0.22,
  });
  const path = new CatmullRomCurve3([
    new Vector3(-5, -1.6, -1),
    new Vector3(-3, 1.3, -0.8),
    new Vector3(-1, -1.4, -0.9),
    new Vector3(2, 1.4, -1),
    new Vector3(5, -0.7, -1),
  ]);
  const cable = new Mesh(
    new TubeGeometry(path, 200, 0.01, 8, false),
    cableMaterial,
  );
  group.add(cable);
  const halo = new Mesh(
    new TorusGeometry(1.25, 0.008, 6, 120),
    new MeshBasicMaterial({
      color: "#e95830",
      transparent: true,
      opacity: 0.22,
    }),
  );
  halo.position.set(0, 0, -2);
  halo.rotation.x = 0.6;
  group.add(halo);
  const cards = [];
  const cardSources = container.dataset.components.split(",");
  // Contextual components enter at their own chapter, never random decorative shapes.
  const geometry = new PlaneGeometry(1.2, 1);
  const cardLoads = cardSources.map(async (src, index) => {
    const texture = await loader.loadAsync(src);
    texture.colorSpace = SRGBColorSpace;
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      toneMapped: false,
    });
    const mesh = new Mesh(geometry, material);
    mesh.userData.index = index;
    group.add(mesh);
    cards[index] = mesh;
  });
  Promise.allSettled(cardLoads).then(invalidate);
  const pointer = new Vector2(),
    raycaster = new Raycaster();
  let width = 1,
    height = 1,
    unit = 1,
    state = { open: 0, progress: 0, phase: 0, chapter: 0, turn: 0 },
    active = true,
    raf = 0,
    disposed = false,
    failed = false;
  let px = 0,
    py = 0,
    tx = 0,
    ty = 0,
    hover = -1;
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
    if (disposed || !active) return;
    px += (tx - px) * 0.09;
    py += (ty - py) * 0.09;
    const layout = frameLayout(width, height, state.open);
    const frameHeight = (layout.width * 9) / 16;
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
      surface.map = videoTexture;
      surface.needsUpdate = true;
    }
    cable.position.y = screenGroup.position.y;
    cable.rotation.z = state.progress * 0.2 - 0.05;
    cable.scale.set(1 + state.open * 0.1, 0.7, 1);
    halo.rotation.z = state.progress * Math.PI;
    halo.scale.setScalar(1.2 + state.open * 0.55);
    cards.forEach((card, index) => {
      const moment = [0.35, 1.25, 1.65, 2.45, 3.5, 4.5][index];
      const distance = Math.abs(state.chapter + state.phase - moment);
      const presence =
        (1 - smoothstep(0.02, 0.28, distance)) * (layout.mobile ? 0 : 1);
      card.material.opacity = presence * 0.94;
      card.visible = presence > 0.002;
      const side = index % 2 === 0 ? -1 : 1;
      card.position.set(
        side * (layout.width / (2 * unit) + 0.4 + (1 - presence) * 0.35) +
          px * 0.05,
        screenGroup.position.y + (index % 2 === 0 ? 0.48 : -0.65) - py * 0.04,
        0.25,
      );
      const scale = (index === 4 ? 0.68 : 0.64) * (hover === index ? 1.07 : 1);
      card.scale.setScalar(scale);
      card.rotation.set(
        0.05 + py * 0.02,
        side * -0.2 + px * 0.08,
        side * (0.1 + (1 - presence) * 0.14),
      );
    });
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
    pointer.set(tx, -ty);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster
      .intersectObjects(cards.filter(Boolean))
      .find((result) => result.object.visible);
    hover = hit ? hit.object.userData.index : -1;
    invalidate();
  };
  const resetPointer = () => {
    tx = ty = 0;
    hover = -1;
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
  video.addEventListener("seeked", invalidate);
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
      video.removeEventListener("seeked", invalidate);
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
