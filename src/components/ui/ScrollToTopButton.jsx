/**
 * ScrollToTopButton
 * -----------------------------------------------------------------------
 * Floating action button, bottom-right, that appears once the user has
 * scrolled past roughly one viewport height and smoothly returns them
 * to the top on click. Genuinely necessary on a long single-page site
 * like this — without it, reaching the Footer means a long manual
 * scroll back up with no shortcut.
 *
 * Reuses useScrollPosition (already built for the Navbar) rather than
 * attaching a second scroll listener — one shared scroll-tracking
 * source for the whole app.
 * ----------------------------------------------------------------------- */

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ScrollToTopButton() {
  const { scrolled } = useScrollPosition(window.innerHeight * 0.8);
  const prefersReducedMotion = useReducedMotion();

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-overlay flex items-center justify-center w-11 h-11 rounded-full bg-glass-fill border border-glass-border backdrop-blur-glass text-text-primary shadow-elevation-2 hover:bg-glass-fill-hover hover:border-accent-core/40 hover:shadow-glow-core-sm transition-colors duration-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
        >
          <ArrowUp size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
