import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Orbit, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { dashboardNavItems } from "../../data/dashboardNav";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../utils/cn";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 76;

export function Sidebar({ collapsed: collapsedProp, onToggle, defaultCollapsed = false }) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : internalCollapsed;
  const prefersReducedMotion = useReducedMotion();
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  function handleToggle() {
    const next = !collapsed;
    if (onToggle) onToggle(next);
    if (!isControlled) setInternalCollapsed(next);
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-screen shrink-0 flex flex-col bg-bg-abyss/60 backdrop-blur-glass-strong border-r border-glass-border"
    >
      <div className={cn("flex items-center h-16 shrink-0", collapsed ? "justify-center" : "px-5 gap-2")}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-core/10 border border-accent-core/30 text-accent-core shrink-0">
            <Orbit size={18} strokeWidth={2} />
          </span>
          {!collapsed && (
            <span className="font-display font-semibold text-lg text-text-primary tracking-tight whitespace-nowrap">
              ASTRA
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
        {dashboardNavItems.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="shrink-0 border-t border-glass-border px-3 py-4 flex flex-col gap-1">
        <SidebarItem
          item={{ id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" }}
          collapsed={collapsed}
        />

        <Link
          to="/dashboard/profile"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 mt-1 hover:bg-glass-fill-hover transition-colors duration-fast",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-accent-core to-accent-signal text-text-on-accent font-display font-semibold text-xs shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <span className="text-sm text-text-secondary font-body whitespace-nowrap">
              {user?.name ?? "Loading..."}
            </span>
          )}
        </Link>

        <button
          onClick={handleToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "mt-2 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-text-tertiary hover:text-text-primary hover:bg-glass-fill-hover transition-colors duration-fast text-xs font-body",
            collapsed && "px-0"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}