/**
 * PageTransition
 * -----------------------------------------------------------------------
 * Wraps the entire app content in a single fade-in on initial mount —
 * without this, the page just "snaps" into existence the instant React
 * hydrates, which reads as abrupt compared to a soft fade. This is a
 * ONE-TIME entrance (not scroll-triggered like ScrollReveal), so it uses
 * plain initial/animate rather than whileInView.
 *
 * Kept as its own tiny wrapper rather than folded into App.jsx directly
 * so the fade timing/easing is defined in exactly one place, consistent
 * with how every other animation in this project is centralized rather
 * than inlined at the point of use.
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}