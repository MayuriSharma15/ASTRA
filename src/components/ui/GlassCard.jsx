/**
 * GlassCard
 * -----------------------------------------------------------------------
 * The foundational glass-surface primitive used across ASTRA — feature
 * cards, testimonial cards, orbit modules, FAQ items all sit on this.
 *
 * DESIGN NOTE: glassmorphism reads as "premium" only with three things
 * present together — low-opacity fill, a visible border, and an inner
 * top-edge highlight. Any one alone looks like a flat grey box. This
 * component bakes all three in via tokens, so no consumer can
 * accidentally ship a "glass" surface missing one of them.
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {string} [className]        - extra classes merged onto the root
 * @param {boolean} [hover=true]       - enables lift + glow on hover
 * @param {'none'|'core'|'signal'} [glow='none'] - ambient glow color, if any
 * @param {'sm'|'md'|'lg'} [padding='md']
 * @param {React.ElementType} [as='div'] - render as a different element
 *   (e.g. 'article' for feature cards, semantic HTML matters for a11y)
 * @param {() => void} [onClick]
 * ----------------------------------------------------------------------- */

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { hoverLift } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PADDING_MAP = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const GLOW_MAP = {
  none: "",
  core: "shadow-glow-core-sm hover:shadow-glow-core-md",
  signal: "shadow-glow-signal-sm hover:shadow-glow-signal-md",
};

export const GlassCard = forwardRef(function GlassCard(
  {
    children,
    className,
    hover = true,
    glow = "none",
    padding = "md",
    as = "div",
    onClick,
    ...rest
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  const interactionProps =
    hover && !prefersReducedMotion
      ? { whileHover: hoverLift.whileHover, whileTap: hoverLift.whileTap }
      : {};

  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={cn(
        // Base glass surface — fill + border + blur, always present
        "relative rounded-lg border transition-colors duration-base",
        "bg-glass-fill border-glass-border backdrop-blur-glass",
        hover && "hover:bg-glass-fill-hover hover:border-glass-border-strong",
        // Inner top-edge highlight — a 1px gradient line simulating light
        // catching the top edge of glass. This is the detail that sells it.
        "before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:via-glass-highlight before:to-transparent",
        "before:rounded-t-lg",
        GLOW_MAP[glow],
        PADDING_MAP[padding],
        onClick && "cursor-pointer",
        className
      )}
      {...interactionProps}
      {...rest}
    >
      {children}
    </Component>
  );
});