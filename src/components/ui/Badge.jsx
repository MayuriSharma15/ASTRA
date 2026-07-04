/**
 * Badge
 * -----------------------------------------------------------------------
 * Small pill-shaped label. Two real use cases across the site:
 *
 *   1. Eyebrow labels above headings — e.g. a small "AI CAREER OS" tag
 *      sitting above the Hero headline. Uses the mono utility face on
 *      purpose (see font-mono-label in globals.css) — this is one of
 *      the moments that reinforces ASTRA's "Operating System" identity
 *      rather than reading as a generic marketing tag.
 *   2. Status/category tags — e.g. tagging a testimonial's role, or a
 *      FAQ item's category. Uses the body face, no uppercase.
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {'core'|'signal'|'rare'|'neutral'} [tone='neutral']
 * @param {'eyebrow'|'tag'} [variant='tag']
 * @param {React.ElementType} [icon]   - optional small leading Lucide icon
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { cn } from "../../utils/cn";

const TONE_MAP = {
  core: "text-accent-core border-accent-core/30 bg-accent-core/10",
  signal: "text-accent-signal border-accent-signal/30 bg-accent-signal/10",
  rare: "text-accent-rare border-accent-rare/30 bg-accent-rare/10",
  neutral: "text-text-secondary border-glass-border bg-glass-fill",
};

export function Badge({
  children,
  tone = "neutral",
  variant = "tag",
  icon: Icon,
  className,
  ...rest
}) {
  const isEyebrow = variant === "eyebrow";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border backdrop-blur-glass",
        "px-3 py-1 text-xs",
        isEyebrow ? "font-mono-label tracking-wide" : "font-body",
        TONE_MAP[tone],
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={12} strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  );
}