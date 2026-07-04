/**
 * StarField
 * -----------------------------------------------------------------------
 * Ambient twinkling starfield, rendered on <canvas> rather than DOM nodes.
 *
 * WHY CANVAS, NOT HUNDREDS OF <div> DOTS: at 150+ stars, individually
 * animated DOM elements each trigger their own style recalculation.
 * Canvas draws all of them in a single paint operation per frame — this
 * is the difference between 60fps and visible jank on mid-range devices,
 * and it's the single biggest performance decision in the whole
 * background system.
 *
 * REDUCED MOTION: stars still render (removing them entirely would leave
 * a visually empty gap the design doesn't expect), but the twinkle loop
 * is skipped — a single static frame is drawn once and left alone.
 *
 * PROPS
 * @param {number} [density=0.00012]   - stars per pixel of container area
 *                                        (tuned default ≈ 150 stars on a
 *                                        1280×800 viewport)
 * @param {number} [maxOpacity=0.8]
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function StarField({ density = 0.00012, maxOpacity = 0.8, className }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR — 3x on
    // some phones is wasted fill-rate for a background layer nobody stares at directly

    function resize() {
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.scale(dpr, dpr);

      const starCount = Math.floor(clientWidth * clientHeight * density);
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        radius: Math.random() * 1.2 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time) {
      const { clientWidth, clientHeight } = canvas.parentElement;
      ctx.clearRect(0, 0, clientWidth, clientHeight);

      for (const star of starsRef.current) {
        const opacity = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity +
            Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.25;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 250, ${Math.max(0, opacity * maxOpacity)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resize();
      draw(0);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, maxOpacity, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 w-full h-full"}
    />
  );
}