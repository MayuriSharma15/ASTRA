import { createContext, useContext, useState, useCallback, useMemo } from 'react';

/**
 * SidebarContext
 * ----------------------------------------------------------------------------
 * Owns the sidebar's collapsed/expanded state at a level above the Sidebar
 * component itself. This lets sibling layout pieces (TopNav, DashboardLayout,
 * page content wrappers) react to sidebar width without prop-drilling or
 * reaching into the Sidebar component directly.
 *
 * Why context and not local state in Sidebar.jsx:
 * - TopNav (Step 2) needs to know sidebar width to align correctly
 * - DashboardLayout needs it to size the content area
 * - Any future "collapse sidebar" keyboard shortcut can live outside the
 *   Sidebar component entirely
 */

const SidebarContext = createContext(undefined);

const SIDEBAR_WIDTH_EXPANDED = 264; // px
const SIDEBAR_WIDTH_COLLAPSED = 80; // px

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isCollapsed,
      toggleCollapsed,
      width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
    }),
    [isCollapsed, toggleCollapsed]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}