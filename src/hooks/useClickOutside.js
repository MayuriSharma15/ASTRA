/**
 * useClickOutside
 * -----------------------------------------------------------------------
 * Fires a callback when a click/touch happens OUTSIDE the given ref's
 * element. This is the standard mechanism behind every real dropdown,
 * popover, and menu (notification bell, user menu, search suggestions,
 * etc.) — without it, dropdowns only close when their own toggle button
 * is clicked again, which feels broken compared to real software.
 *
 * Reusable across BOTH dropdowns being built in this step (and any
 * future ones — a "New Project" menu, a filter popover, etc.) rather
 * than each component reimplementing its own document listener.
 *
 * @param {React.RefObject} ref
 * @param {() => void} onOutsideClick
 * @param {boolean} [enabled=true] - only attaches the listener while true,
 *   so closed dropdowns don't keep a document-level listener running
 * ----------------------------------------------------------------------- */

import { useEffect } from "react";

export function useClickOutside(ref, onOutsideClick, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutsideClick, enabled]);
}