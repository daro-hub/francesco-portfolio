// Genera il PDF del CV lato client con jsPDF, a partire dallo stesso
// `content.ts` usato per renderizzare /cv — un vero download (jsPDF
// costruisce il file e lo salva via Blob), non `window.print()`.
//
// Layout: una sola pagina A4, intestazione a tutta larghezza, poi due
// colonne: sidebar a sinistra (contatti, skill, studi, lingue, volontariato)
// e colonna principale a destra (summary, esperienza, progetti). Gli URL
// sono link cliccabili. Se i contenuti crescono oltre la pagina, la colonna
// che trabocca va a pagina 2 (vedi `Column.ensureSpace`).
"use client";

import { jsPDF } from "jspdf";
import { content } from "@/resources/content";
import { cvProjects, formatPeriod, shortRepoUrl } from "@/lib/cvFormat";

const PAGE_W = 210; // A4
const PAGE_H = 297;
const MARGIN = 13;
const SIDEBAR_W = 58;
const GUTTER = 8;
const MAIN_X = MARGIN + SIDEBAR_W + GUTTER;
const MAIN_W = PAGE_W - MARGIN - MAIN_X;
const TOP_BODY = 40; // inizio delle colonne, sotto l'intestazione

type RGB = readonly [number, number, number];
const INK: RGB = [16, 19, 28];
const BODY: RGB = [38, 42, 56];
const ACCENT: RGB = [47, 95, 224];
const MUTED: RGB = [96, 105, 132];
const RULE: RGB = [214, 220, 240];
const SIDEBAR_BG: RGB = [243, 245, 252];

export function generateCvPdf(): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  function paintSidebarBackground() {
    doc.setFillColor(...SIDEBAR_BG);
    doc.rect(0, TOP_BODY - 6, MARGIN + SIDEBAR_W + GUTTER / 2, PAGE_H - (TOP_BODY - 6), "F");
  }

  // Colonna con cursore proprio: scrive testo che va a capo nella larghezza
  // data e, se la pagina finisce, apre una pagina nuova ripartendo dall'alto.
  class Column {
    y = TOP_BODY;
    constructor(
      private x: number,
      private w: number,
      private sidebar: boolean,
    ) {}

    private ensureSpace(h: number) {
      if (this.y + h > PAGE_H - MARGIN) {
        doc.addPage();
        if (this.sidebar) paintSidebarBackground();
        this.y = MARGIN;
      }
    }

    heading(text: string) {
      this.ensureSpace(14);
      this.y += 2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...ACCENT);
      doc.text(text.toUpperCase(), this.x, this.y, { charSpace: 0.4 });
      this.y += 1.6;
      doc.setDrawColor(...(this.sidebar ? ([200, 208, 235] as const) : RULE));
      doc.setLineWidth(0.3);
      doc.line(this.x, this.y, this.x + this.w, this.y);
      this.y += 4.6;
    }

    title(text: string, right?: string) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...INK);
      // riserva lo spazio della data a destra, così il titolo non la copre
      let reserved = 0;
      if (right) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        reserved = doc.getTextWidth(right) + 3;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
      }
      const lines: string[] = doc.splitTextToSize(text, this.w - reserved);
      this.ensureSpace(4.4 * lines.length + 8);
      lines.forEach((line: string, i: number) => {
        doc.text(line, this.x, this.y);
        if (right && i === 0) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8.5);
          doc.setTextColor(...MUTED);
          doc.text(right, this.x + this.w, this.y, { align: "right" });
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(...INK);
        }
        this.y += 4.4;
      });
    }

    meta(text: string, link?: string, size = 8.5) {
      this.ensureSpace(5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(...MUTED);
      const lines: string[] = doc.splitTextToSize(text, this.w);
      for (const line of lines) {
        if (link) doc.textWithLink(line, this.x, this.y, { url: link });
        else doc.text(line, this.x, this.y);
        this.y += 3.9;
      }
    }

    paragraph(text: string, size = 9) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      doc.setTextColor(...BODY);
      const lines: string[] = doc.splitTextToSize(text, this.w);
      for (const line of lines) {
        this.ensureSpace(4.2);
        doc.text(line, this.x, this.y);
        this.y += 4.1;
      }
      this.y += 1.4;
    }

    bullets(items: string[]) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...BODY);
      for (const item of items) {
        const lines: string[] = doc.splitTextToSize(item, this.w - 4);
        lines.forEach((line: string, i: number) => {
          this.ensureSpace(4.2);
          if (i === 0) doc.text("•", this.x + 0.5, this.y);
          doc.text(line, this.x + 4, this.y);
          this.y += 4.1;
        });
        this.y += 0.4;
      }
      this.y += 1.2;
    }

    gap(h: number) {
      this.y += h;
    }
  }

  // --- Sfondo sidebar + intestazione a tutta larghezza ---
  paintSidebarBackground();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...INK);
  doc.text(content.personal.fullName, MARGIN, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(...ACCENT);
  doc.text(content.personal.tagline, MARGIN, 27.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Seeking an on-site Erasmus+ traineeship · 2026-2027", MARGIN, 33);

  // --- Sidebar ---
  const side = new Column(MARGIN, SIDEBAR_W, true);
  const c = content.personal.contact;
  const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

  side.heading("Contact");
  side.meta(c.location);
  side.meta(c.phone, `tel:${c.phone.replace(/\s+/g, "")}`);
  side.meta(c.email, `mailto:${c.email}`);
  side.meta(short(c.github), c.github);
  side.meta(short(c.linkedin), c.linkedin, 6.9);
  side.gap(1);

  side.heading("Technical Skills");
  content.skills.forEach((group) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...INK);
    side.title(group.area);
    side.paragraph(group.skills.join(", "), 8.5);
  });

  side.heading("Education");
  content.education.forEach((edu) => {
    side.title(edu.degree.replace(" in Computer Science", ""));
    side.meta(`${edu.institution}`);
    side.meta(formatPeriod(edu.startDate, edu.endDate));
    (edu.details ?? []).forEach((d) => side.meta(d));
    side.gap(1.6);
  });

  side.heading("Languages");
  content.languages.forEach((lang) => side.meta(`${lang.language} — ${lang.level}`));
  side.gap(1);

  if (content.volunteer.length > 0) {
    side.heading("Volunteering");
    content.volunteer.forEach((v) => {
      side.title(v.role);
      side.meta(`${v.organization} · ${v.period ?? ""}`);
    });
  }

  // --- Colonna principale ---
  const main = new Column(MAIN_X, MAIN_W, false);

  main.heading("Profile");
  main.paragraph(content.summary);

  main.heading("Experience");
  content.experience.forEach((exp) => {
    main.title(`${exp.role} · ${exp.company}`, formatPeriod(exp.startDate, exp.endDate));
    main.bullets(exp.highlights);
  });

  main.heading("Projects");
  cvProjects(content.projects).forEach((project) => {
    main.title(`${project.title}${project.status ? ` (${project.status})` : ""}`);
    const repo = shortRepoUrl(project);
    if (repo) main.meta(repo, project.repos[0].url);
    main.paragraph(project.cvSummary ?? "");
  });

  const fileSlug = content.personal.fullName.trim().replace(/\s+/g, "_");
  doc.save(`${fileSlug}_CV.pdf`);
}
