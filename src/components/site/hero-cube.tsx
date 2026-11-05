"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Live 3x3 glossy-black cube for hero A. Motion read from a 12s recording of the Resend hero
// (research/ref-video/resend-hero-12s.webm). Max 2026-11-05: layer turns only, no tumble, bob or pointer tilt.
// Max 2026-11-05: every outer tile is one of his skill logos (official files only, public/images/hero/icons/),
// so the cube reads as made of his skills; layer turns shuffle them. prefers-reduced-motion = still pose.
// full = the icon is itself a square tile (Adobe); otherwise it sits centered on a dark tile.
// size = drawn width on the 512 tile for centred icons; badge = official platform icon in the corner of a profile picture.
// stat = [number, label] drawn on a light tile with the platform icon (verified: research/cube-pieces-2026-11-05.md).
type Icon = { name: string; src: string; full?: boolean; photo?: boolean; size?: number; badge?: string; bg?: string; stat?: [string, string] };
const ICONS: Icon[] = [
  // Max 2026-11-05: only the software he uses (TikTok, YouTube, Instagram removed: platforms, not programs).
  // Topaz Video = the product icon from topazlabs.com/topaz-video (webflow CDN file 68af9737..._icon-topaz-video.svg).
  { name: "After Effects", src: "/images/hero/icons/after-effects.svg", full: true },
  { name: "Topaz Video", src: "/images/hero/icons/topaz-video.svg", full: true },
  { name: "DaVinci Resolve", src: "/images/hero/icons/davinci-resolve.png", size: 440, bg: "#1c1c20" },
  { name: "Premiere Pro", src: "/images/hero/icons/premiere-pro.svg", full: true },
  { name: "ElevenLabs", src: "/images/hero/icons/elevenlabs.svg", size: 260, bg: "#ffffff" },
  { name: "Blender", src: "/images/hero/icons/blender.svg", size: 420, bg: "#ffffff" },
  { name: "CapCut", src: "/images/hero/icons/capcut.svg", full: true },
  { name: "Audition", src: "/images/hero/icons/audition.svg", full: true },
  { name: "Higgsfield", src: "/images/hero/icons/higgsfield.png", full: true },
  { name: "Kling AI", src: "/images/hero/icons/kling-wordmark.png", size: 450 },
];

// Draws the logo; for tile-shaped icons the piece body takes the logo's own background colour,
// so the whole piece reads as that logo block, not a sticker on black plastic.
// Piece positions for ICONS in order; the start pose shows the +x, +y and +z sides.
// Brushed-metal sticker grain, read from the Resend cube tiles (research/ref-video/resend-cube-sheet.jpg):
// fine horizontal streaks that catch the light as the layers turn.
function brushedTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#8a8a8a";
  g.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y++) {
    const v = 110 + Math.floor(Math.random() * 60);
    g.fillStyle = `rgba(${v},${v},${v},0.55)`;
    g.fillRect(0, y, 256, 1);
  }
  return new THREE.CanvasTexture(c);
}

// ?cube=mono candidate: logos turned to greyscale so the cube stays monochrome like the reference.
function toMono(g: CanvasRenderingContext2D, body: THREE.MeshPhysicalMaterial) {
  const d = g.getImageData(0, 0, 512, 512);
  for (let i = 0; i < d.data.length; i += 4) {
    const l = 0.2126 * d.data[i] + 0.7152 * d.data[i + 1] + 0.0722 * d.data[i + 2];
    d.data[i] = d.data[i + 1] = d.data[i + 2] = 30 + l * 0.75;
  }
  g.putImageData(d, 0, 0);
  body.color.set(0x1b1b1e);
}

