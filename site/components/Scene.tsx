"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { sceneState } from "@/components/scene/store";

const CHAMPAGNE = "#C8A24C";
const CHAMP_HI = "#E4C878";
const BORDEAUX = "#7A2233";
const PEARL = "#F6F4EF";
const GRAPHITE = "#1B1D24";

const CHIP_COUNT = 8;
const DAMP = 3.2; // lerp lambda — softer = slower settles

type ChipTarget = {
  pos: [number, number, number];
  scale: number;
  opacity: number;
  ignite: number; // 0..1 emissive ramp on the body
};

const HIDDEN: ChipTarget = { pos: [0, 0, -2], scale: 0.001, opacity: 0, ignite: 0 };

/**
 * Target layout per chapter (docs/12 §3, condensed to the built states):
 * hero stack → intro recede → brands orbit → journey compress →
 * timeline receding spine (active role leads) → achievements ignite →
 * quiet through the essay chapters → contact resolves to one chip.
 * `t` is elapsed time so orbits can revolve inside a static target map.
 */
function chipTarget(chapter: string, i: number, t: number, roleIndex: number): ChipTarget {
  switch (chapter) {
    // hero & intro stay chip-free — one subject per act (the ring owns
    // the opening frame); the chips make their entrance at Brands
    case "hero":
    case "intro":
      return HIDDEN;
    case "brands": {
      if (i >= 6) return HIDDEN;
      const a = (i / 6) * Math.PI * 2 + t * 0.12;
      return {
        pos: [Math.cos(a) * 2.9 + 0.4, Math.sin(a) * 1.6, -0.8],
        scale: 0.55,
        opacity: 0.85,
        ignite: 0,
      };
    }
    case "journey": {
      if (i >= 6) return HIDDEN;
      const a = (i / 6) * Math.PI * 2;
      return {
        pos: [Math.cos(a) * 0.3, Math.sin(a) * 0.2 - 0.4, -1],
        scale: 0.2,
        opacity: 0.35,
        ignite: 0,
      };
    }
    case "timeline": {
      if (i >= 7) return HIDDEN;
      const active = i === roleIndex;
      return {
        pos: [-2.4 + i * 1.05, -0.4 + (active ? 0.25 : 0), -0.4 - i * 0.5],
        scale: active ? 0.8 : 0.5,
        opacity: active ? 1 : 0.5,
        ignite: active ? 0.5 : 0,
      };
    }
    case "achievements": {
      if (i >= 6) return HIDDEN;
      const col = i % 3;
      const row = Math.floor(i / 3);
      const lit = i === 1 || i === 3 || i === 5;
      return {
        pos: [(col - 1) * 2.2 + 0.6, row * 1.6 - 0.4 + (lit ? 0.35 : 0), -1.2],
        scale: lit ? 0.7 : 0.45,
        opacity: 0.75,
        ignite: lit ? 1 : 0,
      };
    }
    case "contact":
      if (i === 0) return { pos: [0, -0.2, 0.6], scale: 1.05, opacity: 1, ignite: 0.35 };
      return HIDDEN;
    default:
      // essay chapters (work…about): the scene rests
      return HIDDEN;
  }
}

/** ring/ball/pointer only exist for the hero (and faintly the intro) */
function heroDressing(chapter: string): number {
  if (chapter === "hero") return 1;
  if (chapter === "intro") return 0.15;
  return 0;
}

/** Soft radial texture for additive glow sprites (fake bloom, alpha-safe). */
function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.28)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/** One set of chip geometries shared by all 8 chips (24→3 geometries). */
let chipGeos: {
  body: THREE.CylinderGeometry;
  rim: THREE.TorusGeometry;
  spot: THREE.BoxGeometry;
} | null = null;
function getChipGeos() {
  chipGeos ??= {
    body: new THREE.CylinderGeometry(0.42, 0.42, 0.11, 48),
    rim: new THREE.TorusGeometry(0.36, 0.018, 8, 48),
    spot: new THREE.BoxGeometry(0.1, 0.112, 0.06),
  };
  return chipGeos;
}

