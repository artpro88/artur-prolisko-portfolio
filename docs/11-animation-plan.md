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
- Brand cards reveal via staggered translateY+opacity (70ms) as the grid enters.
- **Each card shows everything at rest** — real logo (on pearl chip), role, years, impact line. **No hover-reveal** (mobile has no hover); hover only nudges elevation. See design system §5a.
- 3D casino tokens (chips) orbit slowly behind; orbit speed subtly tied to scroll velocity.

### 4 · My Journey (light)
- Origin visual parallaxes within its frame; pull-quote scales in (0.96→1, opacity).
- 3D chips compress toward a point then release forward on exit.

### 5 · Career Timeline (dark) — **signature scroll-fill sequence (rebuilt Jul 2026)**
- **Reverse chronological — latest role first** (Fitzdares → … → Unibet 2011).
- **Each role is its own full-height section** with the real company logo (+ brand treatment), role, dates, summary, and milestone bullets — **all visible by default** (no hover).
- A **vertical line on the left fills with a champagne→bordeaux gradient as the user scrolls** through the positions (scroll-progress-driven `fill.height = progress`); each role's node ignites champagne when it becomes active (IntersectionObserver ≥ 0.5).
- Inactive role content sits at ~35% opacity and eases to full as it centers (a "focus" effect), so the active chapter is always clear.
- 3D: casino tokens/chips advance along a receding spine, one per role, in step with which section is active.
- Mobile: same vertical structure (already vertical); rail + fill remain; logos on pearl chips so any logo colour reads. No horizontal scrub, no hover.

### 6 · Achievements (light)
- Metric tiles stagger in (translateY + opacity), 90ms.
- **Numbers count up** from 0 on enter (respects reduced-motion → show final). Labels + context are **always visible** (not hover).
- Two hero metrics get gold glow pulse (once); secondary metrics use bordeaux; 3D chips ignite champagne/bordeaux and rise.

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
- Tool marks fade/appear in a calm grid, **each with its name printed beneath** (visible by default per §5a); hover = tint to accent only.

### 12 · Recognition (light)
- Credential rows reveal top-down; badge subtle shine sweep on enter (once).

### 13 · About (light)
- Soft, slow reveals; portrait subtle parallax (if provided); warmest scene light.

### 14 · Contact (dark, resolving)
- 3D resolves to one stable form; headline + CTA reveal; button premium hover (glow + lift); form fields animated focus rings.

---

## 4. Micro-interactions (global)

| Element | Interaction |
|---------|-------------|
| Primary button | Hover: brighten + gold glow + 2px lift; active: 1px press |
| Ghost button | Hover: 6% champagne fill |
| Text link | Underline draws L→R (0→100%, 200ms) |
| Nav | Collapses to glass pill on first scroll; links get underline-from-center |
| Chapter rail node | Hover: title tooltip; active: expand + accent |
| Card | Hover: lift + elev-2 (enhancement only — all info already visible) |
| Logo | Real logo on pearl chip, shown at rest (no hover-reveal) |
| Cursor (desktop, optional) | Subtle custom cursor that scales over interactive targets — *tasteful, or omit* |
| Scroll cue | Single pulse loop; hides after first scroll |
| Focus (keyboard) | Champagne ring, both grounds |

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
