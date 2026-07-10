"use client";

import { useEffect, useRef } from "react";
import { roles } from "@/data/timeline";

/**
 * Chapter 5 — Career Timeline (docs/07 Ch.5, rebuilt Jul 2026).
 * Reverse chronological, one full-height section per role. The left rail
 * fills champagne→bordeaux with scroll progress; the active role's node
 * ignites and its content resolves from 35% to full opacity.
 */
export default function Timeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height - vh;
        const p = total <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / total));
        fill.style.height = `${p * 100}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.classList.toggle("on", e.isIntersecting);
        }
      },
      { threshold: 0.5 },
    );
    wrap.querySelectorAll(".tl-role").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div id="timeline" ref={wrapRef} className="relative">
      <div className="tl-rail">
        <div ref={fillRef} className="tl-fill" />
      </div>

      {roles.map((role) => (
        <section key={role.slug} className="tl-role" aria-label={`${role.title}, ${role.org}`}>
          <div className="tl-node" />
          <div className="tl-inner">
            <div className="w-[190px] max-w-full">
              <div className="tl-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={role.logo} alt={role.org} />
              </div>
              {role.current && (
                <span
                  className="mt-3 inline-block rounded-full border border-bordeaux px-2.5 py-1 text-[0.6rem] uppercase text-bordeaux-hi"
                  style={{ fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.16em" }}
                >
                  Current · Gibraltar
                </span>
              )}
            </div>
            <div>
              <div
                className="text-[0.9rem] text-champagne"
                style={{ fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.14em" }}
              >
                {role.years}
              </div>
              <h2 className="mt-1 text-[clamp(1.9rem,4vw,3rem)]">{role.title}</h2>
              <div className="mb-4 text-[1rem] opacity-60">{role.org}</div>
              <p className="mb-4 max-w-[52ch] text-[1rem] opacity-80">{role.summary}</p>
              <ul className="tl-ms">
                {role.milestones.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <span
                className="mt-4 inline-block rounded-full border border-[#333] px-2 py-1 text-[0.6rem] uppercase text-platinum"
                style={{ fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.14em" }}
              >
                {role.altitude}
              </span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
