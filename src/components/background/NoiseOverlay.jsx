/**
 * NoiseOverlay
 * -----------------------------------------------------------------------
 * A faint film-grain texture laid over the whole background stack.
 *
 * WHY THIS LAYER EXISTS: large blurred gradients (AuroraGradient) render
 * completely flat and smooth by nature — on many displays this produces
 * visible "banding" (subtle stepped rings instead of a smooth gradient),
 * and it also just reads as digitally sterile. A very faint noise
 * texture breaks up that flatness and is a large part of why premium
 * dark UIs (Linear, Arc, Vercel's marketing pages) feel tactile instead
 * of like a flat PNG.
 *
 * IMPLEMENTATION: generated via SVG feTurbulence, applied once as a
 * repeating background — not re-generated per frame, not animated by
 * default (grain "crawl" animation is a deliberate future option via
 * `animated`, off by default since it costs a repaint loop for a very
 * marginal visual gain).
 *
 * PROPS
 * @param {number} [opacity=0.04]   - kept intentionally very low; this
 *                                     should be felt, not seen
 * @param {boolean} [animated=false]
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function NoiseOverlay({ opacity = 0.04, animated = false, className }) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <motion.div
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full pointer-events-none"}
      style={{
        opacity,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
      animate={
        shouldAnimate
          ? { backgroundPosition: ["0px 0px", "120px 120px"] }
          : undefined
      }
      transition={
        shouldAnimate
          ? { duration: 8, repeat: Infinity, ease: "linear" }
          : undefined
      }
    />
  );
}