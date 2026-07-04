/**
 * ASTRA Motion Library
 * -----------------------------------------------------------------------
 * Reusable Framer Motion variant objects. Components import these instead
 * of hand-writing `variants={{ ... }}` inline every time — this is what
 * keeps 20+ components feeling like ONE coherent motion language instead
 * of 20 slightly-different guesses at "premium easing."
 *
 * RULE: if a component needs motion behavior that doesn't exist here,
 * add it here first, then import it. Never inline a bespoke variants
 * object inside a section/ui component — that's how motion drifts out
 * of sync across the app.
 *
 * All numeric values (duration, easing, spring) are sourced from
 * config/theme.js, which itself mirrors styles/tokens.css.
 * ----------------------------------------------------------------------- */

import { easing, duration, springs } from "../config/theme";

/* ==========================================================================
   ENTRANCE VARIANTS
   Used with whileInView / initial+animate. Standard pattern across the
   app: element starts slightly offset + transparent, settles into place.
   ========================================================================== */

/** Fade + rise — the default entrance for most content blocks (cards,
 *  headings, paragraphs). Subtle 24px rise, never a dramatic slide. */
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outSoft },
  },
};

/** Pure fade — for elements where vertical motion would feel wrong
 *  (e.g. background layers, full-bleed sections). */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.outSoft },
  },
};

/** Scale + fade — for glass cards, modules, anything that should feel
 *  like it's materializing rather than sliding in. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.outSoft },
  },
};

/** Stagger container — wrap a list of children (feature cards, orbit
 *  modules, FAQ items) in a parent with this variant, give each child
 *  fadeInUp, and they cascade in sequence instead of popping together. */
export const staggerContainer = (staggerDelay = 0.12, initialDelay = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

/* ==========================================================================
   AMBIENT / LOOPING VARIANTS
   For motion that runs continuously — orbit drift, glow pulse, floating
   modules. These use the "gentle" spring feel and long durations so they
   read as ATMOSPHERE, not as something demanding attention.
   ========================================================================== */

/** Gentle vertical float — hero orbit modules, floating background
 *  elements. Small amplitude on purpose: this should feel like the
 *  element is breathing, not bobbing in a pool. */
export const floatY = (amplitude = 12, loopDuration = 6) => ({
  animate: {
    y: [0, -amplitude, 0],
    transition: {
      duration: loopDuration,
      repeat: Infinity,
      ease: easing.inOutSoft,
    },
  },
});

/** Glow pulse — animates opacity of a glow layer in a slow loop.
 *  Pair with a box-shadow utility (shadow-glow-core-md) on the element;
 *  this variant animates the opacity of that glow, not the shadow value
 *  itself, which is cheaper for the browser to composite. */
export const glowPulse = (loopDuration = 4) => ({
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: loopDuration,
      repeat: Infinity,
      ease: easing.inOutSoft,
    },
  },
});

/** Continuous rotation — for orbit rings / the AI Core's outer rings.
 *  Linear easing is intentional here (the one place we break from
 *  standard easing) because organic easing on a full rotation loop
 *  reads as stuttering, not smooth. */
export const orbitSpin = (loopDuration = 20, direction = 1) => ({
  animate: {
    rotate: direction * 360,
    transition: {
      duration: loopDuration,
      repeat: Infinity,
      ease: "linear",
    },
  },
});

/* ==========================================================================
   INTERACTION VARIANTS
   Applied via whileHover / whileTap directly on interactive elements.
   Snappy spring — confident, quick settle, not sluggish.
   ========================================================================== */

export const hoverLift = {
  whileHover: { y: -4, transition: springs.snappy },
  whileTap: { y: 0, scale: 0.98, transition: springs.snappy },
};

export const hoverGlow = {
  whileHover: { scale: 1.03, transition: springs.snappy },
  whileTap: { scale: 0.97, transition: springs.snappy },
};

/* ==========================================================================
   VIEWPORT CONFIG
   Standard trigger config for whileInView-based reveals — animate once,
   never re-trigger on scroll-up (re-triggering reads as cheap/gimmicky).
   ========================================================================== */

export const viewportOnce = {
  once: true,
  amount: 0.3,
};

/* ==========================================================================
   REDUCED MOTION HELPER
   Given any variant object above, returns a stripped-down version that
   only animates opacity — used by components via the useReducedMotion
   hook (hooks/useReducedMotion.js, next in the build queue) so ambient
   motion (float/spin/pulse) simply doesn't run for users who've asked
   the OS for reduced motion.
   ========================================================================== */

export function withReducedMotion(variant, prefersReducedMotion) {
  if (!prefersReducedMotion) return variant;

  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
    animate: { opacity: 1, transition: { duration: 0.01 } },
  };
}