/**
 * A casino chip with real presence: clearcoat ceramic body, polished gold
 * rim, pearl edge-spots — reads as jewellery under the studio env map.
 */
function makeChip(): {
  group: THREE.Group;
  body: THREE.MeshPhysicalMaterial;
  rim: THREE.MeshPhysicalMaterial;
  spots: THREE.MeshPhysicalMaterial;
  spin: number;
} {
  const group = new THREE.Group();
  const body = new THREE.MeshPhysicalMaterial({
    color: GRAPHITE,
    metalness: 0.1,
    roughness: 0.32,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
    transparent: true,
  });
  body.emissive = new THREE.Color(BORDEAUX);
  body.emissiveIntensity = 0;
  const rim = new THREE.MeshPhysicalMaterial({
    color: CHAMPAGNE,
    emissive: new THREE.Color(CHAMPAGNE),
    emissiveIntensity: 0.22,
    metalness: 1,
    roughness: 0.18,
    transparent: true,
  });
  const spots = new THREE.MeshPhysicalMaterial({
    color: PEARL,
    metalness: 0.2,
    roughness: 0.3,
    clearcoat: 0.8,
    transparent: true,
  });

  const geos = getChipGeos();
  const bodyMesh = new THREE.Mesh(geos.body, body);
  const rimTop = new THREE.Mesh(geos.rim, rim);
  rimTop.rotation.x = Math.PI / 2;
  rimTop.position.y = 0.056;
  const rimBottom = rimTop.clone();
  rimBottom.position.y = -0.056;
  group.add(bodyMesh, rimTop, rimBottom);

  // six pearl edge spots, like a real chip
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2;
    const spot = new THREE.Mesh(geos.spot, spots);
    spot.position.set(Math.cos(a) * 0.41, 0, Math.sin(a) * 0.41);
    spot.rotation.y = -a;
    group.add(spot);
  }

  group.rotation.x = Math.PI / 2.4;
  return { group, body, rim, spots, spin: 0.35 + Math.random() * 0.5 };
}

function Tokens() {
  const { viewport } = useThree();
  const chips = useMemo(() => Array.from({ length: CHIP_COUNT }, makeChip), []);
  const igniteColor = useMemo(() => new THREE.Color(BORDEAUX), []);
  const baseColor = useMemo(() => new THREE.Color(GRAPHITE), []);
  const booted = useRef(false);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const { chapter, roleIndex } = sceneState;
    const squeeze = Math.min(1, viewport.width / 8.5);
    // first frame: teleport chips straight to their opening targets — no
    // visible damp-in from the origin across the hero copy
    if (!booted.current) {
      chips.forEach(({ group, body, rim, spots }, i) => {
        const tg = chipTarget(chapter, i, t, roleIndex);
        group.position.set(tg.pos[0] * squeeze, tg.pos[1], tg.pos[2]);
        group.scale.setScalar(tg.scale * squeeze);
        body.opacity = rim.opacity = spots.opacity = tg.opacity;
      });
      booted.current = true;
      return;
    }
    chips.forEach(({ group, body, rim, spots, spin }, i) => {
      const target = chipTarget(chapter, i, t, roleIndex);
      group.position.x = THREE.MathUtils.damp(group.position.x, target.pos[0] * squeeze, DAMP, delta);
      group.position.y = THREE.MathUtils.damp(group.position.y, target.pos[1] + Math.sin(t * 0.7 + i * 1.7) * 0.05, DAMP, delta);
      group.position.z = THREE.MathUtils.damp(group.position.z, target.pos[2], DAMP, delta);
      const s = THREE.MathUtils.damp(group.scale.x, target.scale * squeeze, DAMP, delta);
      group.scale.setScalar(s);
      const op = THREE.MathUtils.damp(body.opacity, target.opacity, DAMP, delta);
      body.opacity = rim.opacity = spots.opacity = op;
      // ignite: body blushes bordeaux and emits
      const ig = THREE.MathUtils.damp(body.emissiveIntensity, target.ignite * 0.9, DAMP, delta);
      body.emissiveIntensity = ig;
      body.color.lerpColors(baseColor, igniteColor, Math.min(1, ig));
      group.visible = body.opacity > 0.02;
      // slow individual tumble, each chip with its own cadence — not a spin
      group.rotation.z += delta * 0.1 * spin;
      group.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3 + i) * 0.06;
    });
  });

  return (
    <>
      {chips.map((c, i) => (
        <primitive key={i} object={c.group} />
      ))}
    </>
  );
}

