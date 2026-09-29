"use client";

import { useEffect, useState } from "react";

/**
 * Tiene traccia di quale sezione (per id) è attualmente più visibile nel
 * viewport. Condiviso tra SectionDots (indice laterale) e Header (highlight
 * nav) per evitare due IntersectionObserver indipendenti che potrebbero
 * disallinearsi tra loro.
 */
export function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Tiene la % di intersezione di ogni sezione osservata e sceglie quella
    // più visibile ad ogni frame di intersection, invece di scattare sulla
    // prima che supera la soglia (più stabile quando due sezioni sono
    // entrambe parzialmente visibili durante lo scroll).
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });
        let bestId: string | undefined;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId && bestRatio > 0) {
          setActive(bestId);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
