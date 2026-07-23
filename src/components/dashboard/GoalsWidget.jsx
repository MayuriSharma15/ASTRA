/**
 * GoalsWidget (NOW FULLY FUNCTIONAL — real backend, real database)
 * -----------------------------------------------------------------------
 * On mount, fetches this user's REAL goals from MongoDB via the backend.
 * Adding, toggling, and deleting all make real API calls — nothing here
 * is local-only anymore. Refreshing the page keeps your goals, because
 * they're not in React state, they're in the database.
 *
 * OPTIMISTIC UI: toggling a checkbox updates the screen immediately
 * (before the server responds), then reconciles if the request fails.
 * Waiting for a round-trip before showing ANY change would make the
 * app feel laggy — optimistic updates are standard practice in real
 * production apps (Linear, Notion, etc. all do this).
 * ----------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { Target, Check, Plus, Loader2 } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { useAuth } from "../../hooks/useAuth";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../../services/goalService";
import { cn } from "../../utils/cn";

export function GoalsWidget() {
  const { token } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newGoalLabel, setNewGoalLabel] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!token) return;

    getGoals(token)
      .then((data) => setGoals(data.goals))
      .catch(() => setError("Couldn't load goals"))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleToggle(goal) {
    // Optimistic update
    setGoals((prev) =>
      prev.map((g) => (g._id === goal._id ? { ...g, done: !g.done } : g))
    );

    try {
      await updateGoal(token, goal._id, { done: !goal.done });
    } catch {
      // Revert on failure
      setGoals((prev) =>
        prev.map((g) => (g._id === goal._id ? { ...g, done: goal.done } : g))
      );
      setError("Couldn't update that goal — try again");
    }
  }

  async function handleAddGoal(e) {
    e.preventDefault();
    if (!newGoalLabel.trim()) return;

    setIsAdding(true);
    setError("");

    try {
      const data = await createGoal(token, newGoalLabel);
      setGoals((prev) => [...prev, data.goal]);
      setNewGoalLabel("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  }

  async function handleDelete(goalId) {
    const previousGoals = goals;
    setGoals((prev) => prev.filter((g) => g._id !== goalId));

    try {
      await deleteGoal(token, goalId);
    } catch {
      setGoals(previousGoals);
      setError("Couldn't delete that goal — try again");
    }
  }

  const completedCount = goals.filter((g) => g.done).length;

  return (
    <GlassCard padding="lg" hover={false} className="h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={18} className="text-accent-core" strokeWidth={1.75} />
          <h3 className="font-display font-semibold text-lg text-text-primary">Goals</h3>
        </div>
        <span className="text-xs font-mono-label text-text-tertiary">
          {completedCount}/{goals.length}
        </span>
      </div>

      {loading ? (
        <div className="mt-6 flex items-center justify-center py-8 text-text-tertiary">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : (
        <>
          {goals.length === 0 && (
            <p className="mt-5 text-sm text-text-tertiary font-body">
              No goals yet — add your first one below.
            </p>
          )}

          <ul className="mt-4 flex flex-col gap-1">
            {goals.map((goal) => (
              <li key={goal._id} className="group flex items-center">
                <button
                  onClick={() => handleToggle(goal)}
                  className="flex-1 flex items-center gap-3 rounded-md px-2 py-2.5 hover:bg-glass-fill-hover transition-colors duration-fast text-left"
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full border shrink-0 transition-colors duration-fast",
                      goal.done
                        ? "bg-accent-core border-accent-core text-text-on-accent"
                        : "border-glass-border-strong text-transparent"
                    )}
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span
                    className={cn(
                      "text-sm font-body transition-colors duration-fast",
                      goal.done ? "text-text-tertiary line-through" : "text-text-primary"
                    )}
                  >
                    {goal.label}
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(goal._id)}
                  aria-label="Delete goal"
                  className="opacity-0 group-hover:opacity-100 text-text-tertiary hover:text-accent-rare transition-all duration-fast px-2 text-xs"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddGoal} className="mt-4 flex gap-2">
            <input
              type="text"
              value={newGoalLabel}
              onChange={(e) => setNewGoalLabel(e.target.value)}
              placeholder="Add a new goal..."
              className="flex-1 px-3 py-2 rounded-md bg-glass-fill border border-glass-border text-sm text-text-primary placeholder:text-text-tertiary font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
            />
            <button
              type="submit"
              disabled={isAdding || !newGoalLabel.trim()}
              aria-label="Add goal"
              className="flex items-center justify-center w-9 h-9 rounded-md bg-accent-core/10 border border-accent-core/30 text-accent-core hover:bg-accent-core/20 transition-colors duration-fast disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </form>

          {error && <p className="mt-3 text-xs text-accent-rare font-body">{error}</p>}
        </>
      )}
    </GlassCard>
  );
}