/** Hero-only dressing: segmented roulette ring, gem pointer, orbiting ball. */
function HeroDressing() {
  const group = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Sprite>(null);
  const mats = useRef<(THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial | THREE.SpriteMaterial)[]>([]);
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const segments = useMemo(() => Array.from({ length: 36 }, (_, i) => i), []);
  const arc = (Math.PI * 2) / 36;

  useFrame(({ clock }, delta) => {
    const vis = heroDressing(sceneState.chapter);
    if (ring.current) {
      // barely-moving: grandeur reads at watch-commercial speed
      ring.current.rotation.z += delta * 0.028;
      // gentle tilt so the metal catches the studio light like a watch face
      ring.current.rotation.x = Math.sin(clock.elapsedTime * 0.13) * 0.17;
      ring.current.rotation.y = Math.cos(clock.elapsedTime * 0.1) * 0.13;
    }
    if (ball.current) {
      const bt = clock.elapsedTime * 0.5;
      ball.current.position.set(Math.cos(bt) * 1.45, Math.sin(bt) * 1.45, 0.12);
    }
    for (const m of mats.current) {
      const targetOp = m instanceof THREE.SpriteMaterial ? vis * 0.5 : vis;
      m.opacity = THREE.MathUtils.damp(m.opacity, targetOp, DAMP, delta);
    }
    if (group.current) group.current.visible = (mats.current[0]?.opacity ?? 0) > 0.02;
  });

  const reg = (m: THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial | THREE.SpriteMaterial | null) => {
    if (m && !mats.current.includes(m)) mats.current.push(m);
  };

  // ring segments share ONE geometry and TWO materials (was 36+36) —
  // standard (not physical) metal: same look under the env map, cheaper
  // shader program, and a fraction of the boot cost
  const segGeo = useMemo(() => new THREE.TorusGeometry(2.2, 0.05, 10, 12, arc * 0.82), [arc]);
  const champMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CHAMP_HI,
        emissive: new THREE.Color(CHAMPAGNE),
        emissiveIntensity: 0.18,
        metalness: 1,
        roughness: 0.16,
        transparent: true,
      }),
    [],
  );
  const bordMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BORDEAUX,
        emissive: new THREE.Color(BORDEAUX),
        emissiveIntensity: 0.12,
        metalness: 1,
        roughness: 0.16,
        transparent: true,
      }),
    [],
  );
  useEffect(() => {
    reg(champMat);
    reg(bordMat);
  }, [champMat, bordMat]);

  return (
    <group ref={group}>
      {/* soft champagne halo behind the composition — alpha-safe bloom */}
      <sprite ref={glow} position={[0, 0, -1.4]} scale={[7.5, 7.5, 1]}>
        <spriteMaterial
          ref={reg}
          map={glowTex}
          color={CHAMPAGNE}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0}
        />
      </sprite>
      <group ref={ring}>
        {segments.map((i) => (
          <mesh
            key={i}
            rotation={[0, 0, i * arc]}
            geometry={segGeo}
            material={i % 2 ? bordMat : champMat}
          />
        ))}
        <mesh>
          <torusGeometry args={[1.7, 0.012, 8, 90]} />
          <meshStandardMaterial ref={reg} color="#C9CBD1" metalness={1} roughness={0.2} transparent opacity={0.5} />
        </mesh>
      </group>
      {/* gem pointer — faceted, not a traffic cone */}
      <mesh position={[0, 2.52, 0]} rotation={[0, 0, Math.PI]}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshPhysicalMaterial
          ref={reg}
          color={CHAMP_HI}
          emissive={CHAMPAGNE}
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0.1}
          transparent
        />
      </mesh>
      <mesh ref={ball}>
        <sphereGeometry args={[0.075, 32, 32]} />
        <meshPhysicalMaterial ref={reg} color={PEARL} emissive={PEARL} emissiveIntensity={0.25} metalness={0.4} roughness={0.05} clearcoat={1} transparent />
      </mesh>
    </group>
  );
}

