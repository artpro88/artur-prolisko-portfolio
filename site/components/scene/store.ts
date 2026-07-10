/**
 * Mutable scene state shared between DOM observers and the R3F frame loop.
 * A plain module object (not React state) so per-frame reads cost nothing
 * and DOM-side writes never trigger re-renders.
 */
export const sceneState = {
  /** id of the chapter currently dominating the viewport */
  chapter: "hero",
  /** active timeline role (0 = latest/Fitzdares … 6 = earliest) */
  roleIndex: 0,
};

// debug handle for dev-tools/browser verification
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).__sceneState = sceneState;
}
