/**
 * Journey data
 * -----------------------------------------------------------------------
 * The six-stage career journey shown in the Timeline section — narrative
 * sequence (not feature list) of how a person actually moves through
 * ASTRA over time. Order matters here; this is deliberately sequenced
 * start-to-finish, unlike Features.js which has no inherent order.
 * ----------------------------------------------------------------------- */

import { Compass, GraduationCap, Hammer, Mic, Send, TrendingUp } from "lucide-react";

export const journeySteps = [
  {
    id: "discover",
    icon: Compass,
    title: "Discover your path",
    description:
      "Tell ASTRA where you are and where you want to go. Get a personalized roadmap built around your actual background, not a generic template.",
  },
  {
    id: "learn",
    icon: GraduationCap,
    title: "Build your skills",
    description:
      "Follow a curated learning path targeting the specific gaps between your current skills and your goal role — no more guessing what to study next.",
  },
  {
    id: "build",
    icon: Hammer,
    title: "Create real projects",
    description:
      "Turn what you've learned into portfolio-ready proof, guided toward the kind of work employers in your target role actually look for.",
  },
  {
    id: "practice",
    icon: Mic,
    title: "Practice & prepare",
    description:
      "Run mock interviews tailored to your target role and get direct, specific feedback — not vague encouragement, real areas to improve.",
  },
  {
    id: "apply",
    icon: Send,
    title: "Apply with confidence",
    description:
      "Go in with a resume that's been reviewed line-by-line and interview reps under your belt, instead of hoping for the best.",
  },
  {
    id: "grow",
    icon: TrendingUp,
    title: "Track your growth",
    description:
      "See your progress as real data — skill growth, application outcomes, and readiness — so your next move is informed, not a guess.",
  },
];
