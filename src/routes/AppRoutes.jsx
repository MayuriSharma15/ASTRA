/**
 * AppRoutes
 * -----------------------------------------------------------------------
 * Centralized route definitions. Right now: the landing page at "/" and
 * a catch-all 404 for everything else. When Phase 2+ adds a dashboard,
 * auth pages, etc., they get added here as new <Route> entries — App.jsx
 * itself never needs to change again for routing purposes.
 * ----------------------------------------------------------------------- */

import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}