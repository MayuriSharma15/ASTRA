/**
 * Login
 * -----------------------------------------------------------------------
 * Real, functional login form — calls the actual backend via useAuth's
 * login(), not a placeholder. On success, navigates to /dashboard. On
 * failure, shows the exact error message the backend returned (e.g.
 * "Invalid email or password") rather than a generic failure message.
 * ----------------------------------------------------------------------- */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Orbit, ArrowRight } from "lucide-react";
import { PageBackground } from "../components/background/PageBackground";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
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
            Welcome back
          </h1>
          <p className="mt-2 text-text-secondary font-body text-sm text-center">
            Log in to continue your career journey
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary font-body">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent-signal hover:text-accent-signal-soft">
              Sign up
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}