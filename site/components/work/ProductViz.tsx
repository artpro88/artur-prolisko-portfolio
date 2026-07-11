"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type VizKind = "betslip" | "freebets" | "cashout" | "search";

/**
 * Code-drawn product vignettes (docs/07 Ch.7 revision): each sportsbook
 * feature is rebuilt as a floating 3D composition in the site palette —
 * crisp at any DPI, theme-consistent, no screenshot, no background card.
 * Motion: blur-rotate reveal (.reveal on the stage), idle float (CSS),
 * and a scroll-scrubbed tilt so the objects answer the scroll.
 */
export default function ProductViz({ kind, index }: { kind: VizKind; index: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const obj = useRef<HTMLDivElement>(null);

  const dir = index % 2 === 0 ? 1 : -1; // alternate tilt per column

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      obj.current,
      { rotateY: dir * 14, rotateX: 6, y: 36 },
      {
        rotateY: dir * 2,
        rotateX: -3,
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: stage.current,
          start: "top 95%",
          end: "bottom 5%",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [dir]);

  return (
    <div ref={stage} className="viz-stage" aria-hidden="true">
      <div
        ref={obj}
        className="viz-obj"
        style={{ transform: `rotateY(${dir * 8}deg) rotateX(2deg)` }}
      >
        <div className="viz-float" style={{ animationDelay: `${index * -1.7}s` }}>
          {kind === "betslip" && <Betslip />}
          {kind === "freebets" && <Freebets />}
          {kind === "cashout" && <Cashout />}
          {kind === "search" && <Search />}
        </div>
      </div>
    </div>
  );
}

/* ── Betslip: main slip + ghost multis panel + floating odds pill ── */
function Betslip() {
  return (
    <>
      <div className="viz-panel viz-back" style={{ width: 200 }}>
        <div className="viz-head">
          <span>Multis</span>
          <span className="viz-count">4</span>
        </div>
        <div className="viz-row"><span>4 Folds (1×)</span><b>@ +2589</b></div>
        <div className="viz-row"><span>Doubles (×6)</span><b>@ +310</b></div>
        <div className="viz-row"><span>Trebles (×4)</span><b>@ +125</b></div>
      </div>
      <div className="viz-panel viz-front" style={{ width: 250 }}>
        <div className="viz-head">
          <span>Betslip</span>
          <span className="viz-count">3</span>
        </div>
        <div className="viz-row"><span>Arsenal — Match Winner</span><b>2.10</b></div>
        <div className="viz-row"><span>Over 218.5 — Total Points</span><b>1.91</b></div>
        <div className="viz-row"><span>L. Mane — Goalscorer</span><b>11.0</b></div>
        <div className="viz-stake">
          <span className="viz-stake-box">£ 20.00</span>
          <span className="viz-dim">To return £76.66</span>
        </div>
        <div className="viz-cta">Place bet · £20.00</div>
      </div>
      <div className="viz-pill viz-sat-a">BOOST +25%</div>
    </>
  );
}

/* ── Freebets: voucher pair + applied state ── */
function Freebets() {
  return (
    <>
      <div className="viz-voucher viz-back" style={{ width: 224 }}>
        <div className="viz-voucher-amt">£5</div>
        <div>
          <div className="viz-voucher-t">Free bet</div>
          <div className="viz-dim">Expires in 6 days</div>
        </div>
      </div>
      <div className="viz-voucher viz-front" style={{ width: 248 }}>
        <div className="viz-voucher-amt">£10</div>
        <div>
          <div className="viz-voucher-t">Free bet</div>
          <div className="viz-dim">Any sport · min odds 1.5</div>
        </div>
        <span className="viz-applied">Applied</span>
      </div>
      <div className="viz-panel viz-under" style={{ width: 236 }}>
        <div className="viz-row"><span>Use free bet</span><span className="viz-toggle" /></div>
        <div className="viz-row"><span>Stake covered</span><b>£10.00</b></div>
      </div>
    </>
  );
}

/* ── Cashout: live bet card + amount CTA + partial slider ── */
function Cashout() {
  return (
    <>
      <div className="viz-panel viz-front" style={{ width: 260 }}>
        <div className="viz-head">
          <span><i className="viz-live" /> Live · 64'</span>
          <span className="viz-dim">2 – 1</span>
        </div>
        <div className="viz-row"><span>Arsenal v Spurs — Over 2.5</span><b>£20 @ 3.80</b></div>
        <div className="viz-cta">Cash out · £43.18</div>
        <div className="viz-slider">
          <i style={{ width: "62%" }} />
          <u />
        </div>
        <div className="viz-row viz-dim"><span>Partial cash out</span><span>£26.77</span></div>
      </div>
      <div className="viz-pill viz-sat-b">£43.18 ▲</div>
    </>
  );
}

/* ── Search: query field + unified results + trending ── */
function Search() {
  return (
    <>
      <div className="viz-panel viz-front" style={{ width: 264 }}>
        <div className="viz-search">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          arsenal<i className="viz-caret" />
        </div>
        <div className="viz-row">
          <span><i className="viz-live" /> Arsenal v Newcastle</span>
          <span className="viz-odds"><b>2.10</b><b>3.4</b><b>3.9</b></span>
        </div>
        <div className="viz-row"><span>Arsenal — Team</span><span className="viz-dim">124 markets</span></div>
        <div className="viz-row"><span>B. Saka — Player</span><span className="viz-dim">38 markets</span></div>
        <div className="viz-chips">
          <span>In-play</span><span>Premier League</span><span>Outrights</span>
        </div>
      </div>
      <div className="viz-pill viz-sat-a">LIVE ODDS</div>
    </>
  );
}
