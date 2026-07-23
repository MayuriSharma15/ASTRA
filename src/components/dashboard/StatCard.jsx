/**
 * StatCard
 * -----------------------------------------------------------------------
 * Single quick-stat tile for the dashboard's top row. Value counts up
 * from 0 on mount (a small motion detail that makes numbers feel earned
 * rather than static text — common in premium dashboards like Linear/
 * Vercel's usage stats).
 * ----------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { IconTile } from "../ui/IconTile";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function StatCard({ stat }) {
  const { icon, tone, label, value, suffix, trend, trendUp } = stat;
  const prefersReducedMotion = useReducedMotion();
  const numericValue = parseInt(value, 10) || 0;
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? numericValue : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(numericValue);
      return;
    }

    const duration = 800;
    const steps = 30;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      current += increment;
      setDisplayValue(Math.min(Math.round(current), numericValue));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [numericValue, prefersReducedMotion]);

  return (
    <GlassCard padding="md" hover={false}>
      <div className="flex items-start justify-between">
        <IconTile icon={icon} tone={tone} size="sm" />
        {trend && (
          <span
            className={
              "inline-flex items-center gap-1 text-xs font-body " +
              (trendUp ? "text-accent-signal" : "text-text-tertiary")
            }
          >
            {trendUp && <TrendingUp size={12} />}
            {trend}
          </span>
        )}
      </div>

      <p className="mt-4 font-display font-semibold text-2xl text-text-primary">
        {displayValue}
        <span className="text-text-tertiary text-base font-body">{suffix}</span>
      </p>
      <p className="mt-1 text-xs text-text-secondary font-body">{label}</p>
    </GlassCard>
  );
}