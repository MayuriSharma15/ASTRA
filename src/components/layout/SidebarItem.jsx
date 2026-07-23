/**
 * SidebarItem
 * -----------------------------------------------------------------------
 * A single nav link inside the Sidebar. Uses React Router's NavLink
 * (not a plain <a>) so active-route styling is handled by the router
 * itself rather than manually comparing paths — less code, and it stays
 * correct automatically as routes are added in later steps.
 *
 * When the sidebar is collapsed, the label is removed from the DOM
 * (not just visually hidden) so screen readers don't announce label
 * text that's invisible — instead, the icon-only button gets an
 * aria-label carrying the same text, so it stays accessible either way.
 *
 * PROPS
 * @param {{id, label, icon, path, end}} item
 * @param {boolean} collapsed
 * ----------------------------------------------------------------------- */

import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

export function SidebarItem({ item, collapsed }) {
  const { label, icon: Icon, path, end } = item;

  return (
    <NavLink
      to={path}
      end={end}
      aria-label={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-colors duration-fast",
          collapsed && "justify-center px-0",
          isActive
            ? "bg-accent-core/10 text-accent-core"
            : "text-text-secondary hover:text-text-primary hover:bg-glass-fill-hover"
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator bar — a small left-edge accent, a common
              premium-dashboard detail (Linear, Vercel) that reads as
              more considered than just a background color swap alone. */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-accent-core" />
          )}
          <Icon size={18} strokeWidth={1.75} className="shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">{label}</span>}
        </>
      )}
    </NavLink>
  );
}