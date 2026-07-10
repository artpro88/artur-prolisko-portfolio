# Deliverable #8 — Visual Design System

**Project:** Artur Prolisko Portfolio v2
**Phase:** 1 (Strategy)
**Date:** July 10, 2026

The system is built for a **hybrid light/dark** experience — chapters alternate grounds, so every token is defined for *both* a dark and a light ground. Tokens are framework-agnostic (map cleanly to Tailwind v4 `@theme` / CSS custom properties).

---

## 1. Design principles

1. **Restraint is the brand.** One accent doing the work per section; whitespace over decoration.
2. **Two grounds, one system.** Dark and light are equal citizens; components must look intentional on both.
3. **Type carries the design.** Large, confident, geometric. Minimal decorative type.
4. **Motion reveals, never performs.** Purposeful, cinematic, ≤ ~600ms.
5. **Depth through light, not borders.** Soft shadows, glass, and layered elevation — not hard outlines.

---

## 2. Color tokens

### Neutrals (grounds & surfaces)
| Token | Hex | Use |
|-------|-----|-----|
| `--ink-900` | `#0A0E27` | Matte black — dark ground |
| `--ink-800` | `#12172E` | Dark surface / raised |
| `--graphite-700` | `#1E2438` | Deep graphite — dark cards |
| `--charcoal-600` | `#2D3142` | Soft charcoal — borders/dividers (dark) |
| `--platinum-200` | `#E8EAF0` | Platinum — light cards/dividers |
| `--paper-100` | `#F5F7FA` | Warm white — light ground |
| `--paper-50` | `#FBFCFE` | Lightest surface |

### Text
| Token | On dark | On light |
|-------|---------|----------|
| `--text-primary` | `#F5F7FA` | `#0A0E27` |
| `--text-secondary` | `#A8AEC2` | `#4A5068` |
| `--text-muted` | `#6B7186` | `#8B92A9` |

### Accents (luxury gaming — used sparingly)
| Token | Hex | Meaning / use |
|-------|-----|---------------|
| `--emerald-500` | `#10B981` | Primary accent — interactive, "ignite," success/growth |
| `--emerald-400` | `#34D399` | Emerald hover/glow |
| `--gold-500` | `#D4AF37` | Premium highlight — hero metrics, recognition |
| `--gold-400` | `#E5C158` | Gold hover/glow |
| `--cyan-400` | `#22D3EE` | Soft cyan — secondary/data viz, subtle neon |
| `--platinum-hi` | `#DCE1EA` | Glass reflection highlight |

### Accent usage rule
- **One primary accent per chapter.** Emerald is default interactive; gold is reserved for **hero metrics + recognition**; cyan only for data/odds visualisations.
- **Never** more than two accents visible in one viewport.
- Avoid saturated "casino" reds/greens — everything muted toward luxury.

### Gradients & effects (restrained)
- `--glow-emerald`: radial `rgba(16,185,129,.35)` → transparent (3D ignite, focus rings).
- `--glow-gold`: radial `rgba(212,175,55,.30)` → transparent (hero metrics).
- `--glass-dark`: `rgba(18,23,46,.55)` + `backdrop-blur(20px)` + 1px `rgba(255,255,255,.06)` inset.
- `--glass-light`: `rgba(255,255,255,.55)` + `backdrop-blur(20px)` + 1px `rgba(10,14,39,.05)` inset.
- No mesh gradients, no noise, no drop-shadow stacks.

---

## 3. Typography

### Families
- **Display / Headlines:** a geometric grotesk — **Neue Haas Grotesk Display**, **PP Neue Montreal**, or open-source fallback **General Sans** / **Space Grotesk**. (License-safe default: **General Sans**.)
- **Body:** **Inter** (or **General Sans** text weights) — high readability, neutral.
- **Mono (accents/labels/metrics):** **JetBrains Mono** or **Space Mono** — for years, credential IDs, small caps labels.

