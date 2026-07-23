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