/** Per-chapter presence for a story actor (0 = absent from this act). */
function actorVis(map: Partial<Record<string, number>>): number {
  return map[sceneState.chapter] ?? 0;
}

/** The silk band's wave field — one function so band, strand and pulse
 *  all agree on where the surface is. */
function silkWave(x: number, t: number, amp: number): { y: number; z: number } {
  return {
    y: (Math.sin(x * 0.5 + t * 0.45) * 0.85 + Math.sin(x * 1.25 - t * 0.3) * 0.32) * amp,
    z: Math.cos(x * 0.4 + t * 0.34) * 0.55 * amp,
  };
}

/**
 * The silk — a wide band of gold fabric undulating in slow waves, with a
 * light pulse travelling along it (the live market, abstracted). It
 * breathes with the user's scroll velocity: move, and the silk swells
 * and brightens. One sculptural form instead of a bent wire.
 */
function SilkRibbon() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const pulse = useRef<THREE.Sprite>(null);
  const pulseMat = useRef<THREE.SpriteMaterial>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const geo = useMemo(() => new THREE.PlaneGeometry(17, 0.5, 200, 1), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const vis = actorVis({
      hero: 0.42, intro: 0.15, brands: 0.2, journey: 0.12, timeline: 0.15,
      achievements: 0.3, work: 1, contact: 0.3,
    });
    // the silk answers the scroll: velocity swells the waves and the glow
    const vel = Math.min(1, Math.abs(window.__lenis?.velocity ?? 0) / 80);
    const amp = 1 + vel * 0.9;

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const w = silkWave(x, t, amp);
      pos.setY(i, base[i * 3 + 1] + w.y);
      pos.setZ(i, w.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    if (mat.current) {
      mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, vis * 0.85, DAMP, delta);
      mat.current.emissiveIntensity = THREE.MathUtils.damp(
        mat.current.emissiveIntensity, 0.28 + vel * 0.5, DAMP, delta,
      );
    }
    if (pulseMat.current)
      pulseMat.current.opacity = THREE.MathUtils.damp(pulseMat.current.opacity, vis, DAMP, delta);
    if (pulse.current) {
      const px = -8.5 + ((t * 0.045) % 1) * 17;
      const w = silkWave(px, t, amp);
      pulse.current.position.set(px, w.y, w.z + 0.1);
    }
    if (group.current) group.current.visible = (mat.current?.opacity ?? 0) > 0.02;
  });

  return (
    <group ref={group} position={[0.4, -0.5, -2.8]} rotation={[-0.32, 0.12, -0.14]}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          ref={mat}
          color={CHAMPAGNE}
          emissive={CHAMPAGNE}
          emissiveIntensity={0.28}
          metalness={0.85}
          roughness={0.28}
          side={THREE.DoubleSide}
          transparent
          opacity={0}
        />
      </mesh>
      {/* a thinner sister strand riding the same wave, offset — layered silk */}
      <mesh geometry={geo} position={[0, 0.85, -0.5]} scale={[1, 0.28, 1]}>
        <meshStandardMaterial
          color={CHAMP_HI}
          emissive={CHAMPAGNE}
          emissiveIntensity={0.2}
          metalness={0.85}
          roughness={0.3}
          side={THREE.DoubleSide}
          transparent
          opacity={0.35}
        />
      </mesh>
      <sprite ref={pulse} scale={[0.6, 0.6, 1]}>
        <spriteMaterial
          ref={pulseMat}
          map={glowTex}
          color={CHAMP_HI}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0}
        />
      </sprite>
    </group>
  );
}

