/**
 * Button
 * -----------------------------------------------------------------------
 * Core interactive primitive. Three variants covering every action
 * hierarchy the site needs — retrofitting a variant system after dozens
 * of raw <button> usages exist is expensive, so it's built in now even
 * though Phase 1 only has a couple of real CTAs (Hero, Navbar).
 *
 * VARIANTS
 *   primary   - solid violet fill, glow on hover. The ONE action per
 *               screen that matters most (e.g. "Get Started").
 *   secondary - glass surface, border. Supporting actions.
 *   ghost     - text-only, no surface. Tertiary actions, nav links.
 *
 * SIZES: sm / md / lg
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {'primary'|'secondary'|'ghost'} [variant='primary']
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {React.ElementType} [icon]     - optional Lucide icon component
 * @param {'left'|'right'} [iconPosition='right']
 * @param {boolean} [disabled=false]
 * @param {boolean} [fullWidth=false]
 * @param {string} [className]
 * @param {() => void} [onClick]
 * @param {'button'|'submit'} [type='button']
 * ----------------------------------------------------------------------- */

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { hoverGlow } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const VARIANT_STYLES = {
  primary: cn(
    "bg-accent-core text-text-on-accent font-medium",
    "shadow-glow-core-sm hover:shadow-glow-core-md",
    "hover:bg-accent-core-soft"
  ),
  secondary: cn(
    "bg-glass-fill border border-glass-border text-text-primary",
    "hover:bg-glass-fill-hover hover:border-glass-border-strong",
    "backdrop-blur-glass"
  ),
  ghost: cn(
    "bg-transparent text-text-secondary",
    "hover:text-text-primary"
  ),
};

const SIZE_STYLES = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-base px-6 py-3 gap-2",
  lg: "text-lg px-8 py-4 gap-2.5",
};

const ICON_SIZE = {
  sm: 16,
  md: 18,
  lg: 20,
};

export const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "right",
    disabled = false,
    fullWidth = false,
    className,
    onClick,
    type = "button",
    ...rest
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();

  const interactionProps =
    !disabled && !prefersReducedMotion
      ? { whileHover: hoverGlow.whileHover, whileTap: hoverGlow.whileTap }
      : {};

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        "font-body transition-colors duration-base ease-standard",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      {...interactionProps}
      {...rest}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={ICON_SIZE[size]} aria-hidden="true" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={ICON_SIZE[size]} aria-hidden="true" />
      )}
    </motion.button>
  );
});