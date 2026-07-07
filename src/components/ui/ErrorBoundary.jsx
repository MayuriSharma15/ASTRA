/**
 * ErrorBoundary
 * -----------------------------------------------------------------------
 * Catches render-time errors anywhere below it in the tree and shows a
 * styled fallback instead of a blank white screen — React error
 * boundaries MUST be class components (no hook equivalent exists as of
 * React 19), which is why this is the one class component in the
 * project; everything else is functional by design.
 *
 * Wraps the whole app in main.jsx — a single boundary at the root is
 * enough for Phase 1. As real features (dashboard, AI chat, etc.) are
 * added in later phases, consider wrapping individual risky sections
 * (e.g. a live AI response panel) in their OWN boundary so one broken
 * widget doesn't take down the entire page.
 * ----------------------------------------------------------------------- */

import { Component } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Phase 1: log to console only. Later phases should send this to a
    // real error-tracking service (Sentry or similar) instead.
    console.error("ASTRA encountered an unexpected error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-void flex items-center justify-center px-6">
          <div className="flex flex-col items-center text-center max-w-sm">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-rare/10 border border-accent-rare/30 text-accent-rare mb-6">
              <AlertTriangle size={24} strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-display font-semibold text-text-primary">
              Something went wrong
            </h1>
            <p className="mt-3 text-text-secondary font-body text-sm">
              An unexpected error occurred. Reloading the page usually
              fixes it.
            </p>
            <button
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent-core text-text-on-accent font-body text-sm font-medium hover:bg-accent-core-soft transition-colors duration-base"
            >
              <RefreshCw size={16} />
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}