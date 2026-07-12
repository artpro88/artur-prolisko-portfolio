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
 * own discrete stepper, driven off the FIRST wheel tick of a gesture:
 * direction only needs one tick's sign, not the gesture's full
 * magnitude, so it reacts immediately rather than waiting to see how the
 * gesture plays out.
 *
 * What stops one gesture from advancing more than one chapter is a
 * flat rate limit — at most one jump per RATE_LIMIT_MS, full stop. Two
 * earlier, cleverer attempts both failed: accumulate-then-decide added a
 * flat delay before EVERY jump (felt laggy); re-arming a cooldown on
 * every trailing wheel event (to outlast a trackpad's decaying tail)
 * meant the user's own retries — scrolling again because it feels stuck
 * — kept re-arming the very lockout blocking them, freezing the page
 * outright. A flat "one per second, no exceptions" has neither problem:
 * it's measured from a fixed point in time, so it always expires on
 * schedule regardless of how much or how little wheel input arrives
 * during it, and the very first tick of a new window still reacts
 * instantly. The trade-off — a deliberate rapid double-scroll can't skip
 * two chapters at once — is the one explicitly wanted here. Outside a
 * chapter (inside a tall section) wheel input is left untouched —
 * ordinary smooth scroll, exactly as today.
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
      // At most one jump per window, measured from a fixed point in
      // time (the last jump) — not extended by however much wheel input
      // arrives during it. See the block comment above for why this
      // replaced two more "clever" approaches that both backfired.
      const RATE_LIMIT_MS = 1000;
      let lastJumpAt = -Infinity;

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
        const idx = chapterAt(window.scrollY);
        if (idx === -1) return; // inside a tall section — native scroll
        if (performance.now() - lastJumpAt < RATE_LIMIT_MS) {
          // still rate-limited: hold position instead of letting this
          // extra wheel input creep the scroll away from the chapter top
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        const targetIdx = idx + (e.deltaY > 0 ? 1 : -1);
        if (targetIdx < 0 || targetIdx >= points.length) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return; // at the first/last chapter — nothing to jump to
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        lastJumpAt = performance.now();
        const targetTop = points[targetIdx].getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(targetTop, { duration: DURATION, easing: EASE, lock: true });
      };
      window.addEventListener("wheel", onWheel, { passive: false, capture: true });
      teardownMode = () => {
        window.removeEventListener("wheel", onWheel, { capture: true });
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

    // ── Keyboard navigation (additive; independent of the wheel/snap
    //    logic above and does not modify it) ──────────────────────────
    // Gives keyboard users chapter-jumping parity with the pointer snap,
    // which they'd otherwise lack. PageUp/PageDown/Space step one section
    // (all sections, incl. taller-than-viewport ones, so every chapter is
    // reachable), Home/End go to the extremes; each eases through Lenis
    // for the same feel. Arrow keys are deliberately left NATIVE so a
    // keyboard user can still fine-scroll to read within a tall section.
    const sectionTops = () => {
      const y = window.scrollY;
      return Array.from(
        document.querySelectorAll<HTMLElement>("main section[id], .tl-role"),
      ).map((el) => el.getBoundingClientRect().top + y);
    };
    const goToY = (y: number) =>
      lenis.scrollTo(Math.round(y), { duration: DURATION, easing: EASE });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      const tops = sectionTops();
      if (tops.length === 0) return;
      const y = window.scrollY;
      const EPS = 4;
      let target: number | undefined;

      switch (e.key) {
        case "PageDown":
          target = tops.find((top) => top > y + EPS);
          break;
        case "PageUp":
          target = [...tops].reverse().find((top) => top < y - EPS);
          break;
        case " ": // Space pages down, Shift+Space pages up (browser convention)
          target = e.shiftKey
            ? [...tops].reverse().find((top) => top < y - EPS)
            : tops.find((top) => top > y + EPS);
          break;
        case "Home":
          target = tops[0];
          break;
        case "End":
          target = tops[tops.length - 1];
          break;
        default:
          return; // arrows and everything else stay native
      }
      if (target === undefined) return; // already at the end in that direction
      e.preventDefault();
      goToY(target);
    };
    window.addEventListener("keydown", onKeyDown);

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
      window.removeEventListener("keydown", onKeyDown);
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
