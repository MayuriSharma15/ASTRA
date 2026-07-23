/**
 * Recent activity placeholder data
 * -----------------------------------------------------------------------
 * Local placeholder feed. Once real feature usage exists, each real
 * action (resume edit, interview completed, etc.) would append a real
 * entry here via the backend — shape stays the same.
 * ----------------------------------------------------------------------- */

import { FileText, MessageSquareText, BookOpen, Target } from "lucide-react";

export const recentActivity = [
  {
    id: "a1",
    icon: MessageSquareText,
    tone: "signal",
    text: "Completed a mock interview for Frontend Engineer",
    time: "2 hours ago",
  },
  {
    id: "a2",
    icon: FileText,
    tone: "core",
    text: "Updated resume — added Projects section",
    time: "Yesterday",
  },
  {
    id: "a3",
    icon: BookOpen,
    tone: "rare",
    text: "Completed lesson: React State Management",
    time: "2 days ago",
  },
  {
    id: "a4",
    icon: Target,
    tone: "core",
    text: "Marked goal complete: Resume review",
    time: "3 days ago",
  },
];