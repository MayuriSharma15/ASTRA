/**
 * ProgressBar
 * -----------------------------------------------------------------------
 * Reusable animated progress bar — fills from 0 to its target percent
 * on mount via Framer Motion, rather than snapping to full width
 * instantly. Used by LearningProgressWidget, easily reusable for any
 * future percent-based display (resume completeness, roadmap progress).
 *
 * PROPS
 * @param {number} percent - 0 to 100
 * @param {'core'|'signal'|'rare'} [tone='core']
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const TONE_GRADIENT = {
  core: "from-accent-core to-accent-core-soft",
  signal: "from-accent-signal to-accent-signal-soft",
  rare: "from-accent-rare to-accent-rare",
};

export function ProgressBar({ percent, tone = "core" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full h-1.5 rounded-full bg-glass-fill overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`h-full rounded-full bg-gradient-to-r ${TONE_GRADIENT[tone]}`}
      />
    </div>
  );
}