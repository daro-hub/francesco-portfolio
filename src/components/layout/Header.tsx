"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { dictionary } from "@/i18n";
import { content } from "@/resources/content";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { href: "#about", id: "about", label: dictionary.nav.about },
  { href: "#projects", id: "projects", label: dictionary.nav.projects },
  { href: "#experience", id: "experience", label: dictionary.nav.experience },
  { href: "#education", id: "education", label: dictionary.nav.education },
];

const sectionIds = ["top", ...navItems.map((item) => item.id)];

const initials = content.personal.fullName
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? sectionIds : []);

  const logo = initials;

  return (
    <header className="site-header">
      {isHome ? (
        <a href="#top" className="site-logo">
          {logo}
        </a>
      ) : (
        <Link href="/" className="site-logo">
          {logo}
        </Link>
      )}

      {isHome && (
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.id ? "active" : undefined}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <div className="site-header-actions">
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
            <a
              key={item.href}
              href={item.href}
              className={active === item.id ? "active" : undefined}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
