/**
 * ScrollReveal
 * -----------------------------------------------------------------------
 * The standard entrance-animation wrapper used across almost every
 * section. Wraps children in a fadeInUp animation triggered by
 * whileInView.
 *
 * COMPOSITION PATTERN for staggered lists (feature cards, FAQ items):
 *   <ScrollReveal stagger>
 *     <ScrollReveal.Item>{cardA}</ScrollReveal.Item>
 *     <ScrollReveal.Item>{cardB}</ScrollReveal.Item>
 *   </ScrollReveal>
 * Non-stagger usage is just: <ScrollReveal>{content}</ScrollReveal>
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {boolean} [stagger=false]
 * @param {number} [staggerDelay=0.12]
 * @param {number} [delay=0]
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
  withReducedMotion,
} from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ScrollReveal({
  children,
  stagger = false,
  staggerDelay = 0.12,
  delay = 0,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();

  const variants = stagger
    ? withReducedMotion(staggerContainer(staggerDelay, delay), prefersReducedMotion)
    : withReducedMotion(fadeInUp, prefersReducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={!stagger ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollRevealItem({ children, className }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={withReducedMotion(fadeInUp, prefersReducedMotion)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

ScrollReveal.Item = ScrollRevealItem;