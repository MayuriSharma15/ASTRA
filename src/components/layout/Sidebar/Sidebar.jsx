import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSidebar } from '../../../context/SidebarContext';
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../../config/navigation';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';

/**
 * Sidebar
 * ----------------------------------------------------------------------------
 * Primary application navigation shell. Purely presentational: reads
 * collapsed state from SidebarContext, reads nav structure from config,
 * and composes SidebarLogo + SidebarItem. Contains no fetching, no auth,
 * no business logic — by design, per Phase 2 scope.
 */
export default function Sidebar() {
  const { isCollapsed, toggleCollapsed, width } = useSidebar();

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-screen shrink-0 flex-col border-r border-white/[0.06] bg-surface-glass backdrop-blur-xl"
    >
      <SidebarLogo />

      {/* Primary navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {PRIMARY_NAV_ITEMS.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}

        <div className="my-3 h-px bg-white/[0.06]" />

        {SECONDARY_NAV_ITEMS.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-white/[0.06] p-3">
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex w-full items-center justify-center rounded-lg p-2 text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white/80"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={18} strokeWidth={1.75} />
          ) : (
            <PanelLeftClose size={18} strokeWidth={1.75} />
          )}
        </button>
      </div>
    </motion.aside>
  );
}