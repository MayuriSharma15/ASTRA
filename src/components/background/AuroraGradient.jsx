/**
 * AuroraGradient
 * -----------------------------------------------------------------------
 * Large, heavily-blurred color blobs that drift slowly — the layer that
 * gives ASTRA's background its "aurora" character (violet/cyan/pink
 * bleeding softly into the void, never as flat solid shapes).
 *
 * IMPLEMENTATION NOTE: blobs are plain divs with radial-gradient
 * backgrounds + a large blur filter, animated via Framer Motion
 * transform/opacity only (never top/left) — transform animations are
 * GPU-composited and don't trigger layout, which matters a lot here
 * since these elements are large enough that layout thrashing would be
 * very visible in frame timing.
 *
 * REDUCED MOTION: blobs render in their resting position with full
 * opacity, just without the drift loop — the aurora atmosphere stays,
 * only the movement stops.
 *
 * PROPS
 * @param {number} [intensity=1]   - overall opacity multiplier (0–1+),
 *                                    lets a section dial the effect down
 *                                    without touching color values
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const BLOBS = [
  {
    id: "core",
    color: "rgba(124, 92, 252, 0.35)", // accent-core
    size: "45vw",
    position: { top: "-10%", left: "10%" },
    driftRange: [0, 40, -20, 0],
    duration: 22,
  },
  {
    id: "signal",
    color: "rgba(34, 211, 238, 0.25)", // accent-signal
    size: "38vw",
    position: { top: "20%", right: "5%" },
    driftRange: [0, -30, 25, 0],
    duration: 26,
  },
  {
    id: "rare",
    color: "rgba(236, 72, 153, 0.15)", // accent-rare — kept faint, this
    // color is "rare" by design (see tokens.css hierarchy comment)
    size: "30vw",
    position: { bottom: "-5%", left: "35%" },
    driftRange: [0, 20, -15, 0],
    duration: 30,
  },
];

export function AuroraGradient({ intensity = 1, className }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full overflow-hidden"}
      style={{ opacity: intensity }}
    >
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.id}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: blob.driftRange,
                  y: blob.driftRange.map((v) => v * 0.6),
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            ...blob.position,
          }}
        />
      ))}
    </div>
  );
}