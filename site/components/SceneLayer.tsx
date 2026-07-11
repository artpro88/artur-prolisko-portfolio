"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

// Three.js loads after first paint, code-split (docs/12 §7 lazy init).
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

// Scene runs on desktop-class viewports for users without reduced motion.
// Phones keep the filmic CSS layer (grain/vignette/reveals) but skip the
// WebGL canvas: it sits behind full-width text there anyway, and three.js
// boot is the single biggest main-thread cost on mobile (docs/12 §7).
const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

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
