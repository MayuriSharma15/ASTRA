/**
 * ASTRA Theme Config (JS mirror of tokens.css)
 * -----------------------------------------------------------------------
 * Framer Motion animates numeric values directly and can't read CSS
 * custom properties inside `transition={{ ... }}` configs. This file
 * mirrors the values in tokens.css that motion code needs.
 *
 * RULE: if you change a color/spacing/radius token, change it in
 * tokens.css. Only DURATION, EASING, and SPRING values need to be kept
 * in sync here, since those are the only ones Framer Motion consumes
 * directly as JS values.
 * ----------------------------------------------------------------------- */

export const colors = {
  bgVoid: "#05050a",
  bgAbyss: "#0a0e1f",
  bgElevated: "#10142b",
  accentCore: "#7c5cfc",
  accentCoreSoft: "#9b82ff",
  accentSignal: "#22d3ee",
  accentSignalSoft: "#67e8f9",
  accentRare: "#ec4899",
  textPrimary: "#f5f5fa",
  textSecondary: "#a0a3bd",
  textTertiary: "#62657d",
};

/** Easing curves — mirrors tokens.css, expressed as arrays for Framer Motion */
export const easing = {
  standard: [0.22, 1, 0.36, 1],
  outSoft: [0.16, 1, 0.3, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
};

/** Durations in seconds (Framer Motion uses seconds, not ms) */
export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  ambient: 8,
};

/** Spring presets — the two "feels" ASTRA uses everywhere.
 *  snappy: micro-interactions, hover, tap — confident, quick settle
 *  gentle: ambient motion — orbit drift, float, glow pulse
 */
export const springs = {
  snappy: { type: "spring", stiffness: 260, damping: 20 },
  gentle: { type: "spring", stiffness: 80, damping: 14 },
};

/** Standard scroll-reveal transition — the single config every
 *  <ScrollReveal> instance should reference so tuning is centralized. */
export const revealTransition = {
  duration: duration.slow,
  ease: easing.outSoft,
};

/** Reusable viewport config for whileInView triggers — animate once,
 *  don't re-trigger on scroll-up (re-triggering reads as cheap). */
export const viewportOnce = {
  once: true,
  amount: 0.3,
};

const theme = { colors, easing, duration, springs, revealTransition, viewportOnce };

export default theme;