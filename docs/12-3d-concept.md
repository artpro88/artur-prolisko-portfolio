# Deliverable #12 — 3D Concept

**Project:** Artur Prolisko Portfolio v2
**Phase:** 1 (Strategy)
**Date:** July 10, 2026

The 3D is a **persistent, single-scene experience** that evolves across all 15 chapters — the physical embodiment of the story's governing metaphor, **"the widening lens."** It is built with **Three.js + React Three Fiber + Drei**. It must reinforce content, never dominate it.

---

## 1. Concept: one object family, twelve states

A single family of luminous **"tokens"** — a **premium casino chip / cut-crystal** (rounded cylinder with faceted, glass-metal edges) — carries the entire narrative. There is never a scene "cut": the same objects **transform** between named states as the visitor scrolls, so the experience feels like one continuous, physically-connected world.

**Why this object:** it reads as *casino* (chip) and *luxury* (crystal/glass) at once. It can multiply (brands), line up (timeline), ignite (achievements), flatten (work cards), and lattice (leadership) — one form, many meanings.

> **Revised Jul 2026 (Artur):** the scene should **tell the sportsbook/casino/live-casino story concretely — not read as generic abstract shapes.** Two additions:
> 1. **Casino & sportsbook motifs are welcome** (used with luxury restraint): a **roulette-style segmented ring**, stacked **chips**, playing-**card** planes, and a faint **live-odds ticker**. These *are* the hero scene (see the concept mockup's canvas), rendered in champagne/bordeaux/platinum — never neon or kitsch.
> 2. **Real product screenshots as textured planes.** In Brands / Featured Work / Timeline, Artur's actual retouched product shots (betslip, freebets, cash out, search — see `asset-inventory.md`) float as subtly-lit planes within the scene, so the 3D reinforces *real work*, not decoration.

---

## 2. Scene structure

```
<Canvas> (fixed, full-viewport, behind content, z-0)
 ├── <Environment>        studio HDRI (dimmed) for luxury reflections
 ├── Lighting rig
 │    ├── keyLight   (warm, animated intensity/temp per ground)
 │    ├── rimLight   (cool cyan-ish, edge separation)
 │    └── ambient    (very low)
 ├── TokenSystem  (InstancedMesh of N tokens — the hero object family)
 │    ├── material: MeshPhysicalMaterial (metal base + transmission/glass edge)
 │    └── emissive controller (champagne/bordeaux on "ignite")
 ├── ProductPlanes (real screenshots as lit, framed planes — Brands/Work/Timeline)
 ├── CasinoMotifs (roulette ring · chips · card planes · odds ticker — hero/live-casino beats)
 ├── ParticleField (subtle, optional — depth dust, very low density)
 └── PostFX (optional, cheap): subtle bloom on emissive only + vignette
```

- **Camera:** single `PerspectiveCamera`; position/target interpolated per state (no orbit controls; movement is authored, cinematic).
- **Content** renders in normal DOM above the canvas (z-1+); 3D is purely a backdrop layer that yields negative space to text.

---

## 3. Named states (driven by `setProgress`/`setChapter`)

| # | Chapter | Camera | Token arrangement | Light / material |
|---|---------|--------|-------------------|------------------|
| 1 | Hero | Close, low angle, shallow DOF | **One** token, slow idle rotation | Warm key, cool rim; glass edges catch light |
| 2 | Introduction | Slight pull-back | Token refines; facets resolve | Key warms as ground→light |
| 3 | Brands | Wider | Token **multiplies → slow orbit** of ~7 mono tokens | Neutral, monochrome, restrained |
| 4 | My Journey | Push in then release | Orbit **compresses to one**, then releases forward | Warmer, intimate |
| 5 | Timeline | Side-scroll dolly | Tokens form a **receding spine** along a path | Cool, ordered; active token brightens |
| 6 | Achievements | Rise | Select tokens/chips **ignite** (champagne/bordeaux) & lift | Emissive bloom on hero metrics |
| 7 | Featured Work | Flatten | Tokens **flatten into card-planes** behind UI | Recedes; low contrast so cards lead |
| 8 | Leadership | Orbit up | Tokens **organise into a lattice** (grid/graph) | Structured, even light |
| 9 | Philosophy | Center, still | Lattice **simplifies to essential geometry** | Minimal, high-contrast single form |
| 10 | Skills | Gentle | Lattice **nodes label** (soft) | Calm |
| 11 | Technologies | Gentle | Sparse grid, at rest | Calm, light ground |
| 12 | Recognition | Steady | Minimal, stable | Even |
| 13 | About | Soft, close | Calmest, fewest elements | Warm |
| 14 | Contact | Settle to center | **Resolves to one** stable, inviting chip | Warm key, gentle glow — "open door" |

> State table now maps to the **14-chapter** narrative (Testimonials removed; Personal → About).

Interpolation between states is **eased and continuous** — a visitor stopped mid-scroll sees a valid in-between (e.g., tokens halfway from orbit to spine).

---

## 4. Materials

- **Base:** `MeshPhysicalMaterial` — brushed-metal body (`metalness` ~0.9, `roughness` ~0.35) with a **glass/transmission edge** bevel (`transmission` ~0.6, `ior` ~1.4, `thickness`) for the crystal read.
- **Emissive (ignite):** champagne `#C8A24C` or bordeaux `#7A2233` emissive ramped 0→1 on Achievements/interactive moments; feeds the (cheap, emissive-only) bloom.
- **Environment reflections:** dimmed studio HDRI via Drei `<Environment>` for luxury specular without a busy background.
- **Edge highlight:** thin platinum fresnel for premium rim definition.

---

## 5. Lighting

- **Key light:** warm (~3500–4500K), intensity and temperature **animated per ground** — warmer/softer on light chapters, cooler/tighter on dark chapters.
- **Rim light:** cool, low-intensity, for edge separation against dark grounds.
- **Ambient:** minimal; let the environment map do the ambient work.
- Lighting changes are **part of the narrative** (Ch. warmth curve peaks at Personal/Contact).

---

## 6. Camera path

- Authored keyframes per state (position + target + fov/DOF), interpolated by scroll progress with eased segments.
- Movements are **small and slow** — dolly/pull-back/rise, never spins or loops. Cinematic restraint.
- Subtle mouse-parallax (±1–2°) on desktop for "alive" feel; disabled on touch and reduced-motion.

---

## 7. Performance & fallback (non-negotiable)

- **Instancing:** all tokens in one `InstancedMesh`; low poly with normal/bevel detail from material, not geometry.
- **DPR cap:** `dpr={[1, 1.75]}`; disable heavy PostFX on low-power.
- **Lazy init:** mount canvas **after hero first paint**; Three/R3F in a code-split chunk.
- **Visibility gating:** pause the render loop when canvas is off-screen or tab hidden; throttle when FPS drops (adaptive DPR).
- **Mobile:** fewer tokens (e.g., 7→4), simpler material (drop transmission → cheaper `MeshStandardMaterial`), no bloom; or a **static hero still** if device is low-tier (capability check).
- **Reduced-motion:** replace live scene with a **pre-rendered still per chapter** (or one hero still); no scroll-sync.
- **Asset weight:** procedural geometry (no heavy GLB) preferred; if a GLB is used, draco-compressed and < ~300KB.
- **Budget:** 3D must not regress LCP; target 60fps desktop, ≥30fps mobile.

---

## 8. Build approach

- **Procedural first:** the token is generated in-code (rounded cylinder + bevel) — no external model needed, keeping payload tiny and fully controllable.
- **State system:** a small `useSceneProgress()` hook maps global scroll progress → interpolated `{cameraKey, tokenLayout, lightMood, emissive}`; `TokenSystem` reads layout targets and eases instance matrices toward them each frame (damped).
- **Spline:** only if a specific bespoke moment benefits; not part of the core (keeps bundle lean).
- **Authoring the states:** each named state is a config object (camera keyframe + per-token target transforms + light mood) in `scene/states.ts`, so states are tunable without touching render code.

```ts
type SceneState = {
  chapter: number;
  camera: { pos:[number,number,number]; target:[number,number,number]; fov:number };
  layout: "single"|"orbit"|"spine"|"ignite"|"cards"|"lattice"|"minimal"|"resolve";
  light: { keyTemp:number; keyIntensity:number; rim:number };
  emissive?: { color:string; amount:number };
};
```

---

## 9. Guardrails

- The scene **always yields negative space** to headlines — tokens sit opposite the text, never behind dense copy.
- Emissive/ignite is **rare** (Achievements + key interactions only) so it stays special.
- **Refined casino motifs are encouraged** (roulette ring, chips, cards, live-odds ticker) — but keep them **luxury, not kitsch**: no cartoon dice, no neon casino signage, no spinning brand logos, no confetti.
- Real product screenshots must be **retouched into the palette** (colour-graded, framed, soft platinum edge) — never dropped in raw with their old yellow/white backgrounds.
- If in doubt, **fewer elements, better material.**
