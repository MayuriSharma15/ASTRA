/**
 * Dashboard (Overview)
 * -----------------------------------------------------------------------
 * Now uses the shared DashboardLayout instead of duplicating Sidebar +
 * TopBar setup directly — this file is purely the Overview page's
 * content now.
 * ----------------------------------------------------------------------- */

import { DashboardLayout } from "../layouts/Dashboard";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { StatCard } from "../components/dashboard/StatCard";
import { LearningProgressWidget } from "../components/dashboard/LearningProgressWidget";
import { GoalsWidget } from "../components/dashboard/GoalsWidget";
import { RecentActivityWidget } from "../components/dashboard/RecentActivityWidget";
import { QuickActionsWidget } from "../components/dashboard/QuickActionsWidget";
import { dashboardStats } from "../data/dashboardStats";
import { useAuth } from "../hooks/useAuth";

export function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <DashboardLayout>
      <ScrollReveal>
        <h1 className="font-display font-semibold text-2xl text-text-primary">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-text-secondary font-body text-sm">
          Here's where your career journey stands today.
        </p>
      </ScrollReveal>

      <ScrollReveal stagger staggerDelay={0.08} delay={0.1}>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat) => (
            <ScrollReveal.Item key={stat.id}>
              <StatCard stat={stat} />
            </ScrollReveal.Item>
          ))}
        </div>
      </ScrollReveal>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScrollReveal delay={0.15} className="lg:col-span-2">
          <LearningProgressWidget />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GoalsWidget />
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <RecentActivityWidget />
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="lg:col-span-2">
          <QuickActionsWidget />
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
}