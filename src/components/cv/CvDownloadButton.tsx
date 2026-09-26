"use client";

import { dictionary } from "@/i18n";

export function CvDownloadButton() {
  return (
    <button type="button" className="btn btn-primary" onClick={() => window.print()}>
      {dictionary.cv.download}
    </button>
  );
}
