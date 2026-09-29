"use client";

import { useMemo } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

interface SectionDotsProps {
  sections: { id: string; label: string }[];
}

export function SectionDots({ sections }: SectionDotsProps) {
  // .map crea un nuovo array ad ogni render; senza memo l'effetto dentro
  // useActiveSection (dipendenza [ids]) ripartirebbe ad ogni render — cioè
  // ad ogni cambio di sezione attiva, dato che quel cambio causa proprio un
  // re-render di questo componente — disconnettendo e ricreando
  // l'IntersectionObserver in loop e perdendo aggiornamenti (il sintomo:
  // nav/segmenti che non si aggiornano più durante lo scroll).
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);

  return (
    <nav className="section-index" aria-label="Sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`section-index-item${active === section.id ? " active" : ""}`}
          aria-label={section.label}
          aria-current={active === section.id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
