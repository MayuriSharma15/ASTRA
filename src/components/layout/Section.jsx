/**
 * Section
 * -----------------------------------------------------------------------
 * Standard vertical rhythm wrapper for every landing page section.
 * Handles consistent top/bottom padding and the `id` anchor that Navbar
 * links scroll to — so Hero, Features, Timeline etc. never hardcode
 * their own spacing values or duplicate the id-attachment pattern.
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {string} [id]              - anchor id, matched against navLinks hrefs
 * @param {'sm'|'md'|'lg'} [spacing='lg']
 * @param {string} [className]
 * ----------------------------------------------------------------------- */

import { cn } from "../../utils/cn";

const SPACING_MAP = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

export function Section({ children, id, spacing = "lg", className }) {
  return (
    <section
      id={id}
      className={cn("relative w-full scroll-mt-20", SPACING_MAP[spacing], className)}
    >
      {children}
    </section>
  );
}