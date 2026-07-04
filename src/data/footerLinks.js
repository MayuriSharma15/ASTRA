/**
 * Footer link data
 * -----------------------------------------------------------------------
 * Grouped into columns. Phase 1 has no real destination pages for most
 * of these yet — hrefs point to in-page anchors where a matching section
 * exists, and "#" placeholders elsewhere. Replace with real routes once
 * routing/pages exist in a later phase.
 * ----------------------------------------------------------------------- */

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Journey", href: "#journey" },
      { label: "Vision", href: "#vision" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];
