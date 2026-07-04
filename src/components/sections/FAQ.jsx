/**
 * FAQ
 * -----------------------------------------------------------------------
 * Accordion list — only one item open at a time (single state variable
 * holding the open item's id, not a boolean-per-item), since letting
 * every question expand independently at once tends to produce a very
 * long, messy page state that undermines the "clean, considered" feel.
 * ----------------------------------------------------------------------- */

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AccordionItem } from "./AccordionItem";
import { faqItems } from "../../data/faq";

export function FAQ() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  return (
    <Section id="faq" spacing="lg">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <Badge variant="eyebrow" tone="signal" icon={HelpCircle}>
              QUESTIONS
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 text-3xl md:text-4xl font-display font-semibold text-text-primary">
              Frequently asked questions
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger staggerDelay={0.08} delay={0.2}>
          <div className="mt-12 flex flex-col gap-3">
            {faqItems.map((item) => (
              <ScrollReveal.Item key={item.id}>
                <AccordionItem
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </ScrollReveal.Item>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