/** chapters on light grounds — the dust dims there */
const LIGHT_CHAPTERS = new Set([
  "intro", "journey", "achievements", "leadership", "skills", "recognition", "about",
]);

/**
 * Bokeh dust — a deep field of drifting glow motes. Pure atmosphere:
 * gives every act depth and air without adding another object.
 */
function Dust() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const geo = useMemo(() => {
    const n = 140;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = -6 + Math.random() * 6.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const target = LIGHT_CHAPTERS.has(sceneState.chapter) ? 0.14 : 0.38;
    if (group.current) {
      group.current.rotation.y = t * 0.012;
      group.current.position.y = Math.sin(t * 0.05) * 0.4;
    }
    if (mat.current) mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, target, 1.5, delta);
  });

  return (
    <group ref={group}>
      <points geometry={geo}>
        <pointsMaterial
          ref={mat}
          map={glowTex}
          color={CHAMP_HI}
          size={0.14}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0}
        />
      </points>
    </group>
  );
}

/**
 * Act II / Act V — the match ball: a pearl panel-ball that orbits among
 * the operator chips at Brands, then flies slow arcs behind the product
 * vignettes at Work — the sportsbook side of the story.
 */
function Football() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const seams = useRef<THREE.MeshStandardMaterial>(null);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(0.34, 1), []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const vis = actorVis({ brands: 0.95, journey: 0.2, work: 0.6 });
    const g = group.current;
    if (!g) return;
    let tx: number, ty: number, tz: number;
    if (sceneState.chapter === "work") {
      // ball in flight: a slow ping-pong arc deep behind the vignettes
      const f = Math.abs(((t * 0.05) % 2) - 1);
      tx = -5 + f * 10;
      ty = -0.9 + Math.sin(f * Math.PI) * 2.4;
      tz = -3.4;
    } else {
      // one more orbiter among the chips — the ball among the tokens
      const a = t * 0.12 + Math.PI / 2.5;
      tx = Math.cos(a) * 2.9 + 0.4;
      ty = Math.sin(a) * 1.6;
      tz = -0.8;
    }
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, DAMP, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, DAMP, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, tz, DAMP, delta);
    g.rotation.x += delta * 0.5;
    g.rotation.y += delta * 0.35;
    if (mat.current && seams.current) {
      const o = THREE.MathUtils.damp(mat.current.opacity, vis, DAMP, delta);
      mat.current.opacity = o;
      seams.current.opacity = o * 0.55;
      g.visible = o > 0.02;
    }
  });

  return (
    <group ref={group} visible={false}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          ref={mat}
          color={PEARL}
          flatShading
          metalness={0.15}
          roughness={0.35}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh geometry={geo} scale={1.002}>
        <meshStandardMaterial ref={seams} color={GRAPHITE} wireframe transparent opacity={0} />
      </mesh>
    </group>
  );
}

/**
 * Act VI — the horseshoe: racing luck, opening upward, framing the last
 * chip as the story resolves at Contact. Place your bet.
 */
