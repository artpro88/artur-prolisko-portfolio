/**
 * Chapter sections are often TALLER than the viewport (Work ~2.3×, Brands,
 * Achievements…), so an IntersectionObserver threshold like 0.45 can never
 * fire — max ratio for a tall section is viewport/height. Every section
 * observer must therefore test *viewport coverage* (how much of the SCREEN
 * the section fills) alongside the target ratio, with thresholds dense
 * enough that a coverage crossing is observed soon after it happens.
 */
export const SPY_THRESHOLDS = [
  0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7,
];

/** Fraction of the viewport this entry's section currently fills (0..1). */
export function viewportCoverage(e: IntersectionObserverEntry): number {
  const vh = e.rootBounds?.height || window.innerHeight || 1;
  return e.intersectionRect.height / vh;
}

/** The section owns the screen: it fills most of the viewport, or (for
 *  short sections that can't) most of the section is visible. */
export function sectionDominant(e: IntersectionObserverEntry): boolean {
  return viewportCoverage(e) >= 0.5 || e.intersectionRatio >= 0.45;
}

/** The section is effectively gone from the screen. */
export function sectionGone(e: IntersectionObserverEntry): boolean {
  return e.intersectionRatio <= 0.15 && viewportCoverage(e) <= 0.15;
}
