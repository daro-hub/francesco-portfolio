"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { dictionary } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "#about", label: dictionary.nav.about },
  { href: "#projects", label: dictionary.nav.projects },
  { href: "#experience", label: dictionary.nav.experience },
  { href: "#education", label: dictionary.nav.education },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header">
      {isHome ? (
        <a href="#top" className="site-logo">
          FDRZ
        </a>
      ) : (
        <Link href="/" className="site-logo">
          FDRZ
        </Link>
      )}

      {isHome && (
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <div className="site-header-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        {isHome && (
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {isHome && menuOpen && (
        <nav className="site-nav-mobile" aria-label="Primary mobile">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
