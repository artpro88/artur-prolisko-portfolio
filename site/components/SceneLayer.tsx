"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

// Three.js loads after first paint, code-split (docs/12 §7 lazy init).
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Mounts the persistent 3D scene unless the user prefers reduced motion. */
export default function SceneLayer() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // SSR: no scene markup
  );
  return enabled ? <Scene /> : null;
}
