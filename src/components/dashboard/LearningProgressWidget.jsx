/**
 * LearningProgressWidget
 * -----------------------------------------------------------------------
 * Lists in-progress learning paths with animated progress bars.
 * ----------------------------------------------------------------------- */

import { BookOpen } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { ProgressBar } from "./ProgressBar";
import { learningPaths } from "../../data/learningProgress";

export function LearningProgressWidget() {
  return (
    <GlassCard padding="lg" hover={false} className="h-full">
      <div className="flex items-center gap-2">
        <BookOpen size={18} className="text-accent-rare" strokeWidth={1.75} />
        <h3 className="font-display font-semibold text-lg text-text-primary">
          Learning Progress
        </h3>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {learningPaths.map((path) => (
          <div key={path.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-text-primary font-body">{path.title}</p>
              <p className="text-xs text-text-tertiary font-mono-label">{path.percent}%</p>
            </div>
            <ProgressBar percent={path.percent} tone="rare" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}