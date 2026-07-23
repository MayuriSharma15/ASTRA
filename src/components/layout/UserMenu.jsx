/**
 * UserMenu
 * -----------------------------------------------------------------------
 * Now uses REAL user data from useAuth() instead of a hardcoded
 * placeholder, and "Log out" actually clears the real session (token +
 * context state) via the auth context, not just a page navigation.
 * ----------------------------------------------------------------------- */

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useAuth } from "../../hooks/useAuth";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useClickOutside(containerRef, () => setOpen(false), open);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("/");
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-accent-core to-accent-signal text-text-on-accent font-display font-semibold text-xs hover:opacity-90 transition-opacity duration-fast"
      >
        {initials}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-56 rounded-lg border border-glass-border bg-bg-abyss/95 backdrop-blur-glass-strong shadow-elevation-2 overflow-hidden z-overlay"
          >
            <div className="px-4 py-3 border-b border-glass-border">
              <p className="text-sm text-text-primary font-body font-medium">
                {user?.name ?? "Loading..."}
              </p>
              <p className="text-xs text-text-tertiary font-body mt-0.5">
                {user?.email ?? ""}
              </p>
            </div>

            <div className="py-1">
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-glass-fill-hover transition-colors duration-fast font-body"
              >
                <User size={16} strokeWidth={1.75} />
                Profile
              </Link>
              <Link
                to="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-glass-fill-hover transition-colors duration-fast font-body"
              >
                <Settings size={16} strokeWidth={1.75} />
                Settings
              </Link>
            </div>

            <div className="py-1 border-t border-glass-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-accent-rare hover:bg-accent-rare/10 transition-colors duration-fast font-body"
              >
                <LogOut size={16} strokeWidth={1.75} />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}