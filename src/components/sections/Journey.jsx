/**
 * Journey (Career Journey Timeline)
 * -----------------------------------------------------------------------
 * Six-stage narrative timeline. The signature detail here is the center
 * line: a static low-opacity track runs the full height, and a bright
 * gradient line fills in on top of it as the user scrolls through the
 * section — driven by Framer Motion's useScroll/useTransform scoped to
 * THIS section's ref, not the global page scroll. This is more precise
 * than reading window scroll position, since it only tracks progress
 * through this section's own height regardless of what's above/below it.
 * ----------------------------------------------------------------------- */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Route } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../animations/ScrollReveal";
import { TimelineStep } from "./TimelineStep";
import { journeySteps } from "../../data/journey";

export function Journey() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="journey" spacing="lg">
      <Container size="default">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <Badge variant="eyebrow" tone="signal" icon={Route}>
              THE JOURNEY
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl font-display font-semibold text-text-primary">
              From where you are to where you're going
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="mt-4 max-w-xl text-text-secondary font-body">
              A guided path through every stage of your career journey —
              not a pile of disconnected tools you have to figure out
              yourself.
            </p>
          </ScrollReveal>
        </div>

        <div ref={containerRef} className="relative mt-20">
          {/* Track line — full height, low opacity, always visible */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-glass-border" />

          {/* Filled progress line — grows with scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="hidden md:block absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent-core to-accent-signal shadow-glow-core-sm"
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {journeySteps.map((step, index) => (
              <TimelineStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
