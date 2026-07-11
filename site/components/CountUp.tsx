"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a metric up from 0 when it enters the viewport (docs/11 Ch.6).
 * Accepts values like "250%", "14+", "3" — the numeric head animates, the
 * suffix stays. Non-numeric values ("Gibraltar") render as-is. Reduced
 * motion shows the final value immediately.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return; // non-numeric — SSR text stands
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let raf = 0;

    // replays on every visit: rolls up on entry, silently re-arms once
    // the metric has fully left the viewport
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            cancelAnimationFrame(raf);
            const t0 = performance.now();
            const dur = 1200;
            const tick = (now: number) => {
              // rAF timestamps can precede t0 by a frame — clamp both ends
              const p = Math.min(1, Math.max(0, (now - t0) / dur));
              const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
              el.textContent = `${Math.round(target * eased)}${suffix}`;
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          } else if (e.intersectionRatio === 0) {
            cancelAnimationFrame(raf);
            el.textContent = `0${suffix}`;
          }
        }
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  // SSR renders the final value — no-JS and reduced-motion users see it directly.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
