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

## 2. Color tokens — Luxury (obsidian · champagne · bordeaux · platinum)

> **Revised Jul 2026 (Artur):** the yellow/blue of the old site AND the emerald-green/cyan of the first concept are **dropped.** The palette is now a jewel-toned luxury system — **matte obsidian, champagne gold, deep bordeaux (casino red), and platinum.** No green, no yellow, no saturated "gaming" colour.

### Neutrals (grounds & surfaces)
| Token | Hex | Use |
|-------|-----|-----|
| `--obsidian` | `#0B0C10` | Matte black — primary dark ground |
| `--onyx` | `#131419` | Dark surface |
| `--graphite` | `#1B1D24` | Dark cards |
| `--charcoal` | `#2A2E3A` | Borders/dividers, rail track (dark) |
| `--alabaster` | `#EDEAE3` | Warm stone — light ground |
| `--pearl` | `#F6F4EF` | Lightest surface / logo chips |
| `--platinum` | `#C9CBD1` | Cool metallic neutral / highlight |

### Text
| Token | On dark | On light |
|-------|---------|----------|
| `--text-primary` | `#F4F2EC` (warm white) | `#16171C` |
| `--text-secondary` | `#B7B4AC` | `#4A4C55` |
| `--text-muted` | `#7C7A73` | `#8A8880` |

### Accents (used sparingly)
| Token | Hex | Meaning / use |
|-------|-----|---------------|
| `--champagne` | `#C8A24C` | **Primary accent** — interactive, highlights, timeline fill, eyebrows |
| `--champ-hi` | `#E4C878` | Champagne highlight / glow / hover |
| `--gold-soft` | `#B8912F` | Deep gold — metrics on light grounds |
| `--bordeaux` | `#7A2233` | **Secondary accent** — casino red; "ignite," roulette, secondary tags |
| `--bordeaux-hi` | `#9C3247` | Bordeaux highlight/hover |
| `--platinum` | `#C9CBD1` | Metallic neutral / glass reflection |

### Accent usage rule
- **Champagne is the default interactive/highlight accent**; **bordeaux** is the secondary (casino red) reserved for accents, "ignite" moments, roulette/live-casino motifs. **Platinum** is a metallic neutral.
- **Never** more than two accents visible in one viewport; gold + bordeaux is the signature pairing.
- Keep reds **deep** (bordeaux/oxblood), never bright pillar-box red. Everything muted toward luxury.

### Gradients & effects (restrained)
- `--grad-accent`: `linear-gradient(100deg, var(--champ-hi), var(--bordeaux-hi))` (hero headline, timeline fill).
- `--glow-gold`: radial `rgba(200,162,76,.30)` → transparent (metrics, active timeline node).
- `--glow-bordeaux`: radial `rgba(122,34,51,.28)` → transparent (live-casino / ignite).
- `--glass-dark`: `rgba(19,20,25,.55)` + `backdrop-blur(20px)` + 1px `rgba(255,255,255,.06)` inset.
- `--glass-light`: `rgba(246,244,239,.6)` + `backdrop-blur(20px)` + 1px `rgba(22,23,28,.05)` inset.
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
- **Primary:** champagne→gold-soft gradient fill, text `#1A1405`, radius-md, 44–52px tall; hover = brighten + gold glow + 2px lift.
- **Secondary (ghost):** 1px border (`--charcoal` on dark / `--platinum` on light), transparent fill; hover = fill 6% champagne.
- **Text link:** underline draws left→right on hover (0→100% width, 200ms).
- Focus: 2px champagne ring + 2px offset (both grounds).

### Cards (work / metric / credential)
- Surface = `--graphite` (dark) / `--pearl` (light); radius-lg; elev-1.
- Optional glass variant for overlays.
- Hover = **enhancement only** (elev-2 + lift + cover parallax). **Never** gate primary content behind hover — see §5a.

### Nav
- Top bar → translucent glass pill on scroll (`--glass-*`).
- Monogram "AP" mark left; 4 act-links center (desktop); Contact button right.
- Right-edge chapter rail: 14 nodes, active = champagne; label on hover (desktop) / omitted on touch.

### Chapter rail node
- 6px dot default; active = champagne + scale 1.5; title tooltip on hover (desktop only).

### Metric tile (Achievements)
- Mono label (uppercase, always visible) + metric number (count-up) + one-line context (always visible).
- Hero metrics get `--glow-gold`; secondary metrics use `--bordeaux`.

### Logo lockup (Brands & Timeline)
- **Real company logo** placed on a `--pearl` "chip" (rounded, padded) so any logo colour reads on any ground. Fitzdares (no asset) → letter-spaced wordmark.
- **All brand info — role, years, impact — is visible by default.** No hover-reveal (see §5a).

### Iconography
- **Line icons, 1.5px stroke, rounded joins, 24px grid.** Set: Lucide (open-source, consistent) — customised stroke to match. Icons are quiet/utility only (nav, scroll cue, contact, external-link). **No filled/colored icon illustrations.**
- 3D objects — not icons — carry the visual storytelling.

## 5a. Mobile-first rule — no hover-only content (mandatory)

> **Artur, Jul 2026:** important information must be **visible by default**, because touch devices have no hover.

- **Never** place primary content (a role, impact line, project title, metric, contact detail) behind `:hover`, a tooltip, or a flip. Hover/tap may only **enhance** what is already shown (a lift, a glow, a parallax nudge, "view case study").
- Anything that would have been a hover-reveal becomes **always-on** on the card.
- Applies especially to **Brands** and the **Timeline** — role, company, years, and impact are printed on the card at rest.
- Touch targets ≥ 44×44px; the right-edge chapter rail is decorative on mobile (replaced by a progress bar).

## 5b. Imagery direction (storytelling)

- **Use Artur's real product screenshots** — betslip, freebets/boosts, cash out, search/in-play (SG Digital / Fitzdares sportsbook) — retouched into the luxury frame: colour-graded toward the palette, placed in dark device/card frames, generous margins. These carry the sportsbook/casino/live-casino story far better than abstract shapes.
- Reuse the current site's assets (see `asset-inventory.md`) but **polish**: crop the old yellow/white backgrounds into framed cards, unify to the palette, add soft platinum edge + shadow.
- Motion and 3D should reference **sportsbook & casino motifs** (roulette, chips, cards, live-odds tickers) — not generic geometry (see `12-3d-concept.md`).

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
- **Materials:** physically-based; brushed-metal + smoked-glass + subtle emissive edges. Champagne/bordeaux emissive only on "ignite."
- **Lighting:** single warm key + cool rim; environment reflections for luxury; lighting shifts warmer/cooler with light/dark grounds.
- **Restraint:** low object count, high material quality. Never fills the frame; always yields to content.
- **Performance:** capped DPR, instanced tokens, lazy-init after hero paint, mobile fallback. Full spec in `12-3d-concept.md`.

---

## 8. Token starter (for implementation)

```css
@theme {
  /* neutrals */
  --color-obsidian:#0B0C10; --color-onyx:#131419;
  --color-graphite:#1B1D24; --color-charcoal:#2A2E3A;
  --color-alabaster:#EDEAE3; --color-pearl:#F6F4EF; --color-platinum:#C9CBD1;
  /* accents */
  --color-champagne:#C8A24C; --color-champ-hi:#E4C878; --color-gold-soft:#B8912F;
  --color-bordeaux:#7A2233; --color-bordeaux-hi:#9C3247;
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
