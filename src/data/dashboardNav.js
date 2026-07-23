
/**
 * Dashboard navigation data
 * -----------------------------------------------------------------------
 * Sidebar nav items for the ASTRA OS shell. Paths use a nested shape
 * (/dashboard/resume, /dashboard/interview, etc.) anticipating that the
 * Dashboard Layout (Step 3) will use React Router's nested routing
 * (<Outlet />) rather than flat top-level routes per feature — this
 * mirrors how real dashboard products (Linear, Vercel) structure their
 * URL space under one parent shell route.
 *
 * `end: true` on the Overview item ensures NavLink only marks it active
 * on an EXACT match to "/dashboard" — without this, "/dashboard" would
 * always show as active even when viewing "/dashboard/resume", since
 * NavLink matches path prefixes by default.
 * ----------------------------------------------------------------------- */

import {
  LayoutDashboard,
  FileText,
  MessageSquareText,
  BookOpen,
  Map,
  FolderKanban,
  BarChart3,
  MessagesSquare,
} from "lucide-react";

export const dashboardNavItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard", end: true },
  { id: "chat", label: "Career Chat", icon: MessagesSquare, path: "/dashboard/chat" },
  { id: "resume", label: "Resume", icon: FileText, path: "/dashboard/resume" },
  { id: "interview", label: "Interview", icon: MessageSquareText, path: "/dashboard/interview" },
  { id: "learning", label: "Learning", icon: BookOpen, path: "/dashboard/learning" },
  { id: "roadmap", label: "Roadmap", icon: Map, path: "/dashboard/roadmap" },
  { id: "projects", label: "Projects", icon: FolderKanban, path: "/dashboard/projects" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
];