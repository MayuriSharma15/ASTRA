/**
 * Testimonials
 * -----------------------------------------------------------------------
 * Simple 3-column grid rather than a carousel/marquee — Phase 1 only
 * has 3 testimonials, and a carousel with 3 slides is more interaction
 * overhead than value for the user. Carousel is worth revisiting once
 * there are 6+ real testimonials to rotate through.
 * ----------------------------------------------------------------------- */

import { MessagesSquare } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../animations/ScrollReveal";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "../../data/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials" spacing="lg">
      <Container size="default">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <Badge variant="eyebrow" tone="core" icon={MessagesSquare}>
              WHAT PEOPLE ARE SAYING
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl font-display font-semibold text-text-primary">
              Built for people navigating real career decisions
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger staggerDelay={0.12} delay={0.2}>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <ScrollReveal.Item key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </ScrollReveal.Item>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
