/**
 * DashboardLayout
 * -----------------------------------------------------------------------
 * Shared shell for every page inside the dashboard (Overview, Career
 * Chat, and eventually Resume/Interview/Learning/etc.). Extracted here
 * so Sidebar + TopBar are wired up ONCE — previously Dashboard.jsx
 * duplicated this setup, which meant every future dashboard page would
 * have re-duplicated it again. Sidebar's collapsed state lives here
 * (lifted from Sidebar's own internal state) since every dashboard page
 * needs the content area to shift consistently when it's toggled.
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {boolean} [noScroll=false] - some pages (like a chat interface)
 *   manage their own internal scroll region rather than letting the
 *   whole page scroll — this disables the outer scroll container for
 *   those cases.
 * ----------------------------------------------------------------------- */

import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { TopBar } from "../components/layout/TopBar";
import { PageBackground } from "../components/background/PageBackground";

export function DashboardLayout({ children, noScroll = false }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen flex">
      <PageBackground showGrid={false} showParticles={false} auroraIntensity={0.35} />

      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <div className="relative z-content flex-1 flex flex-col min-w-0 h-screen">
        <TopBar />

        <main className={noScroll ? "flex-1 min-h-0" : "flex-1 overflow-y-auto px-6 md:px-8 py-8"}>
          {children}
        </main>
      </div>
    </div>
  );
}