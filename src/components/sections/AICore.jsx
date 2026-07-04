/**
 * AICore
 * -----------------------------------------------------------------------
 * The Hero's centerpiece — deliberately built as a layered "energy
 * reactor" rather than a single glowing circle, per the brief's
 * explicit direction: "should feel like an energy reactor, not a
 * glowing circle."
 *
 * STRUCTURE (back to front):
 *   1. Outer ambient glow (soft, large, pulsing)
 *   2. Three concentric rotating rings, each a different speed/direction
 *      and dash pattern — this asymmetry is what reads as mechanical/
 *      energetic rather than a static decorative ring
 *   3. Two small "energy particles" riding along ring paths
 *   4. Inner core — bright gradient orb with the ASTRA mark, pulsing
 *
 * Rings are separate SVGs (not one SVG with multiple animated groups)
 * so each can rotate independently via its own Framer Motion transform —
 * simpler to reason about than nested SVG transform-origin math.
 *
 * PROPS
 * @param {number} [size=280] - core diameter in px (Hero controls this
 *                                responsively via a wrapper, not this
 *                                component switching size itself)
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { Orbit } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { orbitSpin, glowPulse } from "../../lib/motion";

const RINGS = [
  { sizeRatio: 1, dash: "1 14", strokeWidth: 1.5, duration: 24, direction: 1, opacity: 0.5 },
  { sizeRatio: 0.78, dash: "6 10", strokeWidth: 1.5, duration: 18, direction: -1, opacity: 0.4 },
  { sizeRatio: 0.56, dash: "3 3", strokeWidth: 1, duration: 12, direction: 1, opacity: 0.6 },
];

export function AICore({ size = 280 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Ambient outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,252,0.45) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={prefersReducedMotion ? undefined : glowPulse(5).animate}
      />

      {/* Rotating rings */}
      {RINGS.map((ring, i) => {
        const ringSize = size * ring.sizeRatio;
        const spin = orbitSpin(ring.duration, ring.direction);
        return (
          <motion.svg
            key={i}
            width={ringSize}
            height={ringSize}
            viewBox="0 0 100 100"
            className="absolute"
            animate={prefersReducedMotion ? undefined : spin.animate}
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="var(--color-accent-signal)"
              strokeWidth={ring.strokeWidth}
              strokeDasharray={ring.dash}
              opacity={ring.opacity}
            />
          </motion.svg>
        );
      })}

      {/* Energy particles riding the outermost ring */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-accent-signal"
            style={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 12px var(--color-accent-signal)",
            }}
          />
        </motion.div>
      )}

      {/* Inner core */}
      <motion.div
        className="relative flex items-center justify-center rounded-full border border-accent-core/40"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background:
            "radial-gradient(circle at 35% 30%, rgba(155,130,255,0.9) 0%, rgba(124,92,252,0.6) 45%, rgba(124,92,252,0.15) 100%)",
        }}
        animate={prefersReducedMotion ? undefined : glowPulse(4).animate}
      >
        <div className="absolute inset-0 rounded-full shadow-glow-core-lg" />
        <Orbit
          size={size * 0.14}
          strokeWidth={1.5}
          className="text-text-on-accent relative z-10"
        />
      </motion.div>
    </div>
  );
}
