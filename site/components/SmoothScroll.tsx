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

const EASE = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const DURATION = 0.6;

/**
 * Single scroll pipeline (docs/11 §1): Lenis drives scroll, GSAP's ticker
 * drives Lenis, ScrollTrigger listens to Lenis — one RAF for everything.
 *
 * Chapter snap (docs/11 §2): once scrolling settles, ease to the nearest
 * chapter top — a soft snap, not a hard trap. Only a section that's
 * within ~1.15x the viewport counts as a chapter (a "point"); taller
 * sections (mobile reflows most grids to single-column, easily 2-3x
 * viewport tall) get no attractor of their own and scroll through freely
 * — otherwise their first/last ~half-viewport becomes a trap where any
 * pause drags the user back to the top of that (very tall) section,
 * reading as "snapping back to the top of the page". Re-measured on
 * resize (orientation change / responsive breakpoint).
 *
 * Touch (phone/tablet) uses lenis/snap's own type "lock": it commits in
 * the scroll's direction regardless of how far the user actually
 * scrolled, which is what makes a small nudge enough to advance —
 * type "proximity" (the default) picks whichever point is NEAREST by
 * absolute distance, so a small scroll less than half the chapter's
 * height settles closer to its own top than the next one and snaps
 * backward, feeling like the scroll did nothing.
 *
 * Desktop (fine pointer) can't use the same distance-based trick: a
 * single wheel/trackpad gesture travels much farther than a phone's
 * touchmove ticks (trackpad inertia especially), so by the time lenis/
 * snap's debounce fires, raw scroll may already sit a chapter or more
 * past where the gesture "should" land — "lock" then commits ONE MORE
 * step from there, skipping a whole chapter the user never got to see.
 * No fixed distanceThreshold reconciles both a single wheel click (as
 * little as ~100px) reliably advancing AND a hard trackpad fling (that
 * can cover 1500px+) never advancing more than one chapter — the two
 * pull the threshold in opposite directions. So desktop instead gets its
 * own discrete stepper, driven off the FIRST wheel tick of a gesture
 * (not an accumulate-then-decide wait — direction only needs one tick's
 * sign, not the gesture's full magnitude, so there's nothing to gain by
 * waiting): it moves exactly one chapter in that tick's direction,
 * however hard or long the rest of the gesture turns out to be. What
 * would otherwise be a trackpad's decaying tail of extra wheel events is
 * swallowed through the transition and a short settle window after it
 * completes — long enough to outlast that tail — so the same physical
 * gesture can't re-trigger a second jump. Outside a chapter (inside a
 * tall section) wheel input is left untouched — ordinary smooth scroll,
 * exactly as today.
 *
 * Disabled entirely under prefers-reduced-motion (native scroll, no snap).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isDesktop = window.matchMedia("(pointer: fine)").matches;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: true });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let points: HTMLElement[] = [];
    const measure = () => {
      const all = document.querySelectorAll<HTMLElement>("main section[id], .tl-role");
      // 1.15x slack: a section a little taller than the viewport (e.g.
      // padding) should still snap like any other chapter.
      points = Array.from(all).filter((el) => el.offsetHeight <= window.innerHeight * 1.15);
    };
    measure();

    let teardownMode: () => void;
    let onPointsChanged: (() => void) | undefined;

    if (isDesktop) {
      // A trackpad's momentum tail can keep emitting decaying wheel
      // events well past a fixed "wait this long, then unlock" window —
      // a firm swipe's tail length isn't predictable. So instead of a
      // one-shot timer started when the transition completes, EVERY
      // wheel event seen while busy (including the ones we swallow)
      // re-arms this same window: busy only clears once there's been a
      // genuine gap of silence, however long the tail actually runs.
      const SETTLE_MS = 350;
      let busy = false;
      let cooldownTimer = 0;
      const armCooldown = () => {
        window.clearTimeout(cooldownTimer);
        cooldownTimer = window.setTimeout(() => {
          busy = false;
        }, SETTLE_MS);
      };

      const chapterAt = (scroll: number) =>
        points.findIndex((el) => {
          const top = el.getBoundingClientRect().top + scroll;
          return scroll >= top - 2 && scroll < top + el.offsetHeight - 2;
        });

      // Lenis attaches its own wheel listener (passive: false, bubble
      // phase) that processes every event independently of what we do
      // here — preventDefault alone does NOT stop it from also running
      // and advancing the scroll on its own. Registering in the CAPTURE
      // phase lets us run first and call stopImmediatePropagation to
      // block Lenis's handler from ever seeing the event, so a swallowed
      // wheel event genuinely doesn't move the page at all.
      const onWheel = (e: WheelEvent) => {
        if (busy) {
          e.preventDefault();
          e.stopImmediatePropagation();
          armCooldown();
          return;
        }
        const idx = chapterAt(window.scrollY);
        if (idx === -1) return; // inside a tall section — native scroll
        const targetIdx = idx + (e.deltaY > 0 ? 1 : -1);
        if (targetIdx < 0 || targetIdx >= points.length) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return; // at the first/last chapter — nothing to jump to
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        busy = true;
        const targetTop = points[targetIdx].getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(targetTop, {
          duration: DURATION,
          easing: EASE,
          lock: true,
          onComplete: armCooldown,
        });
      };
      window.addEventListener("wheel", onWheel, { passive: false, capture: true });
      teardownMode = () => {
        window.removeEventListener("wheel", onWheel, { capture: true });
        window.clearTimeout(cooldownTimer);
      };
    } else {
      const snap = new Snap(lenis, {
        type: "lock",
        distanceThreshold: "100%",
        duration: DURATION,
        easing: EASE,
        debounce: 150,
      });
      let removeSnaps = snap.addElements(points, { align: "start" });
      teardownMode = () => {
        removeSnaps();
        snap.destroy();
      };
      // touch: snap elements must be re-registered after `points` changes
      // (desktop's wheel stepper reads `points` live, needing no such hook)
      onPointsChanged = () => {
        removeSnaps();
        removeSnaps = snap.addElements(points, { align: "start" });
      };
    }

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measure();
        onPointsChanged?.();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeRaf);
      teardownMode();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
