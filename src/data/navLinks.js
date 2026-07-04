/**
 * Navigation data
 * -----------------------------------------------------------------------
 * Kept separate from Navbar.jsx per architecture rule: components render
 * data, they don't hardcode it. These are anchor links into single-page
 * sections for now (Phase 1 is one landing page) — when routes/ comes
 * online in a later phase, this file is exactly what gets extended with
 * real route paths, not replaced.
 * ----------------------------------------------------------------------- */

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
  { label: "FAQ", href: "#faq" },
];
