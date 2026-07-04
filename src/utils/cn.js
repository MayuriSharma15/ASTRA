/**
 * cn — className merge utility
 * -----------------------------------------------------------------------
 * Lightweight conditional className combiner. No external dependency
 * (clsx/tailwind-merge) — deliberately kept dependency-free since Phase 1
 * scope is "frontend only, approved stack." Handles the common patterns:
 *
 *   cn("base-class", isActive && "active-class")
 *   cn("base-class", { active: isActive, disabled: isDisabled })
 *   cn(["a", "b"], "c")
 *
 * NOTE: this does NOT resolve Tailwind class conflicts (e.g. combining
 * "p-4" and "p-8" won't intelligently pick one — both will be present in
 * the string, and the one that appears later in the CSS wins). That level
 * of merging needs tailwind-merge. If class conflicts become a real
 * problem as components grow, that's a signal to add tailwind-merge as
 * a dependency deliberately — not something to silently work around here.
 * ----------------------------------------------------------------------- */

export function cn(...inputs) {
  const classes = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}