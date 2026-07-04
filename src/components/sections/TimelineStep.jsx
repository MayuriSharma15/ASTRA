/**
 * TimelineStep
 * -----------------------------------------------------------------------
 * A single stage in the Journey timeline. Alternates left/right of the
 * center line on desktop (odd/even index), stacks single-column on
 * mobile where a left/right zigzag has no room to breathe.
 *
 * The connecting dot on the center line is a separate absolutely
 * positioned element so its position stays locked to the timeline line
 * regardless of how tall each step's content grows (long descriptions
 * don't push the dot out of alignment).
 *
 * PROPS
 * @param {{icon, title, description}} step
 * @param {number} index
 * ----------------------------------------------------------------------- */

import { IconTile } from "../ui/IconTile";
import { GlassCard } from "../ui/GlassCard";
import { ScrollReveal } from "../animations/ScrollReveal";
import { cn } from "../../utils/cn";

export function TimelineStep({ step, index }) {
  const { icon: Icon, title, description } = step;
  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Center line dot — desktop only, absolutely centered */}
      <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <div className="w-3 h-3 rounded-full bg-accent-core shadow-glow-core-sm ring-4 ring-bg-void" />
      </div>

      <div
        className={cn(
          "md:grid md:grid-cols-2 md:gap-12 items-center",
          !isEven && "md:[&>*:first-child]:order-2"
        )}
      >
        <ScrollReveal className={cn(isEven ? "md:text-right" : "md:text-left")}>
          <GlassCard padding="lg" hover={false}>
            <div className={cn("flex items-center gap-3", isEven && "md:flex-row-reverse")}>
              <IconTile icon={Icon} tone="core" size="sm" />
              <span className="font-mono-label text-xs text-accent-signal">
                STEP {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 font-display font-semibold text-xl text-text-primary">
              {title}
            </h3>
            <p className="mt-2 text-text-secondary font-body text-sm leading-relaxed">
              {description}
            </p>
          </GlassCard>
        </ScrollReveal>

        {/* Empty spacer column on desktop to maintain the 2-col grid */}
        <div className="hidden md:block" />
      </div>
    </div>
  );
}
