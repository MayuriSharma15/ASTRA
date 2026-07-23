/**
 * ProtectedRoute
 * -----------------------------------------------------------------------
 * Wraps any route that requires a logged-in user. Three states:
 *   1. Still checking session (loading) → show a minimal loading screen,
 *      NOT a redirect — redirecting before we know the real answer would
 *      incorrectly bounce a legitimately logged-in user to /login for a
 *      split second on every refresh.
 *   2. No user after loading finishes → redirect to /login.
 *   3. User exists → render the protected content.
 * ----------------------------------------------------------------------- */

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-void flex items-center justify-center">
        <p className="text-text-secondary font-body text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}