/**
 * App
 * -----------------------------------------------------------------------
 * Root component. Full Phase 1 landing page assembled: Navbar, Hero,
 * Features, Journey, Vision, Testimonials, FAQ, Footer.
 * ----------------------------------------------------------------------- */

import { PageBackground } from "./components/background/PageBackground";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTopButton } from "./components/ui/ScrollToTopButton";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { Journey } from "./components/sections/Journey";
import { Vision } from "./components/sections/Vision";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";

function App() {
  return (
    <div className="relative min-h-screen">
      <PageBackground focalGlow />
      <Navbar />

      <main className="relative z-content">
        <Hero />
        <Features />
        <Journey />
        <Vision />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;