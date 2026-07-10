# Deliverable #11 — Animation Plan

**Project:** Artur Prolisko Portfolio v2
**Phase:** 1 (Strategy)
**Date:** July 10, 2026

Defines every motion in the experience: the scroll engine, chapter transitions, per-chapter choreography, micro-interactions, 3D scroll-sync, and the reduced-motion contract. Tooling: **Lenis** (smooth base scroll) · **GSAP + ScrollTrigger** (scroll-linked/scrubbed timelines + pinning) · **Framer Motion** (component reveals & shared-element route transitions).

---

## 1. Scroll engine

- **Lenis** provides inertial smooth scrolling; feeds its RAF into GSAP's ticker so ScrollTrigger and Lenis share one loop (no jank/double-RAF).
- **Snap:** chapter-level scroll-snap via ScrollTrigger `snap` on section boundaries — *soft* snap (snaps after scroll settles, not a hard trap). Heavy chapters (Timeline) use internal sub-scroll before releasing to the next chapter.
- **Progress:** a global scroll-progress value (0–1) drives the nav progress bar, the right-edge chapter rail active state, and the **3D scene timeline** (single source of truth).

```
Lenis.raf → gsap.ticker → ScrollTrigger.update → { navProgress, chapterRail, threeScene.setProgress(p) }
```

---

## 2. Chapter transition system (the "chapter clock")

Every chapter change = a ground switch (dark↔light). Transition = **cross-dissolve of ground + content hand-off**, not a hard cut.

- Background color tweens between grounds over 600–900ms as the boundary crosses viewport center.
- Outgoing chapter content eases up/out (translateY -24px, opacity→0); incoming eases in (translateY 24px→0).
- The 3D scene **morphs its state** across the boundary (never blanks).
- Chapter rail node animates to active; nav progress advances.

---

## 3. Per-chapter choreography

### 1 · Hero (dark)
- **On load:** background fades ink-900 in; 3D form fades up + begins idle rotation; headline words rise & fade in, stagger 80ms; support line follows; scroll cue fades in + single pulse.
- **On scroll out:** headline parallaxes up slightly faster than 3D (depth); cue fades.

### 2 · Introduction (light)
- Ground dark→light as boundary hits center; 3D relights (key warms).
- Paragraph reveals **line-by-line** on scrub; optional stat trio counts up.

### 3 · Brands (dark)
- Logos reveal via **mask-up** (clip-path) staggered 70ms as the grid enters.
- Subtle parallax between logo rows.
- **Hover/tap:** logo → 100% white/ink, impact line slides up beneath (200ms).
- 3D tokens orbit slowly behind; orbit speed subtly tied to scroll velocity.

### 4 · My Journey (light)
- Origin visual parallaxes within its frame; pull-quote scales in (0.96→1, opacity).
- 3D tokens compress toward a point then release forward on exit.

### 5 · Career Timeline (dark) — **signature scrubbed sequence**
- ScrollTrigger **pins** the chapter; vertical scroll scrubs a **horizontal track** (desktop).
- Each node: as it reaches center it scales 1→1.08 + brightens; summary/milestones fade in; connecting line **draws** (stroke-dashoffset) between nodes.
- 3D "spine" of tokens advances one token per node, locked to the same scrub progress.
- Mobile: un-pinned vertical stack; cards reveal on enter (no horizontal scrub).

### 6 · Achievements (light)
- Metric tiles stagger in (translateY + opacity), 90ms.
- **Numbers count up** from 0 on enter (respects reduced-motion → show final).
- Two hero metrics get gold glow pulse (once); 3D tokens ignite emerald/gold and rise.

### 7 · Featured Projects (dark)
- Cards reveal staggered; cover images have inner parallax on scroll.
- **Hover:** lift + elev-2 + cover zoom 1.03 + "View case study" fades in.
- **Click → detail route:** Framer Motion **shared-element transition** — card cover morphs into the detail hero (`layoutId`), rest cross-fades.

### 8 · Product Leadership (light)
- 3D tokens assemble into a structured lattice **node-by-node**, each node synced to a responsibility line revealing beside it.

### 9 · Design Philosophy (dark)
- Statement scales in large; three principles fade in sequentially (120ms).
- 3D lattice simplifies to minimal geometry (subtraction).

### 10 · Skills (light)
- Capability clusters reveal on scroll; hover emphasises a cluster (siblings dim 10%).

### 11 · Technologies (light)
- Tool marks fade/appear in a calm grid; hover = tint to accent + label.

### 12 · Testimonials (dark, conditional)
- Quote cross-fades (carousel); attribution slides in; auto-advance pauses on hover/focus.

### 13 · Recognition (light)
- Credential rows reveal top-down; badge subtle shine sweep on enter (once).

### 14 · Personal (light, conditional)
- Soft, slow reveals; portrait subtle parallax; warmest scene light.

### 15 · Contact (dark, resolving)
- 3D resolves to one stable form; headline + CTA reveal; button premium hover (glow + lift); form fields animated focus rings.

---

## 4. Micro-interactions (global)

| Element | Interaction |
|---------|-------------|
| Primary button | Hover: emerald-400 + glow + 2px lift; active: 1px press |
| Ghost button | Hover: 6% accent fill |
| Text link | Underline draws L→R (0→100%, 200ms) |
| Nav | Collapses to glass pill on first scroll; links get underline-from-center |
| Chapter rail node | Hover: title tooltip; active: expand + accent |
| Card | Hover: lift + elev-2 |
| Logo | Hover: mono→full + impact line |
| Cursor (desktop, optional) | Subtle custom cursor that scales over interactive targets — *tasteful, or omit* |
| Scroll cue | Single pulse loop; hides after first scroll |
| Focus (keyboard) | Emerald ring, both grounds |

---

## 5. 3D scroll-sync contract

- The 3D scene exposes `setProgress(p: 0..1)` and `setChapter(i)`.
- Global scroll progress drives `setProgress`; ScrollTrigger chapter enters drive `setChapter`.
- Scene interpolates **between named states** (Hero→Intro→Brands→…→Contact) — see `12-3d-concept.md`. Interpolation is eased, so partial-scroll between chapters shows an in-between state (continuity).
- 3D never triggers layout; renders to a fixed full-viewport canvas behind content (`position:fixed; z-index:0`), content sits above (`z-index:1+`).

---

## 6. Performance budget for motion

- One shared RAF loop (Lenis+GSAP+Three).
- Animate only `transform`/`opacity` for DOM (GPU-friendly); avoid layout-triggering props.
- ScrollTrigger: `once` for pure reveals; `scrub` only where scroll-linked (timeline, 3D, parallax).
- Lazy-init 3D after hero first paint; pause 3D RAF when canvas off-screen/tab hidden.
- Target 60fps desktop; graceful 30–60fps mobile with reduced particle counts.
- Total JS for motion libs kept lean via code-splitting (Three/R3F chunk loaded after first paint).

---

## 7. Reduced-motion contract (`prefers-reduced-motion: reduce`)

- Disable: Lenis smoothing (native scroll), scroll-snap, all `scrub` timelines, parallax, 3D scroll-sync.
- Replace: 3D → a **static, tasteful still** per chapter (pre-rendered) or a single non-animated hero form.
- Keep: instant/short opacity fades on enter (≤200ms), count-ups show **final values immediately**.
- Guarantee: 100% of content reachable and readable; no auto-advancing carousels (show stacked quotes instead).
- This path is a first-class deliverable, not an afterthought.
