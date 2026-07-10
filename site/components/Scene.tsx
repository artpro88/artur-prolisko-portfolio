"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CHAMPAGNE = "#C8A24C";
const CHAMP_HI = "#E4C878";
const BORDEAUX = "#7A2233";
const PEARL = "#F6F4EF";
const GRAPHITE = "#1B1D24";

/** Segmented roulette-style ring — alternating champagne/bordeaux arcs. */
function RouletteRing() {
  const group = useRef<THREE.Group>(null);
  const segments = useMemo(() => Array.from({ length: 36 }, (_, i) => i), []);
  const arc = (Math.PI * 2) / 36;

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={group}>
      {segments.map((i) => (
        <mesh key={i} rotation={[0, 0, i * arc]}>
          <torusGeometry args={[2.2, 0.045, 8, 10, arc * 0.82]} />
          <meshStandardMaterial
            color={i % 2 ? BORDEAUX : CHAMP_HI}
            emissive={i % 2 ? BORDEAUX : CHAMPAGNE}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
      {/* inner platinum guide ring */}
      <mesh>
        <torusGeometry args={[1.7, 0.012, 8, 80]} />
        <meshStandardMaterial color="#C9CBD1" metalness={0.9} roughness={0.35} opacity={0.5} transparent />
      </mesh>
      {/* gold pointer at 12 o'clock (counter-rotates so it stays fixed) */}
    </group>
  );
}

function Pointer() {
  return (
    <mesh position={[0, 2.48, 0]} rotation={[0, 0, Math.PI]}>
      <coneGeometry args={[0.1, 0.26, 3]} />
      <meshStandardMaterial color={CHAMP_HI} emissive={CHAMPAGNE} emissiveIntensity={0.8} metalness={0.85} roughness={0.25} />
    </mesh>
  );
}

/** Ball orbiting inside the ring. */
function Ball() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.5;
    ref.current?.position.set(Math.cos(t) * 1.45, Math.sin(t) * 1.45, 0.1);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.075, 24, 24]} />
      <meshStandardMaterial color={PEARL} emissive={PEARL} emissiveIntensity={0.35} roughness={0.2} />
    </mesh>
  );
}

/** A single casino chip: graphite/bordeaux body + champagne rim. */
function Chip({ position, tone }: { position: [number, number, number]; tone: "dark" | "red" }) {
  return (
    <group position={position} rotation={[Math.PI / 2.4, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 48]} />
        <meshStandardMaterial color={tone === "red" ? BORDEAUX : GRAPHITE} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.02, 8, 48]} />
        <meshStandardMaterial color={CHAMPAGNE} emissive={CHAMPAGNE} emissiveIntensity={0.5} metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

function ChipStack() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = -2.1 + Math.sin(clock.elapsedTime) * 0.06;
  });
  return (
    <group ref={group} position={[-2.6, -2.1, 0.4]} scale={0.85}>
      <Chip position={[0, 0, 0]} tone="dark" />
      <Chip position={[0.04, 0.14, 0]} tone="red" />
      <Chip position={[-0.03, 0.28, 0]} tone="dark" />
    </group>
  );
}

/** Sizes/positions the composition responsively so it never crowds the copy. */
function Composition() {
  const { viewport } = useThree();
  // Composition is ~5.2 world units in diameter (ring + pointer + chips).
  // Fit it to ~66% of the smaller viewport dimension, anchored right of copy.
  const scale = Math.min(viewport.height * 0.66, viewport.width * 0.52) / 5.2;
  const x = viewport.width * 0.26;
  return (
    <group position={[x, 0, 0]} scale={scale}>
      <RouletteRing />
      <Pointer />
      <Ball />
      <ChipStack />
    </group>
  );
}

/**
 * Hero casino scene (docs/12): roulette-style ring, orbiting ball, chip
 * stack — champagne/bordeaux/platinum, luxury not kitsch. DPR capped;
 * static single frame under prefers-reduced-motion.
 */
export default function Scene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      className="pointer-events-none"
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      dpr={[1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} color="#ffe9c4" />
      <directionalLight position={[-6, -2, 4]} intensity={0.35} color="#9fb2d8" />
      <Composition />
    </Canvas>
  );
}
