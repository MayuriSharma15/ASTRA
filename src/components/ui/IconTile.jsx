/**
 * IconTile
 * -----------------------------------------------------------------------
 * A small glass-bounded square that houses a Lucide icon. Used anywhere
 * an icon needs visual weight and containment rather than floating bare:
 * feature card headers, the Hero's orbit modules, FAQ category markers.
 *
 * Kept deliberately separate from GlassCard rather than composed from it —
 * GlassCard is content-agnostic and rectangular-by-default; IconTile has
 * fixed, specific dimensions and always centers a single icon. Forcing
 * this through GlassCard's padding/layout system would fight its own
 * defaults more than it would save code.
 *
 * PROPS
 * @param {React.ElementType} icon      - a Lucide icon component (required)
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {'core'|'signal'|'rare'|'neutral'} [tone='core']
 * @param {boolean} [glow=false]         - ambient glow pulse (use sparingly —
 *                                          this is for the ONE hero-level
 *                                          icon, not every card icon)
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { glowPulse } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SIZE_MAP = {
  sm: { tile: "w-9 h-9", icon: 16, radius: "rounded-md" },
  md: { tile: "w-12 h-12", icon: 20, radius: "rounded-lg" },
  lg: { tile: "w-16 h-16", icon: 28, radius: "rounded-lg" },
};

const TONE_MAP = {
  core: "text-accent-core border-accent-core/30 bg-accent-core/10",
  signal: "text-accent-signal border-accent-signal/30 bg-accent-signal/10",
  rare: "text-accent-rare border-accent-rare/30 bg-accent-rare/10",
  neutral: "text-text-secondary border-glass-border bg-glass-fill",
};

export function IconTile({
  icon: Icon,
  size = "md",
  tone = "core",
  glow = false,
  className,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const { tile, icon: iconSize, radius } = SIZE_MAP[size];

  const glowAnimation =
    glow && !prefersReducedMotion ? glowPulse(4).animate : undefined;

  return (
    <motion.div
      animate={glowAnimation}
      className={cn(
        "flex items-center justify-center border backdrop-blur-glass shrink-0",
        tile,
        radius,
        TONE_MAP[tone],
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={iconSize} strokeWidth={1.75} aria-hidden="true" />}
    </motion.div>
  );
}