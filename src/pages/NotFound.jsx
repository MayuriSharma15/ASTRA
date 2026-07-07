/**
 * NotFound (404)
 * -----------------------------------------------------------------------
 * Catch-all route for any path that doesn't match a real page. Styled
 * consistently with the rest of ASTRA (same background system, same
 * type/color tokens) rather than a plain unstyled browser error —
 * a mismatched 404 page is a small but real "was this actually
 * finished?" signal to anyone who hits a broken link.
 * ----------------------------------------------------------------------- */

import { Link } from "react-router-dom";
import { ArrowLeft, Orbit } from "lucide-react";
import { PageBackground } from "../components/background/PageBackground";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <PageBackground showParticles={false} focalGlow />

      <div className="relative z-content flex flex-col items-center text-center px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent-core/10 border border-accent-core/30 text-accent-core mb-8">
          <Orbit size={28} strokeWidth={1.75} />
        </div>

        <p className="font-mono-label text-xs text-accent-signal">ERROR 404</p>

        <h1 className="mt-4 text-4xl md:text-5xl font-display font-semibold text-text-primary">
          Lost in orbit
        </h1>

        <p className="mt-4 max-w-sm text-text-secondary font-body">
          The page you're looking for doesn't exist, or has drifted
          somewhere else entirely.
        </p>

        <Link to="/" className="mt-8">
          <Button variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
            Back to ASTRA
          </Button>
        </Link>
      </div>
    </div>
  );
}