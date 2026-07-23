/**
 * QuickActionsWidget
 * -----------------------------------------------------------------------
 * Grid of shortcut buttons to the main dashboard sections. Uses
 * dashboardNavItems (same data source as the Sidebar) so adding a new
 * module later automatically shows up here too — one data source,
 * two places it's rendered, zero duplication.
 * ----------------------------------------------------------------------- */

import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { IconTile } from "../ui/IconTile";
import { dashboardNavItems } from "../../data/dashboardNav";

export function QuickActionsWidget() {
  // Skip "Overview" itself — no point linking to the page you're already on.
  const actions = dashboardNavItems.filter((item) => item.id !== "overview");

  return (
    <GlassCard padding="lg" hover={false} className="h-full">
      <div className="flex items-center gap-2">
        <Zap size={18} className="text-accent-core" strokeWidth={1.75} />
        <h3 className="font-display font-semibold text-lg text-text-primary">Quick Actions</h3>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.id}
            to={action.path}
            className="flex flex-col items-center gap-2 rounded-md border border-glass-border bg-glass-fill p-4 hover:bg-glass-fill-hover hover:border-glass-border-strong transition-colors duration-fast text-center"
          >
            <IconTile icon={action.icon} tone="signal" size="sm" />
            <span className="text-xs text-text-secondary font-body">{action.label}</span>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}