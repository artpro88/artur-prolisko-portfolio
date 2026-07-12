"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

// Three.js loads after first paint, code-split (docs/12 §7 lazy init).
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

// Scene runs on every device — phones included — as long as the user
// hasn't asked for reduced motion. Previously gated off on coarse-pointer
// + narrow viewports (portrait phones), which caused the scene to vanish
// in portrait but reappear in landscape on the same phone (>=768px) —
// same hardware, so the width gate was pure inconsistency, not a real
// performance ceiling. Idle-mount + dpr cap [1, 1.5] + low-res PMREM (64)
// keep boot cost low enough for phones (docs/12 §7).
const QUERY = "(prefers-reduced-motion: no-preference)";

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Mounts the persistent 3D scene when the viewport and motion preference
 * allow it. Mounting waits for main-thread idle so three.js boot (parse +
 * shader/env compile) never competes with hydration and the LCP paint; the
 * canvas fades in via .scene-fade so the late arrival reads as intentional.
 */
export default function SceneLayer() {
  const sceneOk = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // SSR: no scene markup
  );
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setIdle(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return sceneOk && idle ? <Scene /> : null;
}
