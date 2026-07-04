/**
 * useReducedMotion
 * -----------------------------------------------------------------------
 * Thin wrapper around Framer Motion's built-in useReducedMotion().
 *
 * WHY WRAP IT instead of importing framer-motion's version directly in
 * every component:
 *   1. Single import path (hooks/useReducedMotion) across the whole app —
 *      if we ever need to change the detection strategy (e.g. add a
 *      manual in-app "reduce motion" toggle in a future settings page),
 *      we change it here once, not in every component that checks motion.
 *   2. Pairs directly with withReducedMotion() in lib/motion.js — the
 *      two are designed to be used together:
 *
 *        const prefersReducedMotion = useReducedMotion();
 *        const variant = withReducedMotion(floatY(), prefersReducedMotion);
 *
 * USAGE:
 *   import { useReducedMotion } from '../hooks/useReducedMotion';
 *
 *   function OrbitModule() {
 *     const prefersReducedMotion = useReducedMotion();
 *     return (
 *       <motion.div
 *         animate={prefersReducedMotion ? {} : floatY().animate}
 *       >
 *         ...
 *       </motion.div>
 *     );
 *   }
 * ----------------------------------------------------------------------- */

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * @returns {boolean} true if the user's OS/browser has requested reduced
 * motion (prefers-reduced-motion: reduce). Ambient/looping animations
 * (float, spin, pulse) should be skipped or replaced with a simple fade
 * when this is true. Standard entrance fades are generally fine to keep.
 */
export function useReducedMotion() {
  const prefersReducedMotion = useFramerReducedMotion();
  return Boolean(prefersReducedMotion);
}