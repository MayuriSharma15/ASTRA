/**
 * PageBackground
 * -----------------------------------------------------------------------
 * Composes every background layer into one fixed, full-viewport system:
 *
 *   z-order (back to front):
 *   1. void base color (plain CSS, set on the fixed wrapper itself)
 *   2. AuroraGradient    - large drifting color blobs
 *   3. RadialGlow         - optional single focal light (off by default;
 *                            sections like Hero opt in via a prop)
 *   4. StarField           - twinkling points
 *   5. FloatingParticles    - drifting embers
 *   6. GridOverlay           - faint structural grid
 *   7. NoiseOverlay           - grain texture, topmost, blend-mode overlay
 *
 * WHY ONE FIXED COMPONENT INSTEAD OF PER-SECTION BACKGROUNDS: a single
 * fixed layer behind the entire scrolling page means the aurora/stars
 * drift continuously and consistently as the user scrolls, rather than
 * resetting or juddering at section boundaries. Individual sections can
 * still layer their own RadialGlow on top locally (see `focalGlow` prop)
 * for moments that need extra emphasis, like the Hero.
 *
 * EVERY LAYER IS INDIVIDUALLY TOGGLEABLE — per your requirement that the
 * background system be configurable, not a monolithic fixed image.
 *
 * PROPS
 * @param {boolean} [showStars=true]
 * @param {boolean} [showAurora=true]
 * @param {boolean} [showNoise=true]
 * @param {boolean} [showGrid=true]
 * @param {boolean} [showParticles=true]
 * @param {boolean} [focalGlow=false]     - adds a single centered RadialGlow,
 *                                           intended for Hero-level emphasis
 * @param {number} [auroraIntensity=1]
 * ----------------------------------------------------------------------- */

import { StarField } from "./StarField";
import { AuroraGradient } from "./AuroraGradient";
import { NoiseOverlay } from "./NoiseOverlay";
import { GridOverlay } from "./GridOverlay";
import { FloatingParticles } from "./FloatingParticles";
import { RadialGlow } from "./RadialGlow";

export function PageBackground({
  showStars = true,
  showAurora = true,
  showNoise = true,
  showGrid = true,
  showParticles = true,
  focalGlow = false,
  auroraIntensity = 1,
}) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full bg-bg-void z-background overflow-hidden"
    >
      {showAurora && <AuroraGradient intensity={auroraIntensity} />}
      {focalGlow && <RadialGlow tone="core" size="55vw" pulse opacity={0.35} />}
      {showStars && <StarField />}
      {showParticles && <FloatingParticles count={14} />}
      {showGrid && <GridOverlay />}
      {showNoise && <NoiseOverlay />}
    </div>
  );
}