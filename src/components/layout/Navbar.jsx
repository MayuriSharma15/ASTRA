/**
 * Navbar
 * -----------------------------------------------------------------------
 * Sticky top navigation. Transparent at page top, transitions to a glass
 * surface once scrolled — this is the single most common "premium dark
 * UI" tell (Linear, Vercel, Arc all do this) because a nav that's always
 * opaque fights the Hero for visual weight in the first viewport.
 *
 * MOBILE: below md breakpoint, nav links collapse into a hamburger menu
 * that expands as a full-width glass panel — AnimatePresence handles
 * the mount/unmount animation.
 * ----------------------------------------------------------------------- */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Orbit } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { navLinks } from "../../data/navLinks";

export function Navbar() {
  const { scrolled } = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleMobileLinkClick(e, href) {
    e.preventDefault();
    setMobileOpen(false);
    // Wait for the mobile menu's collapse animation (300ms) to finish
    // before scrolling — scrolling while the page height is still
    // changing underneath causes the jump to land in the wrong place
    // or get silently cancelled by the browser.
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-navbar transition-all duration-base",
        scrolled
          ? "bg-bg-void/70 backdrop-blur-glass-strong border-b border-glass-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-core/10 border border-accent-core/30 text-accent-core group-hover:shadow-glow-core-sm transition-shadow duration-base">
            <Orbit size={18} strokeWidth={2} />
          </span>
          <span className="font-display font-semibold text-lg text-text-primary tracking-tight">
            ASTRA
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-fast font-body"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-9 h-9 text-text-primary"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-bg-void/95 backdrop-blur-glass-strong border-b border-glass-border"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleMobileLinkClick(e, link.href)}
                    className="block text-base text-text-secondary hover:text-text-primary transition-colors duration-fast font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button variant="primary" size="md" fullWidth>
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}