/**
 * Container
 * -----------------------------------------------------------------------
 * Constrains content to a consistent max-width and horizontal padding.
 * Every section wraps its content in this rather than each section
 * inventing its own max-width value.
 *
 * PROPS
 * @param {React.ReactNode} children
 * @param {'default'|'narrow'|'wide'} [size='default']
 *   default - 7xl (1280px)
 *   narrow  - 3xl (768px)   — text-heavy content (Vision, FAQ)
 *   wide    - 1600px         — Hero orbit system needs the extra room
 * @param {string} [className]
 * @param {React.ElementType} [as='div']
 * ----------------------------------------------------------------------- */

import { cn } from "../../utils/cn";

const SIZE_MAP = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[1600px]",
};

export function Container({ children, size = "default", className, as: Component = "div" }) {
  return (
    <Component className={cn("mx-auto w-full px-6 md:px-8", SIZE_MAP[size], className)}>
      {children}
    </Component>
  );
}