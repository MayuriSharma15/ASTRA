
/**
 * GridOverlay
 * -----------------------------------------------------------------------
 * A faint linear grid across the background — reinforces ASTRA's
 * "Operating System" identity (schematic, structured, precise) rather
 * than a purely decorative marketing background. Paired with the mono
 * utility font and eyebrow badges, this is one of three deliberate
 * details (see Badge.jsx, tokens.css font-mono comment) that make the
 * site feel like a system, not a chatbot skin.
 *
 * FADE MASK: the grid fades toward the edges via a radial mask rather
 * than cutting off sharply — a hard-edged grid reads as a debug overlay
 * left on by accident; a faded one reads as intentional atmosphere.
 *
 * PROPS
 * @param {number} [cellSize=64]    - grid cell size in px
 * @param {number} [opacity=0.05]
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

export function GridOverlay({ cellSize = 64, opacity = 0.05, className }) {
  return (
    <div
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full pointer-events-none"}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(to right, var(--glass-border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--glass-border) 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
      }}
    />
  );
}