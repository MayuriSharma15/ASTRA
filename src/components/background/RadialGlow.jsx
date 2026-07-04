/**
 * RadialGlow
 * -----------------------------------------------------------------------
 * A single soft radial light source, positioned anywhere in its
 * container. Distinct from AuroraGradient's multi-blob drifting system —
 * this is ONE deliberate, static (or gently pulsing) light, meant to sit
 * behind a specific focal element (the Hero's AI Core, a section's key
 * visual) to give it depth and a sense of being lit from within/behind.
 *
 * PROPS
 * @param {'core'|'signal'|'rare'} [tone='core']
 * @param {string} [size='60vw']         - diameter, any CSS length
 * @param {{top?: string, left?: string, right?: string, bottom?: string}} [position]
 *        - defaults to dead-center
 * @param {number} [opacity=0.4]
 * @param {boolean} [pulse=false]         - gentle breathing opacity loop
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { glowPulse } from "../../lib/motion";

const TONE_COLOR = {
  core: "rgba(124, 92, 252, 0.5)",
  signal: "rgba(34, 211, 238, 0.4)",
  rare: "rgba(236, 72, 153, 0.3)",
};

export function RadialGlow({
  tone = "core",
  size = "60vw",
  position,
  opacity = 0.4,
  pulse = false,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldPulse = pulse && !prefersReducedMotion;

  const resolvedPosition = position ?? {
    top: "50%",
    left: "50%",
  };

  const isCentered = !position;

  return (
    <motion.div
      aria-hidden="true"
      className={className ?? "absolute pointer-events-none rounded-full"}
      animate={shouldPulse ? glowPulse(5).animate : undefined}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${TONE_COLOR[tone]} 0%, transparent 70%)`,
        filter: "blur(60px)",
        opacity,
        transform: isCentered ? "translate(-50%, -50%)" : undefined,
        ...resolvedPosition,
      }}
    />
  );
}