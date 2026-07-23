/**
 * ResumeReviewCard
 * -----------------------------------------------------------------------
 * Displays the AI's structured review — score, strengths, improvements.
 * Purely presentational; receives the already-fetched review object.
 * ----------------------------------------------------------------------- */

import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function ResumeReviewCard({ review }) {
  if (!review) return null;

  const scoreColor =
    review.score >= 75 ? "text-accent-signal" : review.score >= 50 ? "text-accent-core" : "text-accent-rare";

  return (
    <GlassCard glow="core" padding="lg" hover={false}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-accent-core" />
          <h3 className="font-display font-semibold text-lg text-text-primary">AI Review</h3>
        </div>
        <div className={`font-display font-semibold text-2xl ${scoreColor}`}>
          {review.score}
          <span className="text-text-tertiary text-sm font-body">/100</span>
        </div>
      </div>

      <p className="mt-3 text-text-secondary font-body text-sm">{review.summary}</p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <h4 className="text-xs font-mono-label text-accent-signal mb-2">STRENGTHS</h4>
          <ul className="flex flex-col gap-2">
            {review.strengths?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-primary font-body">
                <CheckCircle2 size={14} className="text-accent-signal mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono-label text-accent-rare mb-2">IMPROVE</h4>
          <ul className="flex flex-col gap-2">
            {review.improvements?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-primary font-body">
                <AlertCircle size={14} className="text-accent-rare mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}