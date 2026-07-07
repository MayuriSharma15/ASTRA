/**
 * FinalCTA
 * -----------------------------------------------------------------------
 * Closing conversion moment before the Footer. Landing pages that end
 * abruptly at FAQ leave the strongest intent-to-act moment (someone who
 * just read through the whole page) with nowhere to go except scroll
 * back up. This section exists specifically to capture that moment.
 *
 * Visually distinct from every other section — a bounded glass panel
 * with its own dedicated glow, rather than blending into the page flow
 * like Features/Journey/Vision do. It should feel like arriving
 * somewhere, not just another scroll-stop.
 * ----------------------------------------------------------------------- */

import { ArrowRight, Sparkles } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../animations/ScrollReveal";

export function FinalCTA() {
  return (
    <Section id="get-started" spacing="md">
      <Container size="default">
        <ScrollReveal>
          <GlassCard
            glow="core"
            padding="lg"
            hover={false}
            className="flex flex-col items-center text-center py-16 px-6 md:px-16"
          >
            <Badge variant="eyebrow" tone="core" icon={Sparkles}>
              GET STARTED
            </Badge>

            <h2 className="mt-6 max-w-xl text-3xl md:text-4xl font-display font-semibold text-text-primary">
              Your career deserves one system, not a dozen tabs
            </h2>

            <p className="mt-4 max-w-md text-text-secondary font-body">
              Join ASTRA and bring your resume, learning, projects, and
              interview prep into one place that actually understands
              your journey.
            </p>

            <div className="mt-8">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Get Started Free
              </Button>
            </div>
          </GlassCard>
        </ScrollReveal>
      </Container>
    </Section>
  );
}