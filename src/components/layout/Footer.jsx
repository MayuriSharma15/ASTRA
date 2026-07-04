/**
 * Footer
 * -----------------------------------------------------------------------
 * Final section of the page. Placed in layout/ rather than sections/
 * since — like Navbar — it's structural chrome that wraps the page
 * rather than marketing content that could be reordered/removed.
 *
 * Social links are text labels, not icon buttons, since Phase 1 has no
 * real social profiles to link to yet — shipping icon buttons that go
 * nowhere real would be worse than plain labeled placeholders.
 * ----------------------------------------------------------------------- */

import { Orbit } from "lucide-react";
import { Container } from "./Container";
import { footerColumns, socialLinks } from "../../data/footerLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-content border-t border-glass-border">
      <Container size="default" className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-core/10 border border-accent-core/30 text-accent-core">
                <Orbit size={18} strokeWidth={2} />
              </span>
              <span className="font-display font-semibold text-lg text-text-primary tracking-tight">
                ASTRA
              </span>
            </div>
            <p className="mt-4 text-text-secondary font-body text-sm max-w-xs">
              The career intelligence platform connecting every stage of
              your journey — one system instead of a dozen tools.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-mono-label text-xs text-text-tertiary mb-4">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-fast font-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary font-body text-xs">
            © {year} ASTRA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-text-tertiary hover:text-text-primary transition-colors duration-fast font-body text-xs"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
