"use client";

import { useEffect, type RefObject } from "react";

// Stesso media query usato in globals.css per lo snap CSS di
// #scroll-container: tenerli allineati, altrimenti lo snap e il salto JS
// si attiverebbero a soglie diverse.
const DESKTOP_LANDSCAPE_QUERY = "(min-width: 768px) and (orientation: landscape)";

/**
 * Scroll "a blocchi" reale: una rotellina/swipe = un salto alla sezione
 * successiva/precedente, invece del semplice CSS scroll-snap (che con
 * "proximity" lascia scorrere liberamente, e con "mandatory" da solo produce
 * comunque scatti perché il browser non blocca l'input durante l'animazione
 * di snap, permettendo eventi aggiuntivi di sovrapporsi).
 *
 * Se la sezione corrente è più alta del viewport (es. About/Education su
 * schermi piccoli), lo scroll nativo dentro la sezione resta libero: il
 * salto alla sezione successiva scatta solo quando si è già arrivati al suo
 * bordo superiore/inferiore, così il contenuto extra resta leggibile.
 *
 * Attivo solo su una finestra desktop orizzontale (min-width 768px E
 * orientamento landscape): su mobile/tablet, o su una finestra desktop
 * ridimensionata in verticale, lo scroll resta completamente libero —
 * niente blocchi a schermata, solo la linea divisoria tra sezioni (vedi
 * .doc-section in globals.css) a segnare dove finisce una sezione e inizia
 * la successiva.
 */
export function useBlockScroll(
  containerRef: RefObject<HTMLElement | null>,
  sectionSelector = ".doc-section",
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const query = window.matchMedia(DESKTOP_LANDSCAPE_QUERY);
    let detach: () => void = () => {};

    function sync() {
      detach();
      detach = query.matches ? attach(container!, sectionSelector) : () => {};
    }

    sync();
    query.addEventListener("change", sync);

    return () => {
      detach();
      query.removeEventListener("change", sync);
    };
  }, [containerRef, sectionSelector]);
}

function attach(container: HTMLElement, sectionSelector: string): () => void {
  let isAnimating = false;
  let animationTimeout: ReturnType<typeof setTimeout> | null = null;
  // Accumulo del delta touch tra touchstart e il superamento della soglia,
  // per decidere la direzione senza scattare al primo micro-movimento.
  let touchStartY = 0;
  let touchAccumulated = 0;

  const getSections = () =>
    Array.from(container.querySelectorAll<HTMLElement>(sectionSelector));

  function lockDuring(ms: number) {
    isAnimating = true;
    if (animationTimeout) clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => {
      isAnimating = false;
    }, ms);
  }

  function jumpTo(target: HTMLElement) {
    lockDuring(650);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function findCurrentIndex(sections: HTMLElement[]) {
    const containerRect = container.getBoundingClientRect();
    let currentIdx = 0;
    let minDist = Infinity;
    sections.forEach((sec, idx) => {
      const dist = Math.abs(sec.getBoundingClientRect().top - containerRect.top);
      if (dist < minDist) {
        minDist = dist;
        currentIdx = idx;
      }
    });
    return currentIdx;
  }

  function tryNavigate(direction: 1 | -1): boolean {
    const sections = getSections();
    if (sections.length === 0) return false;
    const currentIdx = findCurrentIndex(sections);
    const current = sections[currentIdx];
    const containerRect = container.getBoundingClientRect();
    const rect = current.getBoundingClientRect();

    const atSectionTop = rect.top - containerRect.top >= -2;
    const atSectionBottom = rect.bottom - containerRect.bottom <= 2;

    if (direction > 0 && atSectionBottom) {
      const next = sections[currentIdx + 1];
      if (next) {
        jumpTo(next);
        return true;
      }
    } else if (direction < 0 && atSectionTop) {
      const prev = sections[currentIdx - 1];
      if (prev) {
        jumpTo(prev);
        return true;
      }
    }
    return false;
  }

  function onWheel(e: WheelEvent) {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    if (e.deltaY === 0) return;
    const direction = e.deltaY > 0 ? 1 : -1;
    const navigated = tryNavigate(direction);
    if (navigated) e.preventDefault();
    // Altrimenti lascia lo scroll nativo scorrere dentro la sezione corrente.
  }

  function onTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0]?.clientY ?? 0;
    touchAccumulated = 0;
  }

  function onTouchMove(e: TouchEvent) {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    const currentY = e.touches[0]?.clientY ?? touchStartY;
    touchAccumulated = touchStartY - currentY;
    const threshold = 32;
    if (Math.abs(touchAccumulated) < threshold) return;

    const direction = touchAccumulated > 0 ? 1 : -1;
    const navigated = tryNavigate(direction);
    if (navigated) {
      e.preventDefault();
      touchStartY = currentY;
      touchAccumulated = 0;
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLElement | null;
    // Non intercettare input/textarea/select o elementi con editing.
    if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;
    if (isAnimating) {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)) {
        e.preventDefault();
      }
      return;
    }

    const sections = getSections();
    if (sections.length === 0) return;

    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      if (tryNavigate(1)) e.preventDefault();
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      if (tryNavigate(-1)) e.preventDefault();
    } else if (e.key === "Home") {
      e.preventDefault();
      jumpTo(sections[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      jumpTo(sections[sections.length - 1]);
    }
  }

  // Link con href="#id" (nav header, indice sezioni, scroll cue): usano lo
  // stesso jumpTo (con lo stesso "lock") invece dell'anchor-jump nativo,
  // così wheel/touch non possono sovrapporsi all'animazione e produrre
  // scatti a metà scroll.
  function onDocumentClick(e: MouseEvent) {
    const anchor = (e.target as HTMLElement)?.closest?.(
      'a[href^="#"]',
    ) as HTMLAnchorElement | null;
    if (!anchor) return;
    const id = anchor.getAttribute("href")?.slice(1);
    if (!id) return;
    const targetEl = document.getElementById(id);
    if (!targetEl || !container.contains(targetEl)) return;
    e.preventDefault();
    jumpTo(targetEl);
  }

  container.addEventListener("wheel", onWheel, { passive: false });
  container.addEventListener("touchstart", onTouchStart, { passive: true });
  container.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("keydown", onKeyDown);
  document.addEventListener("click", onDocumentClick);

  return () => {
    container.removeEventListener("wheel", onWheel);
    container.removeEventListener("touchstart", onTouchStart);
    container.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("click", onDocumentClick);
    if (animationTimeout) clearTimeout(animationTimeout);
  };
}
