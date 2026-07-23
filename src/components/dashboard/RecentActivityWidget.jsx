/**
 * RecentActivityWidget
 * -----------------------------------------------------------------------
 * Vertical timeline feed of recent placeholder actions.
 * ----------------------------------------------------------------------- */

import { Activity } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { IconTile } from "../ui/IconTile";
import { recentActivity } from "../../data/recentActivity";

export function RecentActivityWidget() {
  return (
    <GlassCard padding="lg" hover={false} className="h-full">
      <div className="flex items-center gap-2">
        <Activity size={18} className="text-accent-signal" strokeWidth={1.75} />
        <h3 className="font-display font-semibold text-lg text-text-primary">
          Recent Activity
        </h3>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {recentActivity.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <IconTile icon={item.icon} tone={item.tone} size="sm" />
            <div>
              <p className="text-sm text-text-primary font-body leading-snug">{item.text}</p>
              <p className="text-xs text-text-tertiary font-body mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}