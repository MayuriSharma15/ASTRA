/**
 * Dashboard quick-stats data
 * -----------------------------------------------------------------------
 * Placeholder metrics for the top stat row. Local/static for now — once
 * real resume/interview/learning features exist, these become real
 * calculated values fetched from the backend, but the component shape
 * (StatCard) doesn't need to change, only where the numbers come from.
 * ----------------------------------------------------------------------- */

import { FileText, MessageSquareText, BookOpen, Target } from "lucide-react";

export const dashboardStats = [
  {
    id: "resume-score",
    icon: FileText,
    tone: "core",
    label: "Resume Score",
    value: "78",
    suffix: "/100",
    trend: "+12 this week",
    trendUp: true,
  },
  {
    id: "interview-sessions",
    icon: MessageSquareText,
    tone: "signal",
    label: "Mock Interviews",
    value: "5",
    suffix: " completed",
    trend: "+2 this week",
    trendUp: true,
  },
  {
    id: "learning-progress",
    icon: BookOpen,
    tone: "rare",
    label: "Learning Progress",
    value: "64",
    suffix: "%",
    trend: "On track",
    trendUp: true,
  },
  {
    id: "goals-active",
    icon: Target,
    tone: "core",
    label: "Active Goals",
    value: "3",
    suffix: " of 5",
    trend: "2 completed",
    trendUp: true,
  },
];