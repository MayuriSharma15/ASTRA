import { motion } from 'framer-motion';
import { useSidebar } from '../../../context/SidebarContext';

/**
 * SidebarLogo
 * ----------------------------------------------------------------------------
 * Brand mark at the top of the sidebar. Collapses to just the glyph when
 * the sidebar is collapsed; wordmark fades/slides out rather than
 * disappearing abruptly.
 */
export default function SidebarLogo() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex items-center gap-3 px-5 py-6">
      {/* Glyph — stays visible in both states */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-core to-accent-secondary shadow-glow-core-sm">
        <span className="font-mono text-sm font-semibold text-white">A</span>
      </div>

      {/* Wordmark — collapses away */}
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          ASTRA
        </motion.span>
      )}
    </div>
  );
}