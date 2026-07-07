/**
 * ScrollProgressBar
 * -----------------------------------------------------------------------
 * Thin gradient line fixed to the very top of the viewport, filling left
 * to right as the user scrolls through the page — a small but very
 * recognizable "polished product" signal (Linear, Medium, Vercel docs
 * all use this pattern). Reuses useScrollPosition's `progress` value
 * (0–1) rather than computing scroll math again here.
 *
 * Uses Framer Motion's useMotionValue-free approach — just re-renders
 * on scroll via the shared hook. Fine at this frequency since it's a
 * single, cheap transform update, not a layout-affecting change.
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export function ScrollProgressBar() {
  const { progress } = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 right-0 z-modal h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-accent-core to-accent-signal origin-left"
        style={{ scaleX: progress }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
}