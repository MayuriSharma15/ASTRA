/**
 * FloatingParticles
 * -----------------------------------------------------------------------
 * Small glowing dots that drift slowly upward and fade, like embers or
 * light dust — distinct from StarField (which twinkles in place).
 * This layer adds a sense of vertical depth/movement to the background
 * that a static starfield alone doesn't provide.
 *
 * Rendered as actual DOM nodes (not canvas) because the count is low
 * (12–20 by default) and each needs an independent Framer Motion loop
 * with its own random timing — at this count the perf tradeoff that
 * justified canvas in StarField doesn't apply.
 *
 * REDUCED MOTION: particles render at rest (visible, static) rather than
 * being removed — consistent with every other layer's reduced-motion
 * behavior in this system.
 *
 * PROPS
 * @param {number} [count=16]
 * @param {'core'|'signal'|'mixed'} [tone='mixed']
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const TONE_COLORS = {
  core: ["rgba(124, 92, 252, 0.6)"],
  signal: ["rgba(34, 211, 238, 0.6)"],
  mixed: ["rgba(124, 92, 252, 0.6)", "rgba(34, 211, 238, 0.5)"],
};

export function FloatingParticles({ count = 16, tone = "mixed", className }) {
  const prefersReducedMotion = useReducedMotion();
  const colors = TONE_COLORS[tone];

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: Math.random() * 40 - 20,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, tone]
  );

  return (
    <div
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full overflow-hidden"}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.4 }
              : {
                  y: ["0%", "-120vh"],
                  x: [0, p.drift],
                  opacity: [0, 0.8, 0.8, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        />
      ))}
    </div>
  );
}