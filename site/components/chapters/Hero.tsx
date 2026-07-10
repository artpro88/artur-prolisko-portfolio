"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Three.js loads after first paint, code-split (docs/12 §7 lazy init).
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Scroll-synced exit (docs/12 §6): the scene drifts up and dissolves as
  // the hero leaves — scrubbed, so a stopped mid-scroll shows a valid
  // in-between state. No-op under reduced motion (scrub tied to scroll).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(sceneRef.current, {
      opacity: 0,
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom 25%",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="chapter ground-dark-alt">
      <div ref={sceneRef} className="absolute inset-0 z-[1]">
        <Scene />
      </div>
      <div className="wrap grid items-center gap-8 md:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="eyebrow reveal">Head of Product · Sportsbook · Casino · Live Casino</p>
          <h1 className="h-hero reveal mt-5">
            Senior Product
            <br />
            Design Leader for
            <br />
            <span className="grad-accent">iGaming &amp; Sportsbook.</span>
          </h1>
          <p className="lead reveal mt-6 max-w-[36ch]">
            Fourteen years turning platform complexity into effortless products for Tier 1
            operators — now Head of Product at Fitzdares, building from Gibraltar.
          </p>
          <div
            className="reveal mt-10 inline-flex items-center gap-2.5 text-[0.7rem] uppercase opacity-60"
            style={{ fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.2em" }}
          >
            Scroll <span className="cue-dot" />
          </div>
        </div>
        <div aria-hidden="true" />
      </div>
    </section>
  );
}
