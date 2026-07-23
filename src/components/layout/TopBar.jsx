/**
 * TopBar
 * -----------------------------------------------------------------------
 * Dashboard top navigation bar. Three real functional pieces:
 *   1. Page title — derived from the current route via useLocation,
 *      matched against dashboardNavItems, so it updates automatically
 *      as new dashboard pages are added (no manual title per page).
 *   2. Search input — fully controlled (real typing, real clear
 *      button), not wired to real search logic yet since there's no
 *      data to search across yet. The input state itself IS real.
 *   3. Notifications + user menu — real open/close dropdowns.
 * ----------------------------------------------------------------------- */

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import { NotificationsMenu } from "./NotificationsMenu";
import { UserMenu } from "./UserMenu";
import { dashboardNavItems } from "../../data/dashboardNav";

function getPageTitle(pathname) {
  const match = dashboardNavItems.find((item) =>
    item.end ? item.path === pathname : pathname.startsWith(item.path)
  );
  return match?.label ?? "Dashboard";
}

export function TopBar() {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="h-16 shrink-0 flex items-center justify-between gap-4 px-6 border-b border-glass-border bg-bg-void/40 backdrop-blur-glass">
      <h1 className="font-display font-semibold text-lg text-text-primary shrink-0">
        {pageTitle}
      </h1>

      <div className="relative flex-1 max-w-sm hidden sm:block">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9 pr-8 py-2 rounded-md bg-glass-fill border border-glass-border text-sm text-text-primary placeholder:text-text-tertiary font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors duration-fast"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}