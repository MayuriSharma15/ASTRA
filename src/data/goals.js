/**
 * Goals placeholder data
 * -----------------------------------------------------------------------
 * Local placeholder career goals — completion state is toggled via
 * local React state in GoalsWidget (no persistence yet, resets on
 * refresh, which is correct and expected until a backend endpoint
 * for goals exists).
 * ----------------------------------------------------------------------- */

export const initialGoals = [
  { id: "g1", label: "Complete resume review", done: true },
  { id: "g2", label: "Finish System Design course", done: false },
  { id: "g3", label: "Complete 5 mock interviews", done: false },
  { id: "g4", label: "Build 2 portfolio projects", done: false },
  { id: "g5", label: "Apply to 10 target roles", done: false },
];