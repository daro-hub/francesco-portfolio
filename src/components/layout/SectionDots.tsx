"use client";

import { useEffect, useState } from "react";

interface SectionDotsProps {
  sections: { id: string; label: string }[];
}

export function SectionDots({ sections }: SectionDotsProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="section-dots" aria-label="Sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`section-dot${active === section.id ? " active" : ""}`}
          aria-label={section.label}
          aria-current={active === section.id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
