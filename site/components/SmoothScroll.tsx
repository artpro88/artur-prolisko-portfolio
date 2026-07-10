"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Single scroll pipeline (docs/11 §1): Lenis drives scroll, GSAP's ticker
 * drives Lenis, ScrollTrigger listens to Lenis — one RAF for everything.
 *
 * Chapter snap (docs/11 §2): lenis/snap eases to the nearest chapter top
 * once scrolling settles — a soft snap, not a hard trap. The 50% distance
 * threshold makes 100svh chapters always snap while letting taller-than-
 * viewport sections (e.g. mobile grids) rest mid-content so nothing
 * becomes unreachable.
 *
 * Disabled entirely under prefers-reduced-motion (native scroll, no snap).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: true });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "50%",
      duration: 0.9,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      debounce: 350,
    });
    const targets = document.querySelectorAll<HTMLElement>("main section[id], .tl-role");
    const removeSnaps = snap.addElements(Array.from(targets), { align: "start" });

    return () => {
      removeSnaps();
      snap.destroy();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
