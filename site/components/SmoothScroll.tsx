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
 * once scrolling settles — a soft snap, not a hard trap.
 *
 * lenis/snap's distanceThreshold is a fraction of VIEWPORT HEIGHT, not of
 * the gap between snap points (checked packages/snap/src/snap.ts). At 50%
 * that's ~400px on a phone: scroll to within 400px of a section's top,
 * pause, and it force-snaps back there. Fine for a 100svh chapter — the
 * whole section is within that radius anyway. Broken for a section taller
 * than the viewport (mobile reflows most grids to single-column, easily
 * 2-3x viewport tall): the first/last ~400px of it become a trap where
 * any pause drags the user back to its top, which reads as "snapping back
 * to the top of the page". Fix: only make a section a snap point if it
 * actually fits near one viewport; taller sections get no attractor of
 * their own and simply scroll through freely until the next real chapter
 * comes into snapping range. Re-measured on resize (orientation change).
 *
 * type "proximity" picks whichever snap point is nearest by absolute
 * distance — inside a short chapter, a small scroll (less than half the
 * chapter's height) settles closer to the chapter's OWN top than to the
 * next one, so it snaps backward to where the user started, feeling like
 * the scroll was ignored. type "lock" instead always commits in the
 * scroll's direction (next chapter on scroll-down, previous on scroll-up)
 * regardless of how far the user actually got — a small nudge is enough.
 * distanceThreshold is raised to 100% (a full viewport) so that commit
 * reaches across an entire short chapter, but stays capped at one
 * viewport so it can never leap across an unregistered tall section into
 * whatever (possibly distant) chapter follows it.
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
      type: "lock",
      distanceThreshold: "100%",
      duration: 0.9,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      debounce: 350,
    });

    let removeSnaps: (() => void) | undefined;
    const applySnapTargets = () => {
      removeSnaps?.();
      const all = document.querySelectorAll<HTMLElement>("main section[id], .tl-role");
      // 1.15x slack: a section a little taller than the viewport (e.g.
      // padding) should still snap like any other chapter.
      const fits = Array.from(all).filter(
        (el) => el.offsetHeight <= window.innerHeight * 1.15,
      );
      removeSnaps = snap.addElements(fits, { align: "start" });
    };
    applySnapTargets();

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(applySnapTargets);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeRaf);
      removeSnaps?.();
      snap.destroy();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
