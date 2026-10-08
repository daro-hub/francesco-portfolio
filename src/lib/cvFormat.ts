import type { Project } from "@/types/content";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-02" → "Feb 2025"; "present" → "Present". */
export function formatMonth(value: string): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : value;
}

export function formatPeriod(start: string, end: string): string {
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

/** Progetti da mostrare nel CV: quelli con un riassunto da CV e non marcati come secondari. */
export function cvProjects(projects: Project[]): Project[] {
  return [...projects].filter((p) => p.cvSummary && !p.compact).sort((a, b) => a.order - b.order);
}

/** URL del repository senza schema, per il CV ("github.com/daro-hub/second-brain"). */
export function shortRepoUrl(project: Project): string | undefined {
  return project.repos[0]?.url.replace(/^https?:\/\//, "");
}