function Horseshoe() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const ARC = Math.PI * 1.45;
  const geo = useMemo(() => new THREE.TorusGeometry(0.85, 0.085, 12, 48, ARC), [ARC]);
  // rotate so the arc gap is centred at 12 o'clock — luck held in
  const baseZ = Math.PI / 2 + (Math.PI * 2 - ARC) / 2;

  useFrame(({ clock }, delta) => {
    const vis = actorVis({ contact: 1 });
    const g = group.current;
    if (!g || !mat.current) return;
    g.rotation.z = baseZ + Math.sin(clock.elapsedTime * 0.4) * 0.05;
    const s = THREE.MathUtils.damp(g.scale.x, vis > 0.5 ? 1 : 0.6, 2.4, delta);
    g.scale.setScalar(Math.max(s, 0.001));
    mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, vis, DAMP, delta);
    g.visible = mat.current.opacity > 0.02;
  });

  return (
    <group ref={group} position={[0, -0.28, 0.1]} visible={false}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          ref={mat}
          color={CHAMPAGNE}
          emissive={CHAMPAGNE}
          emissiveIntensity={0.2}
          metalness={1}
          roughness={0.22}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

/** The story cast, scaled with the viewport like the chips are. */
function StoryActors() {
  const { viewport } = useThree();
  const squeeze = Math.min(1, viewport.width / 8.5);
  return (
    <group scale={squeeze}>
      <SilkRibbon />
      <Dust />
      <Football />
      <Horseshoe />
    </group>
  );
}

/** Anchors the hero dressing right of the copy, responsive. Slightly
 *  over-scaled so the ring crops off-frame — macro, not miniature. */
function HeroAnchor() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.height * 0.66, viewport.width * 0.52) / 4.5;
  const x = viewport.width * 0.28;
  return (
    <group position={[x, 0, 0]} scale={scale}>
      <HeroDressing />
    </group>
  );
}

/** Per-chapter dolly marks — the camera pushes in on the payoff beats
 *  (timeline, achievements, contact) and pulls wide for the ensemble
 *  acts, like cuts in a title sequence. */
const CAM_Z: Record<string, number> = {
  hero: 7,
  intro: 7.4,
  brands: 7.7,
  journey: 7.3,
  timeline: 6.6,
  achievements: 6.1,
  work: 7.5,
  contact: 6.5,
};

/** Cinematic rig: slow breathing drift + pointer parallax + chapter dolly. */
function CameraRig() {
  useFrame(({ camera, pointer, clock }, delta) => {
    const t = clock.elapsedTime;
    const tx = pointer.x * 0.35 + Math.sin(t * 0.22) * 0.1;
    const ty = pointer.y * 0.2 + Math.cos(t * 0.19) * 0.07;
    const tz = CAM_Z[sceneState.chapter] ?? 7.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 1.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 1.6, delta);
    // slow lambda: the dolly reads as a deliberate camera move, not a zoom
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 0.8, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Tracks which chapter dominates the viewport → sceneState.chapter. */
function useChapterSpy() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            sceneState.chapter = e.target.id || "timeline";
          }
        }
      },
      { threshold: 0.5 },
    );
    // .tl-role sections carry no id — they all map to the "timeline" state
    document
      .querySelectorAll("main section[id], .tl-role")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Persistent scene (docs/12): one fixed canvas behind all content; the
 * token family transforms between chapter states — never a scene cut.
 * Studio lighting comes from a procedural Lightformer environment (no
 * network fetch); "bloom" is an additive glow sprite so the transparent
 * canvas stays alpha-safe. Unmounted under prefers-reduced-motion.
 */
export default function Scene() {
  useChapterSpy();
  return (
    // NB: no z-index here — an explicit z-0 creates a stacking context that
    // Chromium composites behind the body's overflow-x clip layer, hiding
    // the canvas entirely. z:auto paints in DOM order: above the body
    // ground, below the sections' z-2 content.
    <div className="scene-fade pointer-events-none fixed inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <ambientLight intensity={0.12} />
        <Environment resolution={64} frames={1}>
          {/* procedural studio: warm key softbox, cool fill, champagne kicker, bordeaux floor bounce */}
          <Lightformer intensity={2.2} position={[0, 3, 4]} rotation-x={-0.6} scale={[7, 3, 1]} color="#ffe9c4" />
          <Lightformer intensity={1.1} position={[-5, 0, 2]} rotation-y={0.9} scale={[4, 6, 1]} color="#f6f4ef" />
          <Lightformer intensity={0.9} position={[5, -1, 3]} rotation-y={-0.9} scale={[3, 5, 1]} color={CHAMP_HI} />
          <Lightformer intensity={0.4} position={[0, -4, 2]} rotation-x={0.8} scale={[8, 2, 1]} color="#9C3247" />
        </Environment>
        <CameraRig />
        <HeroAnchor />
        <Tokens />
        <StoryActors />
      </Canvas>
    </div>
  );
}
