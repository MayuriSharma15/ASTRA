/**
 * Features
 * -----------------------------------------------------------------------
 * The six-pillar grid demonstrating ASTRA's breadth across the career
 * journey. Uses ScrollReveal's stagger mode so cards cascade in rather
 * than popping in simultaneously — with 6 cards popping together this
 * would feel like a page dump; staggered, it reads as considered.
 * ----------------------------------------------------------------------- */

import { Sparkles } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../animations/ScrollReveal";
import { FeatureCard } from "./FeatureCard";
import { features } from "../../data/features";

export function Features() {
  return (
    <Section id="features" spacing="lg">
      <Container size="default">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <Badge variant="eyebrow" tone="core" icon={Sparkles}>
              EVERYTHING, CONNECTED
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl font-display font-semibold text-text-primary">
              One platform, every stage of your career
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-4 max-w-xl text-text-secondary font-body">
              Stop switching between a dozen tools. ASTRA brings every part
              of your career journey into one intelligent system.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger staggerDelay={0.1} delay={0.2}>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <ScrollReveal.Item key={feature.id}>
                <FeatureCard feature={feature} />
              </ScrollReveal.Item>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
