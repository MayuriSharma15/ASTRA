/**
 * FeatureCard
 * -----------------------------------------------------------------------
 * Single card in the Features grid. Composes existing primitives
 * (GlassCard + IconTile) rather than introducing new styling — this is
 * exactly the payoff of building a primitive layer first: this
 * component is almost pure composition, no new visual decisions needed.
 *
 * PROPS
 * @param {{icon, tone, title, description}} feature
 * ----------------------------------------------------------------------- */

import { GlassCard } from "../ui/GlassCard";
import { IconTile } from "../ui/IconTile";

export function FeatureCard({ feature }) {
  const { icon: Icon, tone, title, description } = feature;

  return (
    <GlassCard glow={tone === "rare" ? "none" : tone} padding="lg" className="h-full">
      <IconTile icon={Icon} tone={tone} size="md" />
      <h3 className="mt-5 font-display font-semibold text-xl text-text-primary">
        {title}
      </h3>
      <p className="mt-3 text-text-secondary font-body text-sm leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
