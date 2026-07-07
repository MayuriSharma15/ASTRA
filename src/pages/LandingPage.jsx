/**
 * LandingPage
 * -----------------------------------------------------------------------
 * The full Phase 1 marketing page — everything that used to live
 * directly in App.jsx now lives here as an actual routed page. This is
 * the change that makes routes/pages folders earn their place in the
 * architecture: App.jsx becomes a thin router shell, and each real
 * destination (landing page today, dashboard/auth pages in later
 * phases) is its own file here.
 * ----------------------------------------------------------------------- */

import { PageBackground } from "../components/background/PageBackground";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";
import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features";
import { Journey } from "../components/sections/Journey";
import { Vision } from "../components/sections/Vision";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";

export function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Skip link — invisible until focused via keyboard (Tab). Lets
          keyboard and screen-reader users jump straight past the Navbar
          to the main content instead of tabbing through every nav link
          first. This is a real WCAG requirement, not a nice-to-have. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-modal focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent-core focus:text-text-on-accent focus:font-body focus:text-sm"
      >
        Skip to main content
      </a>

      <PageBackground focalGlow />
      <Navbar />

      <main id="main-content" className="relative z-content">
        <Hero />
        <Features />
        <Journey />
        <Vision />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}