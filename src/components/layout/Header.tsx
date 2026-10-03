"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { dictionary } from "@/i18n";
import { content } from "@/resources/content";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { href: "#about", id: "about", label: dictionary.nav.about },
  { href: "#amuse-app", id: "amuse-app", label: dictionary.nav.amuseApp },
  { href: "#projects", id: "projects", label: dictionary.nav.projects },
  { href: "#experience", id: "experience", label: dictionary.nav.experience },
  { href: "#education", id: "education", label: dictionary.nav.education },
];

const sectionIds = ["top", ...navItems.map((item) => item.id)];

const initials = content.personal.fullName
  .split(" ")
  .map((part) => part[0])
  .join("");

// Stesso breakpoint di .menu-toggle/.site-nav in globals.css: sopra questa
// soglia il bottone hamburger è nascosto via CSS, quindi è l'unico punto in
// cui un redimensionamento della finestra può lasciare il menu mobile aperto
// senza più alcun controllo visibile per richiuderlo.
const DESKTOP_QUERY = "(min-width: 768px)";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? sectionIds : []);
  const headerRef = useRef<HTMLElement>(null);

  const logo = initials;

  // Richiude automaticamente il menu se la finestra viene ridimensionata (o
  // ruotata) sopra il breakpoint desktop mentre è aperto.
  useEffect(() => {
    if (!menuOpen) return;
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const closeIfDesktop = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };
    desktopQuery.addEventListener("change", closeIfDesktop);
    return () => desktopQuery.removeEventListener("change", closeIfDesktop);
  }, [menuOpen]);

  // Click fuori dal menu o tasto Escape: prima l'unico modo per richiuderlo
  // era il bottone hamburger stesso o un click su un link di navigazione.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
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
