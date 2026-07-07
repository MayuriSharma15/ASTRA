/**
 * AICore
 * -----------------------------------------------------------------------
 * The Hero's centerpiece — a layered "energy reactor."
 *
 * STRUCTURE (back to front):
 *   1. Outer ambient glow (soft, large, pulsing)
 *   2. Whole-core breathing scale pulse (subtle — the entire reactor
 *      feels like it's idling, not just its individual pieces animating
 *      independently)
 *   3. Three concentric rotating rings, each a different speed/direction
 *      and dash pattern
 *   4. Two energy particles riding different rings in opposite
 *      directions — reads as active energy flow rather than a single
 *      decorative dot
 *   5. Inner core — bright gradient orb with the ASTRA mark, pulsing
 *
 * PROPS
 * @param {number} [size=280]
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { Orbit } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { orbitSpin, glowPulse } from "../../lib/motion";

const RINGS = [
  { sizeRatio: 1, dash: "1 14", strokeWidth: 1.5, duration: 24, direction: 1, opacity: 0.5 },
  { sizeRatio: 0.78, dash: "6 10", strokeWidth: 1.5, duration: 18, direction: -1, opacity: 0.45 },
  { sizeRatio: 0.56, dash: "3 3", strokeWidth: 1, duration: 12, direction: 1, opacity: 0.6 },
];

export function AICore({ size = 280 }) {
  const prefersReducedMotion = useReducedMotion();

  const breathe = prefersReducedMotion
    ? undefined
    : {
        scale: [1, 1.035, 1],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={breathe}
    >
      {/* Ambient outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,252,0.5) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={prefersReducedMotion ? undefined : glowPulse(4).animate}
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

      {/* Energy particle — outer ring, clockwise */}
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

      {/* Energy particle — middle ring, counter-clockwise, different
          speed so the two particles never sync up predictably */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute"
          style={{ width: size * 0.78, height: size * 0.78 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-core"
            style={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 10px var(--color-accent-core)",
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
        animate={prefersReducedMotion ? undefined : glowPulse(3.5).animate}
      >
        <div className="absolute inset-0 rounded-full shadow-glow-core-lg" />
        <Orbit
          size={size * 0.14}
          strokeWidth={1.5}
          className="text-text-on-accent relative z-10"
        />
      </motion.div>
    </motion.div>
  );
}