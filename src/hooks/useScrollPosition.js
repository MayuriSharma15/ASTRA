/**
 * useScrollPosition
 * -----------------------------------------------------------------------
 * Tracks whether the page has scrolled past a threshold, plus overall
 * scroll progress (0–1) through the full document height.
 *
 * WHY A SHARED HOOK: the Navbar needs "has scrolled > 20px" to shift from
 * transparent to glass. The future Journey Timeline section will need
 * overall scroll progress to drive a progress line. Both read from the
 * same scroll listener — one hook, one listener, instead of every
 * section attaching its own `scroll` event and duplicating throttle
 * logic.
 *
 * PERFORMANCE: the scroll handler is wrapped in requestAnimationFrame
 * throttling — scroll fires far more often than the browser can paint,
 * so without this, every component reading this hook would re-render
 * dozens of times per second for no visual benefit.
 *
 * @param {number} [threshold=20] - px scrolled before `scrolled` flips true
 * @returns {{ scrolled: boolean, progress: number }}
 * ----------------------------------------------------------------------- */

import { useEffect, useState, useRef } from "react";

export function useScrollPosition(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    function update() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollY > threshold);
      setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);

      tickingRef.current = false;
    }

    function handleScroll() {
      if (!tickingRef.current) {
        requestAnimationFrame(update);
        tickingRef.current = true;
      }
    }

    // Run once on mount in case the page loads already scrolled
    // (e.g. browser restoring scroll position on refresh)
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrolled, progress };
}
