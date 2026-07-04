/**
 * OrbitModule
 * -----------------------------------------------------------------------
 * A single floating career-module icon positioned around the AI Core.
 * Position is calculated from polar coordinates (angle + radius) rather
 * than hardcoded top/left values per module — this means the whole
 * orbit ring can be resized (e.g. smaller radius on mobile) by changing
 * ONE number, not five individual position overrides.
 *
 * MOTION: each module floats independently (staggered delay based on
 * its index) so they don't all bob in perfect unison — perfect
 * synchronization across 5 elements reads as robotic, not organic.
 * A hover state lifts + glows the module, inviting interaction even
 * though Phase 1 has no click behavior yet (that's Phase 2's dashboard
 * routing — the hover affordance previews that these WILL be clickable).
 *
 * PROPS
 * @param {{id, label, icon, angle, radiusFactor}} module
 * @param {number} radius - base orbit radius in px
 * @param {number} index  - used to offset float animation timing
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { IconTile } from "../ui/IconTile";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { springs } from "../../config/theme";

export function OrbitModule({ module, radius, index }) {
  const prefersReducedMotion = useReducedMotion();
  const { label, icon: Icon, angle, radiusFactor } = module;

  const effectiveRadius = radius * radiusFactor;
  const radians = (angle - 90) * (Math.PI / 180); // -90 so angle 0 = top
  const x = Math.cos(radians) * effectiveRadius;
  const y = Math.sin(radians) * effectiveRadius;

  const floatDelay = index * 0.4;
  const floatDuration = 5 + index * 0.6; // slightly different per module

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex flex-col items-center gap-2"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + index * 0.1, ...springs.snappy }}
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -10, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: floatDuration,
                delay: floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        whileHover={{ scale: 1.12 }}
        className="cursor-default"
      >
        <IconTile icon={Icon} size="md" tone="signal" />
      </motion.div>
      <span className="font-mono-label text-[10px] text-text-tertiary whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}