"use client";

import { useRef, type ReactNode } from "react";
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

  return (
    <div id="scroll-container" ref={ref}>
      {children}
    </div>
  );
}
