"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useBlockScroll } from "@/hooks/useBlockScroll";

interface ScrollContainerProps {
  children: ReactNode;
}

/**
 * Wrapper client per #scroll-container: applica lo scroll "a blocchi" via
 * useBlockScroll (vedi lì per il perché non basta il solo CSS scroll-snap).
 */
export function ScrollContainer({ children }: ScrollContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useBlockScroll(ref);

  // Chrome ricorda e ripristina lo scrollTop di un elemento con un id
  // stabile (qui "scroll-container") per uno stesso URL, anche su una
  // navigazione "fresca" — non solo su back/forward dove ci si
  // aspetterebbe. Risultato osservato: ad apertura del sito si arriva già
  // scrollati dentro About/Projects invece che in cima. Sincrono (prima
  // del paint) per evitare un flash visibile della posizione sbagliata:
  // onora un eventuale hash nell'URL (link diretto a una sezione),
  // altrimenti forza l'inizio.
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    try {
      history.scrollRestoration = "manual";
    } catch {
      // API non disponibile in alcuni contesti (vecchi browser): non blocca il resto.
    }

    const hashId = window.location.hash.slice(1);
    const target = hashId ? document.getElementById(hashId) : null;
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      container.scrollTop = 0;
    }
  }, []);

  return (
    <div id="scroll-container" ref={ref}>
      {children}
    </div>
  );
}
