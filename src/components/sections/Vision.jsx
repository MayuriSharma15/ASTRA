/**
 * Vision
 * -----------------------------------------------------------------------
 * Deliberately the most minimal, whitespace-heavy section on the page —
 * per the design brief's Apple/Linear-style direction, a mission
 * statement section should feel like a breath, not another content
 * block. No cards, no grid, no icons competing for attention. Just
 * large type and a supporting stat row.
 *
 * The `rare` accent color (pink) gets its one deliberate moment here on
 * the badge — consistent with the color hierarchy rule established in
 * tokens.css (core/signal used constantly, rare used sparingly).
 * ----------------------------------------------------------------------- */

import { Telescope } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../animations/ScrollReveal";
import { visionStats } from "../../data/visionStats";

export function Vision() {
  return (
    <Section id="vision" spacing="lg">
      <Container size="narrow" className="flex flex-col items-center text-center">
        <ScrollReveal>
          <Badge variant="eyebrow" tone="rare" icon={Telescope}>
            OUR VISION
          </Badge>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-8 text-3xl md:text-5xl font-display font-semibold leading-snug text-text-primary">
            We're not building another app.{" "}
            <span className="bg-gradient-to-r from-accent-core to-accent-signal bg-clip-text text-transparent">
              We're building the career intelligence platform
            </span>{" "}
            for how careers work.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 max-w-lg text-text-secondary font-body text-lg">
            Every disconnected tool you use today is a tab you have to
            remember to open. ASTRA remembers for you — one system that
            understands your whole journey, not just one piece of it.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger delay={0.3} staggerDelay={0.1}>
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 w-full max-w-md">
            {visionStats.map((stat) => (
              <ScrollReveal.Item key={stat.label} className="flex flex-col items-center">
                <span className="font-display font-semibold text-3xl md:text-4xl bg-gradient-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="mt-2 font-mono-label text-[10px] text-text-tertiary text-center">
                  {stat.label}
                </span>
              </ScrollReveal.Item>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}