function iconTexture({ src, full, photo, size = 330, badge, bg, stat }: Icon, body: THREE.MeshPhysicalMaterial, mono = false) {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#111112";
  g.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(c);
  const im = new Image();
  im.onload = () => {
    if (stat) {
      // Light stat tile: platform icon top left, number, label. Whole piece takes the tile colour.
      g.fillStyle = "#ececee";
      g.fillRect(0, 0, 512, 512);
      body.color.set(0xececee);
      body.color.convertSRGBToLinear();
      const s0 = 96 / Math.max(im.naturalWidth || 1, im.naturalHeight || 1);
      g.drawImage(im, 52, 52, (im.naturalWidth || 96) * s0, (im.naturalHeight || 96) * s0);
      g.fillStyle = "#111112";
      g.textAlign = "left";
      g.textBaseline = "alphabetic";
      let px = 170;
      g.font = `600 ${px}px Inter, Helvetica, Arial, sans-serif`;
      while (g.measureText(stat[0]).width > 408 && px > 90) g.font = `600 ${(px -= 6)}px Inter, Helvetica, Arial, sans-serif`;
      g.fillText(stat[0], 50, 380);
      g.font = "500 58px Inter, Helvetica, Arial, sans-serif";
      g.fillStyle = "#55555a";
      g.fillText(stat[1], 54, 456);
    } else if (photo) {
      // Profile picture: centre-cropped to fill the tile; the body stays glossy black.
      const s = 512 / Math.min(im.naturalWidth || 1, im.naturalHeight || 1);
      const w = im.naturalWidth * s;
      const h = im.naturalHeight * s;
      g.drawImage(im, 256 - w / 2, 256 - h / 2, w, h);
      if (badge) {
        // Platform badge on a dark disc so the photo reads as that account (TikTok / YouTube).
        const bi = new Image();
        bi.onload = () => {
          g.fillStyle = "#0b0b0c";
          g.beginPath();
          g.arc(426, 426, 74, 0, Math.PI * 2);
          g.fill();
          const s2 = 96 / Math.max(bi.naturalWidth || 1, bi.naturalHeight || 1);
          const bw = (bi.naturalWidth || 96) * s2;
          const bh = (bi.naturalHeight || 96) * s2;
          g.drawImage(bi, 426 - bw / 2, 426 - bh / 2, bw, bh);
          tex.needsUpdate = true;
        };
        bi.src = badge;
      }
    } else if (full) {
      const h = 512 * ((im.naturalHeight || 1) / (im.naturalWidth || 1));
      g.clearRect(0, 0, 512, 512);
      g.drawImage(im, 0, (512 - h) / 2, 512, h);
      const [r, gr, b, a] = g.getImageData(60, 256, 1, 1).data;
      if (a > 200) {
        g.globalCompositeOperation = "destination-over";
        g.fillStyle = `rgb(${r},${gr},${b})`;
        g.fillRect(0, 0, 512, 512);
        g.globalCompositeOperation = "source-over";
        body.color.setRGB(r / 255, gr / 255, b / 255, THREE.SRGBColorSpace);
      }
    } else {
      // bg = the whole piece takes that colour (Max 2026-11-05: Blender must be the entire piece, not a sticker).
      if (bg) {
        g.fillStyle = bg;
        g.fillRect(0, 0, 512, 512);
        body.color.set(bg);
        body.color.convertSRGBToLinear();
      }
      const s = size / Math.max(im.naturalWidth || 1, im.naturalHeight || 1);
      const w = (im.naturalWidth || size) * s;
      const h = (im.naturalHeight || size) * s;
      g.drawImage(im, 256 - w / 2, 256 - h / 2, w, h);
    }
    if (mono) toMono(g, body);
    tex.needsUpdate = true;
  };
  im.src = src;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function HeroCube({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
    scene.environment = env;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, 3.35);
    const mono = new URLSearchParams(window.location.search).get("cube") === "mono";

    const mat = new THREE.MeshPhysicalMaterial({
      // Graphite satin body like the Resend cubelets, not glossy black plastic.
      // v9 (visual-critic vs Resend): glossier, darker, less ambient so the unlit faces sink into the page.
      // Max 2026-11-05: empty pieces grey, satin so they stop mirroring the env lights as white squares.
      color: 0x606067,
      roughness: 0.45,
      metalness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 0.6,
    });
    const brush = brushedTexture();
    const sticker = new THREE.MeshPhysicalMaterial({
      color: 0x6a6a71,
      map: brush,
      roughnessMap: brush,
      roughness: 0.5,
      metalness: 0.3,
      anisotropy: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 0.7,
    });
    const blank = new THREE.PlaneGeometry(0.28, 0.28);
    const geo = new RoundedBoxGeometry(0.321, 0.321, 0.321, 4, 0.016);
    const decal = new THREE.PlaneGeometry(0.265, 0.265);
    const disposables: { dispose(): void }[] = [geo, decal, mat, brush, sticker, blank];

    const tiles = ICONS.map((icon) => {
      const body = mat.clone();
      body.metalness = 0.1;
      const tex = iconTexture(icon, body, mono);
      // Emissive copy of the logo keeps it bright and true to its colours under the dark ACES grade; clearcoat adds the glint.
      const face = new THREE.MeshPhysicalMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: mono ? (icon.photo ? 0.3 : 0.15) : icon.photo ? 0.85 : 0.45, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.8 });
      disposables.push(tex, face, body);
      return { face, body };
    });
    const dirs: [number, number, number][] = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];

    const cube = new THREE.Group();
    const pieces: THREE.Mesh[] = [];
    // Max 2026-11-05: every face carries its own sticker and no app is ever shown twice. 11 apps sit on the
    // three visible faces (right, top, front), the rest wait off screen; each turn swaps about two in.
    type Sticker = { mesh: THREE.Mesh; piece: THREE.Mesh; n: THREE.Vector3; app: number; ext: boolean };
    const stickers: Sticker[] = [];
    for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x * 0.333, y * 0.333, z * 0.333);
      for (const [dx, dy, dz] of dirs) {
        const ext = !((dx && dx !== x) || (dy && dy !== y) || (dz && dz !== z));
        const p = new THREE.Mesh(blank, sticker);
        p.position.set(dx * 0.1615, dy * 0.1615, dz * 0.1615);
        m.add(p);
        stickers.push({ mesh: p, piece: m, n: new THREE.Vector3(dx, dy, dz), app: -1, ext });
      }
      cube.add(m);
      pieces.push(m);
    }
    const key3 = (v: THREE.Vector3) => `${Math.round(v.x)},${Math.round(v.y)},${Math.round(v.z)}`;
    const VIS = ["1,0,0", "0,1,0", "0,0,1"];
    // Upright direction per visible face as the camera sees it (top face: away from the viewer).
    const UP: Record<string, THREE.Vector3> = { "1,0,0": new THREE.Vector3(0, 1, 0), "0,0,1": new THREE.Vector3(0, 1, 0), "0,1,0": new THREE.Vector3(0, 0, -1) };
    const faceOf = (s: Sticker, q: THREE.Quaternion) => key3(s.n.clone().applyQuaternion(q));
    // Max 2026-11-05: an app owns its whole piece: body colour plus its logo on every face, each upright for the viewer.
    // Local rotation that puts the logo upright for the viewer on the side it faces once its piece has quaternion q.
    const orient = (t: Sticker, q: THREE.Quaternion) => {
      const N = t.n.clone().applyQuaternion(q).round();
      const U = UP[key3(N)] ?? (Math.abs(N.y) > 0.5 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0));
      const world = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3().crossVectors(U, N), U, N));
      return q.clone().invert().multiply(world);
    };
    const setApp = (s: Sticker, app: number, q: THREE.Quaternion) => {
      s.piece.material = app < 0 ? mat : tiles[app].body;
      for (const t of stickers) {
        if (t.piece !== s.piece) continue;
        t.app = app;
        t.mesh.material = app < 0 ? sticker : tiles[app].face;
        t.mesh.geometry = app < 0 ? blank : decal;
        t.mesh.visible = app >= 0 || t.ext;
        t.mesh.quaternion.copy(orient(t, q));
      }
    };
    for (const s of stickers) setApp(s, -1, s.piece.quaternion);
    // Start layout: AE on the front corner, logos spread so no two touch on the same face.
    const START: [number, number, number, string][] = [
      [1, 1, 1, "0,0,1"], [-1, 1, 1, "0,0,1"], [0, 0, 1, "0,0,1"], [-1, -1, 1, "0,0,1"], [1, -1, 1, "0,0,1"],
      [-1, 1, -1, "0,1,0"], [0, 1, 0, "0,1,0"], [1, 1, -1, "0,1,0"],
      [1, 0, 0, "1,0,0"], [1, -1, -1, "1,0,0"], [1, 1, 0, "1,0,0"],
    ];
    START.forEach(([x, y, z, f], app) => {
      const s = stickers.find((t) => key3(t.piece.position.clone().divideScalar(0.333)) === `${x},${y},${z}` && key3(t.n) === f);
      if (s && app < ICONS.length) setApp(s, app, s.piece.quaternion);
    });
    const tilt = new THREE.Group();
    tilt.rotation.set(0.45, -0.6, 0);
    tilt.add(cube);
    scene.add(tilt);

    // One hard key from the upper left / front (visual-critic read of the Resend frames), low rim.
    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(-2.5, 3, 3);
    const rim = new THREE.DirectionalLight(0xffffff, 1.2);
    rim.position.set(2.5, 3, -2.5);
    scene.add(key, rim);

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(el);

    // Layer turn: one slice of 9 pieces rotates 90 degrees, then is baked back into the cube.
    const pivot = new THREE.Group();
    cube.add(pivot);
    const axes = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    const keys = ["x", "y", "z"] as const;
    let turn: { axis: THREE.Vector3; angle: number; t: number; spin: { m: THREE.Mesh; from: THREE.Quaternion; to: THREE.Quaternion }[] } | null = null;
    let wait = 2.4;
    let step = 0;
    let last = "";
    const seen = ICONS.map(() => 0);
    const cell = (p: THREE.Mesh) => p.position.clone().divideScalar(0.333).round();
    const shown = (v: THREE.Vector3) => v.x === 1 || v.y === 1 || v.z === 1;
    const startTurn = () => {
      step++;
      const shownNow = stickers.filter((s) => s.app >= 0 && VIS.includes(faceOf(s, s.piece.quaternion)));
      shownNow.forEach((s) => (seen[s.app] = step));
      // Pieces fully out of view drop their app, so it can come back elsewhere.
      for (const s of stickers) if (s.app >= 0 && !shown(cell(s.piece))) setApp(s, -1, s.piece.quaternion);
      // Only x / y turns of the middle or far layer: turned rows stay upright and the right/top faces never spin in place.
      // Each candidate move is scored on how many logos leave and how many new apps it can bring in (target 2 / 2).
      type Plan = { a: number; layer: number; angle: number; r: THREE.Quaternion; slots: Sticker[]; pool: number[]; score: number };
      const plans: Plan[] = [];
      for (const a of [0, 1]) for (const layer of [0, -1]) for (const d of [1, -1]) {
        if (last === `${a},${layer},${-d}`) continue;
        const r = new THREE.Quaternion().setFromAxisAngle(axes[a], (d * Math.PI) / 2);
        const inL = (p: THREE.Mesh) => Math.round(p.position[keys[a]] / 0.333) === layer;
        const qA = (p: THREE.Mesh) => (inL(p) ? r.clone().multiply(p.quaternion) : p.quaternion.clone());
        const cA = (p: THREE.Mesh) => (inL(p) ? cell(p).applyQuaternion(r).round() : cell(p));
        const logos = new Set(stickers.filter((t) => t.app >= 0 && VIS.includes(faceOf(t, qA(t.piece)))).map((t) => t.app));
        const used = new Set(stickers.filter((t) => t.app >= 0 && shown(cA(t.piece))).map((t) => t.app));
        const out = new Set(shownNow.map((t) => t.app)).size - logos.size;
        // New apps only land on pieces that were fully hidden, so no colour pops on a piece already in view.
        const slots = pieces
          .filter((p) => !shown(cell(p)) && shown(cA(p)))
          .map((p) => stickers.filter((t) => t.piece === p && VIS.includes(faceOf(t, qA(p)))).sort(() => Math.random() - 0.5)[0])
          .filter(Boolean);
        const pool = ICONS.map((_, i) => i).filter((i) => !used.has(i)).sort((i, j) => seen[i] - seen[j]);
        const add = Math.min(slots.length, pool.length, Math.max(0, ICONS.length - 2 - logos.size));
        plans.push({ a, layer, angle: (d * Math.PI) / 2, r, slots: slots.slice(0, add), pool, score: Math.abs(add - 2) * 2 + Math.abs(out - 2) });
      }
      const best = Math.min(...plans.map((p) => p.score));
      const pick = plans.filter((p) => p.score === best);
      const { a, layer, angle, r, slots, pool } = pick[Math.floor(Math.random() * pick.length)];
      last = `${a},${layer},${Math.sign(angle)}`;
      const inLayer = (p: THREE.Mesh) => Math.round(p.position[keys[a]] / 0.333) === layer;
      slots.forEach((t, k) => setApp(t, pool[k], inLayer(t.piece) ? r.clone().multiply(t.piece.quaternion) : t.piece.quaternion.clone()));
      pivot.rotation.set(0, 0, 0);
      pivot.updateMatrixWorld();
      for (const p of pieces) if (inLayer(p)) pivot.attach(p);
      // Logos on the turning layer rotate on their side during the turn, so they land upright with no snap.
      const spin = stickers.filter((t) => t.app >= 0 && inLayer(t.piece)).map((t) => ({ m: t.mesh, from: t.mesh.quaternion.clone(), to: orient(t, r.clone().multiply(t.piece.quaternion)) }));
      turn = { axis: axes[a], angle, t: 0, spin };
    };
    const endTurn = () => {
      pivot.updateMatrixWorld();
      for (const p of [...pivot.children]) {
        cube.attach(p);
        p.position.set(Math.round(p.position.x / 0.333) * 0.333, Math.round(p.position.y / 0.333) * 0.333, Math.round(p.position.z / 0.333) * 0.333);
        const e = new THREE.Euler().setFromQuaternion(p.quaternion);
        const snap = (v: number) => Math.round(v / (Math.PI / 2)) * (Math.PI / 2);
        p.rotation.set(snap(e.x), snap(e.y), snap(e.z));
      }
      pivot.rotation.set(0, 0, 0);
      // Every logo is squared back to upright for the viewer after each turn.
      for (const p of pieces) {
        const t = stickers.find((o) => o.piece === p && o.app >= 0);
        if (t) setApp(t, t.app, p.quaternion);
      }
      turn = null;
      wait = 2.6 + Math.random() * 1.2;
    };

    // Tool list click (HeroToolList): the piece carrying that app comes forward for a few seconds, turns pause.
    // An app that is off screen is put on a visible piece first (grey pieces before app pieces).
    let focus: { p: THREE.Mesh; base: THREE.Vector3; dir: THREE.Vector3; k: number; hold: number } | null = null;
    let want = -1;
    const onFocus = (e: Event) => (want = (e as CustomEvent<number>).detail);
    window.addEventListener("cube-focus", onFocus);
    const appOf = (p: THREE.Mesh) => stickers.find((t) => t.piece === p)!.app;
    const sides = (p: THREE.Mesh) => stickers.filter((t) => t.piece === p && VIS.includes(faceOf(t, p.quaternion))).length;
    const release = () => {
      if (!focus) return;
      focus.p.position.copy(focus.base);
      focus.p.scale.setScalar(1);
      focus = null;
    };
    const applyFocus = () => {
      const app = want;
      want = -1;
      release();
      let p = pieces.find((q) => sides(q) > 0 && appOf(q) === app);
      if (!p) {
        for (const t of stickers) if (t.app === app) setApp(t, -1, t.piece.quaternion);
        p = pieces.filter((q) => sides(q) > 0).sort((a, b) => Number(appOf(a) >= 0) - Number(appOf(b) >= 0) || sides(b) - sides(a))[0];
        setApp(stickers.find((t) => t.piece === p)!, app, p.quaternion);
      }
      focus = { p, base: p.position.clone(), dir: cell(p).normalize(), k: 0, hold: 4 };
    };

    const clock = new THREE.Clock();
    let raf = 0;
    let first = true;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible && !first) return;
      if (!reduce) {
        if (turn) {
          turn.t = Math.min(turn.t + dt / 0.9, 1);
          pivot.quaternion.setFromAxisAngle(turn.axis, turn.angle * ease(turn.t));
          for (const k of turn.spin) k.m.quaternion.slerpQuaternions(k.from, k.to, ease(turn.t));
          if (turn.t >= 1) endTurn();
        } else if (!focus && (wait -= dt) <= 0) startTurn();
      }
      if (want >= 0 && !turn) applyFocus();
      if (focus) {
        focus.hold -= dt;
        focus.k += ((focus.hold > 0 ? 1 : 0) - focus.k) * (reduce ? 1 : Math.min(1, dt * 8));
        focus.p.position.copy(focus.base).addScaledVector(focus.dir, 0.1 * focus.k);
        focus.p.scale.setScalar(1 + 0.12 * focus.k);
        if (focus.hold <= 0 && focus.k < 0.01) release();
      }
      renderer.render(scene, camera);
      if (first) {
        first = false;
        setReady(true);
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("cube-focus", onFocus);
      ro.disconnect();
      io.disconnect();
      disposables.forEach((d) => d.dispose());
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={className}>
      <div ref={box} className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

// Liquid-glass surface, web approximation per taste-skill (Master Brain _install/skills/taste-skill/SKILL.md l.356 + Appendix C):
// translucent fill, backdrop blur 8px (Cuberto frosted pill, Craft/Cuberto-Grade UI Micro-Mechanics CARD), 1px border-white/10, inset top highlight, solid fallback under prefers-reduced-transparency.
export const glass =
  "border border-white/10 bg-gradient-to-b from-white/[0.12] to-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[8px] [@media(prefers-reduced-transparency:reduce)]:bg-of-panel";

// Max 2026-11-05: list of every tool beside the cube; a click brings that tool's piece forward.
export function HeroToolList({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(-1);
  useEffect(() => {
    if (on < 0) return;
    const id = window.setTimeout(() => setOn(-1), 4000);
    return () => window.clearTimeout(id);
  }, [on]);
  return (
    <ul className={className} aria-label="Tools I use">
      {ICONS.map((icon, i) => (
        <li key={icon.name}>
          <button
            type="button"
            aria-pressed={on === i}
            onClick={() => {
              setOn(i);
              window.dispatchEvent(new CustomEvent("cube-focus", { detail: i }));
            }}
            className={`${glass} inline-flex h-9 items-center rounded-[209px] px-4 text-[14px] leading-[20px] transition-colors ${on === i ? "text-of-dark ring-1 ring-white/40" : "text-of-grey hover:text-of-dark"}`}
          >
            {icon.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
