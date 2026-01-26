// main.js — Fully corrected version (Boon Ong edition)

import * as THREE from "three";
import { OrbitControls } from "./js/OrbitControls.js";
import { createCamera } from "./js/camera.js";

/* ======================================
   1) Load header + body
====================================== */
async function loadLayout() {
  const headerHTML = await fetch("header.html").then(r => r.text());
  document.getElementById("header-container").innerHTML = headerHTML;

  function updateHeaderTime() {
    const el = document.getElementById("header-datetime");
    if (el) el.textContent = new Date().toLocaleString();
  }
  updateHeaderTime();
  setInterval(updateHeaderTime, 1000);

  const bodyHTML = await fetch("body.html").then(r => r.text());
  document.getElementById("body-container").innerHTML = bodyHTML;
}
await loadLayout();

/* ======================================
   2) DOM hooks
====================================== */
const canvas = document.getElementById("three-canvas");
const container = canvas.parentElement;

const xIn = document.getElementById("widthX");
const yIn = document.getElementById("heightY");
const zIn = document.getElementById("depthZ");

const resetBtn    = document.getElementById("resetBtn");
const recenterBtn = document.getElementById("recenterBtn");   // NEW BUTTON

/* ======================================
   3) Renderer
====================================== */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ======================================
   4) Scene + Camera + Controls
====================================== */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdedede);   // LIGHT GREY BACKGROUND

const camera = createCamera(renderer, container);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Stable OrbitControl limits
controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = Math.PI * 0.1;
controls.maxPolarAngle = Math.PI * 0.9;

controls.minAzimuthAngle = -Math.PI * 0.85;
controls.maxAzimuthAngle =  Math.PI * 0.85;

/* ======================================
   5) Cube + Material
====================================== */
const cubeGeom = new THREE.BoxGeometry(1, 1, 1);
let cubeMat;

try {
  const tex = new THREE.TextureLoader().load("./textures/plywood.webp");
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  cubeMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 });
} catch {
  cubeMat = new THREE.MeshNormalMaterial();
}

const cube = new THREE.Mesh(cubeGeom, cubeMat);
scene.add(cube);

/* ======================================
   6) CORRECTED fitCameraToObject()
====================================== */
function fitCameraToObject(object, padding = 1.25) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const radius = 0.5 * Math.max(size.x, size.y, size.z);
  const fitRadius = radius * padding;

  // CRITICAL FIX: reset orientation before computing direction
  camera.lookAt(center);

  const fov = THREE.MathUtils.degToRad(camera.fov);
  const aspect = camera.aspect;

  const distV = fitRadius / Math.sin(fov / 2);
  const distH = fitRadius / Math.sin(Math.atan(Math.tan(fov / 2) * aspect));
  const distance = Math.max(distV, distH);

  // CRITICAL FIX: get correct forward direction AFTER lookAt
  const dir = new THREE.Vector3(0, 0, 1)
    .applyQuaternion(camera.quaternion)
    .normalize();

  camera.position.copy(center).addScaledVector(dir, distance);

  camera.near = Math.max(0.01, distance - fitRadius * 2);
  camera.far  = distance + fitRadius * 2;
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.update();
}

// Initial framing
fitCameraToObject(cube);

/* ======================================
   7) Resizing
====================================== */
function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h, false);
}

new ResizeObserver(resize).observe(container);
window.addEventListener("resize", resize);
resize();

/* ======================================
   8) Scaling + auto-fit
====================================== */
function applyScale() {
  const x = Math.max(0.1, parseFloat(xIn?.value) || 1);
  const y = Math.max(0.1, parseFloat(yIn?.value) || 1);
  const z = Math.max(0.1, parseFloat(zIn?.value) || 1);

  cube.scale.set(x, y, z);

  if (cubeMat.map && cubeMat.map.repeat) {
    cubeMat.map.repeat.set(Math.max(1, x), Math.max(1, y));
    cubeMat.map.needsUpdate = true;
  }

  // CRITICAL FIX: re-fit camera after any size change
  fitCameraToObject(cube);
}

["input", "change"].forEach(evt => {
  xIn?.addEventListener(evt, applyScale);
  yIn?.addEventListener(evt, applyScale);
  zIn?.addEventListener(evt, applyScale);
});

/* ======================================
   9) Reset & Center View buttons
====================================== */
resetBtn?.addEventListener("click", () => {
  xIn.value = yIn.value = zIn.value = "1";
  applyScale();
  fitCameraToObject(cube);
});

// NEW: recenter button that always works
recenterBtn?.addEventListener("click", () => {
  fitCameraToObject(cube);
});

/* ======================================
   10) Animation Loop
====================================== */
const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();
  cube.rotation.x = t * 0.6;
  cube.rotation.y = t * 0.8;

  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();