/**
 * Hero
 * -----------------------------------------------------------------------
 * ASTRA's signature section — headline + CTA above, the AI Core reactor
 * with orbiting career modules below. This is the first thing every
 * visitor sees, and per the brief, it needs to communicate "ASTRA
 * connects your entire career" without requiring the user to read a
 * word of copy.
 *
 * RESPONSIVE ORBIT SIZING: rather than hardcoding different radius
 * values per breakpoint, the orbit container measures its own rendered
 * width via ResizeObserver and derives both the core size and orbit
 * radius as proportions of that measurement. This means the whole
 * system scales smoothly at any viewport width instead of jumping
 * between a few fixed breakpoint values.
 * ----------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../animations/ScrollReveal";
import { AICore } from "./AICore";
import { OrbitModule } from "./OrbitModule";
import { orbitModules } from "../../data/orbitModules";

export function Hero() {
  const orbitContainerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(400);

  useEffect(() => {
    const el = orbitContainerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width) setContainerSize(width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const coreSize = Math.round(containerSize * 0.36);
  const orbitRadius = containerSize * 0.5 * 0.78;

  return (
    <Section id="hero" spacing="lg" className="pt-32 md:pt-40">
      <Container size="wide" className="flex flex-col items-center text-center">
        <ScrollReveal>
          <Badge variant="eyebrow" tone="signal" icon={Sparkles}>
            CAREER INTELLIGENCE PLATFORM
          </Badge>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-display font-semibold leading-tight text-text-primary">
            One system for your{" "}
            <span className="bg-gradient-to-r from-accent-core to-accent-signal bg-clip-text text-transparent">
              entire career
            </span>
            .
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-text-secondary font-body">
            Resume, interviews, learning, projects, and roadmaps — connected
            in one intelligent platform instead of a dozen disconnected
            tabs.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Get Started Free
            </Button>
            <Button variant="secondary" size="lg" icon={PlayCircle} iconPosition="left">
              See How It Works
            </Button>
          </div>
        </ScrollReveal>

        {/* Orbit system */}
        <div
          ref={orbitContainerRef}
          className="relative mt-16 md:mt-20 w-full max-w-[560px] aspect-square"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AICore size={coreSize} />
          </div>

          {orbitModules.map((module, index) => (
            <div
              key={module.id}
              className="absolute inset-0 flex items-center justify-center"
            >
              <OrbitModule module={module} radius={orbitRadius} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}