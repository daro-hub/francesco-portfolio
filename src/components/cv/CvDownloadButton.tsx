"use client";

import { useState } from "react";
import { dictionary } from "@/i18n";
import { generateCvPdf } from "@/lib/generateCvPdf";

export function CvDownloadButton() {
  const [state, setState] = useState<"idle" | "generating" | "error">("idle");

  async function handleClick() {
    if (state === "generating") return; // evita doppio download su doppio click/tap
    setState("generating");
    try {
      generateCvPdf();
      setState("idle");
    } catch {
      // jsPDF non dovrebbe mai lanciare per questo contenuto, ma se succede
      // (es. browser molto vecchio) la stampa resta un fallback funzionante.
      setState("error");
      window.print();
    }
  }

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick} disabled={state === "generating"}>
      {state === "generating" ? dictionary.cv.downloading : dictionary.cv.download}
    </button>
  );
}
