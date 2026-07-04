/**
 * Features data
 * -----------------------------------------------------------------------
 * The six pillars shown in the Features grid — a representative slice of
 * ASTRA's full long-term module list (Resume, Interview, Learning,
 * Roadmap, Projects, Analytics), chosen to demonstrate breadth across
 * the whole career journey without listing all 11 future modules and
 * diluting the message. Portfolio/Job Tracker/Career Memory are
 * intentionally omitted here — six cards reads as curated, eleven reads
 * as overwhelming for a first-viewport-adjacent section.
 * ----------------------------------------------------------------------- */

import {
  FileText,
  MessageSquareText,
  BookOpen,
  Map,
  FolderKanban,
  BarChart3,
} from "lucide-react";

export const features = [
  {
    id: "resume",
    icon: FileText,
    tone: "core",
    title: "Resume Builder & Reviewer",
    description:
      "Build a role-tailored resume and get instant, specific feedback — not generic tips, but line-by-line guidance based on the job you're targeting.",
  },
  {
    id: "interview",
    icon: MessageSquareText,
    tone: "signal",
    title: "AI Mock Interviews",
    description:
      "Practice real interview scenarios with an AI that adapts questions to your target role and gives you honest, actionable feedback after each session.",
  },
  {
    id: "learning",
    icon: BookOpen,
    tone: "core",
    title: "Learning Hub",
    description:
      "Skip the scattered tutorials. Get a curated learning path built around the specific gaps between where you are and where you want to be.",
  },
  {
    id: "roadmap",
    icon: Map,
    tone: "signal",
    title: "AI Career Roadmaps",
    description:
      "A personalized, step-by-step path to your goal role — generated from your background, not a generic template everyone else is following too.",
  },
  {
    id: "projects",
    icon: FolderKanban,
    tone: "rare",
    title: "Project Builder",
    description:
      "Turn your learning into portfolio-ready proof. Get guided project ideas that actually match what employers in your target role look for.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    tone: "core",
    title: "Career Analytics",
    description:
      "See your progress as data, not guesswork — track skill growth, application outcomes, and readiness for the roles you're aiming at.",
  },
];
