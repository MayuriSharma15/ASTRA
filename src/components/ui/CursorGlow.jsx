/**
 * CursorGlow
 * -----------------------------------------------------------------------
 * A soft violet light that follows the cursor with a slight spring lag —
 * an Arc Browser-style signature touch that reinforces the "futuristic,
 * premium" direction from the design brief.
 *
 * SAFETY / SCOPE:
 *   - Only renders on devices with a real mouse (`hover: hover` +
 *     `pointer: fine`). Touch devices have no cursor to follow, and
 *     forcing this on mobile would just be a dead, invisible listener.
 *   - Respects reduced motion — if active, this component renders
 *     nothing at all rather than showing a jarring static dot.
 *   - `pointer-events-none` + very low opacity + `mix-blend-mode` so it
 *     never interferes with clicking anything underneath it.
 *   - Uses spring physics (not 1:1 tracking) so it trails slightly
 *     behind the real cursor — an instant 1:1 follow reads as a visual
 *     glitch, a slight lag reads as intentional and premium.
 * ----------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    const hasRealMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(hasRealMouse);
    if (!hasRealMouse) return;

    function handleMove(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-background pointer-events-none rounded-full"
      style={{
        width: 400,
        height: 400,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}