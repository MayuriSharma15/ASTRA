import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSidebar } from '../../../context/SidebarContext';

/**
 * SidebarItem
 * ----------------------------------------------------------------------------
 * A single navigation entry. Presentation-only — receives its data as props,
 * has no knowledge of the full nav list, and has no business logic beyond
 * active-state styling (which is inherent to NavLink, not something we own).
 */
export default function SidebarItem({ item }) {
  const { isCollapsed } = useSidebar();
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        [
          'group relative flex items-center gap-3 rounded-lg px-3 py-2.5',
          'transition-colors duration-150',
          isActive
            ? 'bg-white/[0.06] text-white'
            : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator bar */}
          {isActive && (
            <motion.span
              layoutId="sidebar-active-indicator"
              className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent-core shadow-glow-core-sm"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}

          <Icon
            size={18}
            strokeWidth={1.75}
            className="shrink-0"
          />

          {!isCollapsed && (
            <span className="truncate text-sm font-medium">
              {item.label}
            </span>
          )}

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <span
              className={[
                'pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md',
                'bg-surface-glass px-2.5 py-1.5 text-xs font-medium text-white',
                'border border-white/10 shadow-lg backdrop-blur-md',
                'opacity-0 transition-opacity duration-150 group-hover:opacity-100',
                'z-50',
              ].join(' ')}
            >
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}