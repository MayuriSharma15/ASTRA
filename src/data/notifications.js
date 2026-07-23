/**
 * Notifications placeholder data
 * -----------------------------------------------------------------------
 * Local placeholder list for the TopBar notification dropdown — no
 * backend/API yet, so this is static data rendered through real,
 * functional dropdown UI. Once notifications are backend-driven, this
 * file is deleted and the component fetches from a real source instead
 * — the component itself won't need to change shape.
 * ----------------------------------------------------------------------- */

export const notifications = [
  {
    id: "n1",
    title: "Your resume review is ready",
    time: "2h ago",
    unread: true,
  },
  {
    id: "n2",
    title: "New roadmap milestone unlocked",
    time: "1d ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Mock interview feedback available",
    time: "3d ago",
    unread: false,
  },
];