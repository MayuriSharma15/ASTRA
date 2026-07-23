/**
 * NotificationsMenu
 * -----------------------------------------------------------------------
 * Bell icon + dropdown panel. Real functional state: open/close via
 * click, closes on outside click (useClickOutside), unread count badge
 * derived from data rather than hardcoded. Marking as read updates
 * local component state only — no persistence yet, resets on refresh,
 * which is correct and expected until a backend exists.
 * ----------------------------------------------------------------------- */

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { notifications as initialNotifications } from "../../data/notifications";
import { cn } from "../../utils/cn";

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialNotifications);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  const unreadCount = items.filter((n) => n.unread).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex items-center justify-center w-9 h-9 rounded-md text-text-secondary hover:text-text-primary hover:bg-glass-fill-hover transition-colors duration-fast"
      >
        <Bell size={18} strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-accent-rare text-[10px] font-body font-semibold text-text-on-accent">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-80 rounded-lg border border-glass-border bg-bg-abyss/95 backdrop-blur-glass-strong shadow-elevation-2 overflow-hidden z-overlay"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
              <span className="font-body font-medium text-sm text-text-primary">
                Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-accent-signal hover:text-accent-signal-soft font-body"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 border-b border-glass-border last:border-b-0",
                    item.unread && "bg-accent-core/5"
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                      item.unread ? "bg-accent-core" : "bg-transparent"
                    )}
                  />
                  <div>
                    <p className="text-sm text-text-primary font-body">{item.title}</p>
                    <p className="text-xs text-text-tertiary font-body mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}