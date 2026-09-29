"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

interface ContactActionPillProps {
  /** tel:/mailto: — l'azione di un tap/click normale. */
  href: string;
  /** Valore copiato negli appunti su tap prolungato (numero/email "puliti"). */
  copyValue: string;
  icon: ReactNode;
  label: string;
  copiedLabel: string;
}

const LONG_PRESS_MS = 500;

/**
 * Pillola di contatto con doppio comportamento: tap/click breve apre
 * l'azione nativa (tel: → rubrica/chiamata, mailto: → client email);
 * tap/click prolungato copia il valore negli appunti invece di navigare.
 */
export function ContactActionPill({
  href,
  copyValue,
  icon,
  label,
  copiedLabel,
}: ContactActionPillProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressedRef = useRef(false);
  const [copied, setCopied] = useState(false);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard non disponibile (contesto non sicuro, permesso negato):
      // nessun feedback di copia, ma il tap normale resta comunque utilizzabile.
    }
  }

  function startPress() {
    longPressedRef.current = false;
    clearTimer();
    timerRef.current = setTimeout(() => {
      longPressedRef.current = true;
      copyToClipboard();
    }, LONG_PRESS_MS);
  }

  function endPress() {
    clearTimer();
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Se il tap prolungato ha già scattato (copia), il click che segue il
    // pointerup non deve anche aprire tel:/mailto:.
    if (longPressedRef.current) {
      e.preventDefault();
      longPressedRef.current = false;
    }
  }

  return (
    <a
      className={`contact-pill${copied ? " contact-pill-copied" : ""}`}
      href={href}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerLeave={endPress}
      onPointerCancel={endPress}
      onContextMenu={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <span className="contact-pill-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact-pill-label">{copied ? copiedLabel : label}</span>
    </a>
  );
}
