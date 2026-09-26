"use client";

import { useEffect, useRef, useState } from "react";
import { dictionary, locales } from "@/i18n";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(enabled: boolean) {
    setOpen(false);
    if (!enabled) {
      setMessage(dictionary.language.unsupported);
      window.setTimeout(() => setMessage(null), 4000);
    }
  }

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dictionary.language.label}
        onClick={() => setOpen((o) => !o)}
      >
        EN <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul className="lang-dropdown" role="listbox">
          {locales.map((locale) => (
            <li key={locale.code}>
              <button
                type="button"
                role="option"
                aria-selected={locale.code === "en"}
                className={`lang-option${locale.enabled ? "" : " lang-option-disabled"}`}
                onClick={() => handleSelect(locale.enabled)}
              >
                {locale.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && (
        <div className="lang-toast" role="status">
          {message}
        </div>
      )}
    </div>
  );
}
