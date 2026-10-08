// Genera il PDF del CV lato client con jsPDF, a partire dallo stesso
// `content.ts` usato per renderizzare /cv — un vero download (jsPDF
// costruisce il file e lo salva via Blob), non `window.print()`: il
// pulsante "Download PDF" apriva la finestra di stampa del browser
// invece di scaricare un file, e si bloccava al primo click.
"use client";

import { jsPDF } from "jspdf";
import { content } from "@/resources/content";
import { cvProjects, formatPeriod, shortRepoUrl } from "@/lib/cvFormat";

const MARGIN_MM = 18;
const PAGE_WIDTH_MM = 210; // A4
const PAGE_HEIGHT_MM = 297;
const CONTENT_WIDTH_MM = PAGE_WIDTH_MM - MARGIN_MM * 2;

const INK = [16, 19, 28] as const;
const ACCENT = [47, 95, 224] as const;
const MUTED = [86, 95, 128] as const;

export function generateCvPdf(): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_MM;

  function ensureSpace(lineHeightMm: number) {
    if (y + lineHeightMm > PAGE_HEIGHT_MM - MARGIN_MM) {
      doc.addPage();
      y = MARGIN_MM;
    }
  }

  function addHeading(text: string) {
    ensureSpace(24);
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(text, MARGIN_MM, y);
    y += 2;
    doc.setDrawColor(228, 231, 244);
    doc.line(MARGIN_MM, y, PAGE_WIDTH_MM - MARGIN_MM, y);
    y += 6;
  }

  // `needed`: spazio minimo da riservare, così titolo e testo che lo segue non
  // finiscono su pagine diverse (titolo orfano a fondo pagina).
  function addSubheading(text: string, needed = 6) {
    ensureSpace(needed);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(text, MARGIN_MM, y);
    y += 5;
  }

  function addMeta(text: string) {
    ensureSpace(5.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(text, MARGIN_MM, y);
    y += 5.5;
  }

  function addParagraph(text: string) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 33, 44);
    const lines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH_MM);
    for (const line of lines) {
      ensureSpace(5);
      doc.text(line, MARGIN_MM, y);
      y += 5;
    }
    y += 2;
  }

  function addSkillLine(text: string) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 33, 44);
    const lines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH_MM);
    for (const line of lines) {
      ensureSpace(5);
      doc.text(line, MARGIN_MM, y);
      y += 5;
    }
    y += 0.5;
  }

  function addBullets(items: string[]) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 33, 44);
    for (const item of items) {
      const lines: string[] = doc.splitTextToSize(item, CONTENT_WIDTH_MM - 5);
      lines.forEach((line: string, i: number) => {
        ensureSpace(4.6);
        doc.text(i === 0 ? `•  ${line}` : `   ${line}`, MARGIN_MM, y);
        y += 4.6;
      });
    }
    y += 2;
  }

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(content.personal.fullName, MARGIN_MM, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  doc.text(content.personal.tagline, MARGIN_MM, y);
  y += 6;

  const contactLine = [
    content.personal.contact.location,
    content.personal.contact.phone,
    content.personal.contact.email,
    content.personal.contact.linkedin,
    content.personal.contact.github,
  ]
    .filter(Boolean)
    .join("   ·   ");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  // splitTextToSize, not a single doc.text(): the LinkedIn/GitHub URLs
  // make this line long enough to run past the page's right margin and
  // get silently cut off (e.g. "github.com/daro-hub" clipped to
  // "github.com/daro-") if printed as one unwrapped line.
  const contactLines: string[] = doc.splitTextToSize(contactLine, CONTENT_WIDTH_MM);
  contactLines.forEach((line: string) => {
    doc.text(line, MARGIN_MM, y);
    y += 4.5;
  });
  y += 4.5;

  // --- Sections (same structure/order as src/app/cv/page.tsx) ---
  addHeading("Professional Summary");
  addParagraph(content.summary);

  addHeading("Technical Skills");
  content.skills.forEach((group) => {
    addSkillLine(`${group.area}: ${group.skills.join(", ")}`);
  });

  addHeading("Professional Experience");
  content.experience.forEach((exp) => {
    addSubheading(`${exp.role} — ${exp.company}`);
    addMeta(
      formatPeriod(exp.startDate, exp.endDate) +
        (exp.location ? ` · ${exp.location}` : ""),
    );
    if (exp.highlights.length > 0) addBullets(exp.highlights);
  });

  addHeading("Projects");
  cvProjects(content.projects).forEach((project) => {
    addSubheading(`${project.title}${project.status ? ` (${project.status})` : ""}`, 26);
    const repo = shortRepoUrl(project);
    if (repo) addMeta(repo);
    addParagraph(project.cvSummary ?? "");
  });

  addHeading("Education");
  content.education.forEach((edu) => {
    addSubheading(edu.degree);
    addMeta(
      `${edu.institution}${edu.location ? ` · ${edu.location}` : ""} · ${formatPeriod(
        edu.startDate,
        edu.endDate,
      )}`,
    );
    (edu.details ?? []).forEach((detail) => addMeta(detail));
  });

  addHeading("Languages");
  addParagraph(content.languages.map((lang) => `${lang.language} (${lang.level})`).join("   ·   "));

  if (content.volunteer.length > 0) {
    addHeading("Volunteer Experience");
    content.volunteer.forEach((entry) => {
      addParagraph(`${entry.role} — ${entry.organization}${entry.period ? ` (${entry.period})` : ""}`);
    });
  }

  const fileSlug = content.personal.fullName.trim().replace(/\s+/g, "_");
  doc.save(`${fileSlug}_CV.pdf`);
}
