/**
 * Orbit module data
 * -----------------------------------------------------------------------
 * The five career modules that orbit the AI Core in the Hero — this is
 * the single most important piece of content on the entire page, since
 * it's what visually communicates "ASTRA connects every part of your
 * career" before the user reads a single word of copy.
 *
 * `angle` is the resting position in degrees around the orbit circle
 * (0 = top, clockwise). `radius` multiplier lets individual modules sit
 * on slightly different orbit rings for visual depth rather than a
 * perfectly flat circle — small variation reads as more organic/3D.
 * ----------------------------------------------------------------------- */

import { FileText, BookOpen, FolderKanban, MessageSquareText, Map } from "lucide-react";

export const orbitModules = [
  { id: "resume", label: "Resume", icon: FileText, angle: 0, radiusFactor: 1 },
  { id: "learning", label: "Learning", icon: BookOpen, angle: 72, radiusFactor: 1.08 },
  { id: "projects", label: "Projects", icon: FolderKanban, angle: 144, radiusFactor: 0.95 },
  { id: "interview", label: "Interview", icon: MessageSquareText, angle: 216, radiusFactor: 1.05 },
  { id: "roadmap", label: "Roadmap", icon: Map, angle: 288, radiusFactor: 1 },
];
