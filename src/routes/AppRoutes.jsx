import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { CareerChat } from "../pages/CareerChat";
import { Resume } from "../pages/Resume";
import { NotFound } from "../pages/NotFound";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/chat"
        element={
          <ProtectedRoute>
            <CareerChat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/resume"
        element={
          <ProtectedRoute>
            <Resume />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}