### Type scale (fluid, `clamp()` — desktop→mobile)
| Token | Size (clamp) | Use |
|-------|--------------|-----|
| `--fs-display` | `clamp(2.75rem, 7vw, 6rem)` | Hero / chapter statements |
| `--fs-h1` | `clamp(2.25rem, 5vw, 4rem)` | Chapter titles |
| `--fs-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | Sub-headers |
| `--fs-h3` | `clamp(1.25rem, 2.2vw, 1.75rem)` | Card titles |
| `--fs-lead` | `clamp(1.125rem, 1.6vw, 1.5rem)` | Lead paragraphs |
| `--fs-body` | `1.0625rem` (17px) | Body |
| `--fs-small` | `0.875rem` | Meta |
| `--fs-label` | `0.75rem` | Mono labels (uppercase, +0.08em tracking) |
| `--fs-metric` | `clamp(3rem, 8vw, 7rem)` | Achievement numbers |

### Type rules
- Display weight 500–600 (not 700+ — heavy reads less premium at large sizes).
- Line-height: 1.05 for display, 1.15 for headings, 1.6 for body.
- Tracking: display `-0.02em`; labels `+0.08em` uppercase.
- Measure: body max ~62ch.

---

## 4. Spacing, radius, elevation

### Spacing scale (8px base)
`--space-1..16` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192px …
- Section vertical padding: `clamp(96px, 12vh, 192px)`.
- Content max-width: `1280px`; wide moments `1440px`; text column `680px`.
- Gutters: 24px mobile → 48px+ desktop.

### Radius
| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 8px | inputs, chips |
| `--radius-md` | 14px | cards, buttons |
| `--radius-lg` | 24px | large cards, media |
| `--radius-pill` | 999px | nav chip, tags |

### Elevation (soft, ground-aware)
- `--elev-1` (dark): `0 2px 8px rgba(0,0,0,.4)`; (light): `0 2px 8px rgba(10,14,39,.06)`
- `--elev-2` (dark): `0 12px 32px rgba(0,0,0,.5)`; (light): `0 12px 32px rgba(10,14,39,.10)`
- Hover raises one elevation step + 2–4px translateY.

---

## 5. Components

### Buttons
- **Primary:** emerald fill, `--text` on-emerald `#04150E`, radius-md, 44–52px tall; hover = emerald-400 + subtle glow + 2px lift.
- **Secondary (ghost):** 1px border (`charcoal-600` on dark / `platinum-200` on light), transparent fill; hover = fill 6% accent.
- **Text link:** underline draws left→right on hover (0→100% width, 200ms).
- Focus: 2px emerald ring + 2px offset (both grounds).

### Cards (work / metric / credential)
- Surface = graphite-700 (dark) / paper-50 (light); radius-lg; elev-1.
- Optional glass variant for overlays.
- Hover: elev-2 + lift + cover-image parallax (work cards).

### Nav
- Top bar → translucent glass pill on scroll (`--glass-*`).
- Monogram "AP" mark left; 4 act-links center (desktop); Contact button right.
- Right-edge chapter rail: 15 nodes, active expands to label.

### Chapter rail node
- 6px dot default; active = 10px + accent + title label; hover = title tooltip.

### Metric tile (Achievements)
- Mono label (uppercase) + `--fs-metric` number (count-up) + one-line context.
- Hero metrics get `--glow-gold`; others emerald on hover.

### Logo lockup (Brands)
- Monochrome by default (single-tone), 40–60% opacity at rest → 100% white/ink on hover, with impact line reveal.

### Iconography
- **Line icons, 1.5px stroke, rounded joins, 24px grid.** Set: Lucide (open-source, consistent) — customised stroke to match. Icons are quiet/utility only (nav, scroll cue, contact, external-link). **No filled/colored icon illustrations.**
- 3D objects — not icons — carry the visual storytelling.

---

## 6. Motion principles (system-level)

- **Easing:** default `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for reveals; `cubic-bezier(0.65,0,0.35,1)` for moves.
- **Durations:** micro 120–200ms; reveals 400–600ms; chapter transitions 600–900ms.
- **Reveal pattern:** translateY(24px)+opacity 0 → settle, staggered 60–90ms.
- **Scroll-linked:** GSAP ScrollTrigger `scrub` for timeline + 3D; Framer Motion for component reveals; Lenis for smooth base scroll.
- **Respect `prefers-reduced-motion`:** disable scrub/snap/parallax; keep instant, tasteful fades; 3D → static stills.
- Full choreography in `11-animation-plan.md`.

---

## 7. 3D principles (system-level)

- **One continuous scene, one object family** (chip/crystal/glass tokens) — evolves, never resets.
- **Materials:** physically-based; brushed-metal + smoked-glass + subtle emissive edges. Emerald/gold emissive only on "ignite."
- **Lighting:** single warm key + cool rim; environment reflections for luxury; lighting shifts warmer/cooler with light/dark grounds.
- **Restraint:** low object count, high material quality. Never fills the frame; always yields to content.
- **Performance:** capped DPR, instanced tokens, lazy-init after hero paint, mobile fallback. Full spec in `12-3d-concept.md`.

---

## 8. Token starter (for implementation)

```css
@theme {
  /* neutrals */
  --color-ink-900:#0A0E27; --color-ink-800:#12172E;
  --color-graphite-700:#1E2438; --color-charcoal-600:#2D3142;
  --color-platinum-200:#E8EAF0; --color-paper-100:#F5F7FA; --color-paper-50:#FBFCFE;
  /* accents */
  --color-emerald-500:#10B981; --color-emerald-400:#34D399;
  --color-gold-500:#D4AF37; --color-gold-400:#E5C158; --color-cyan-400:#22D3EE;
  /* radius */
  --radius-sm:8px; --radius-md:14px; --radius-lg:24px; --radius-pill:999px;
  /* type */
  --font-display:"General Sans",system-ui,sans-serif;
  --font-body:"Inter",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
  /* easing */
  --ease-out-expo:cubic-bezier(0.22,1,0.36,1);
}
```

Two ground classes (`.ground-dark`, `.ground-light`) remap `--bg`, `--surface`, `--text-*`, `--divider`, and shadow tokens so any component drops into either chapter unchanged.
