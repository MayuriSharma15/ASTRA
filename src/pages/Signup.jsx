/**
 * Signup
 * -----------------------------------------------------------------------
 * Real, functional registration form. Client-side password-match check
 * runs BEFORE calling the backend (no point making a network request
 * for a mistake the browser can already catch) — but real validation
 * (email format, duplicate email, password length) still happens
 * server-side too, since client-side checks alone are never sufficient.
 * ----------------------------------------------------------------------- */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Orbit, ArrowRight } from "lucide-react";
import { PageBackground } from "../components/background/PageBackground";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
      <PageBackground showParticles={false} focalGlow />

      <div className="relative z-content w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="flex items-center justify-center w-9 h-9 rounded-md bg-accent-core/10 border border-accent-core/30 text-accent-core">
            <Orbit size={20} strokeWidth={2} />
          </span>
          <span className="font-display font-semibold text-xl text-text-primary">ASTRA</span>
        </Link>

        <GlassCard padding="lg" hover={false}>
          <h1 className="text-2xl font-display font-semibold text-text-primary text-center">
            Create your account
          </h1>
          <p className="mt-2 text-text-secondary font-body text-sm text-center">
            Start building your career, all in one place
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-xs font-body text-text-secondary">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-glass-fill border border-glass-border text-text-primary text-sm font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-body text-text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-glass-fill border border-glass-border text-text-primary text-sm font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-body text-text-secondary">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-glass-fill border border-glass-border text-text-primary text-sm font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-xs font-body text-text-secondary">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-glass-fill border border-glass-border text-text-primary text-sm font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
              />
            </div>

            {error && (
              <p className="text-accent-rare text-sm font-body" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isSubmitting}
              icon={ArrowRight}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary font-body">
            Already have an account?{" "}
            <Link to="/login" className="text-accent-signal hover:text-accent-signal-soft">
              Log in
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}