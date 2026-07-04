/**
 * TestimonialCard
 * -----------------------------------------------------------------------
 * Single testimonial. Avatar is an initials tile (colored gradient
 * circle) rather than a photo — Phase 1 has no image asset pipeline,
 * and initials avatars are a legitimate, common pattern (Linear, Slack)
 * rather than a placeholder-looking stand-in.
 *
 * PROPS
 * @param {{name, role, quote, initials}} testimonial
 * ----------------------------------------------------------------------- */

import { Quote } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function TestimonialCard({ testimonial }) {
  const { name, role, quote, initials } = testimonial;

  return (
    <GlassCard padding="lg" hover={false} className="h-full flex flex-col">
      <Quote size={28} className="text-accent-core/50" strokeWidth={1.5} />

      <p className="mt-4 text-text-secondary font-body text-sm leading-relaxed flex-1">
        "{quote}"
      </p>

      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-glass-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-accent-core to-accent-signal text-text-on-accent font-display font-semibold text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-text-primary font-body font-medium text-sm">{name}</p>
          <p className="text-text-tertiary font-body text-xs">{role}</p>
        </div>
      </div>
    </GlassCard>
  );
}
