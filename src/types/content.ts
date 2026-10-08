import type { ProjectIconName } from "@/components/icons";

// Schema dei contenuti del CV/portfolio.
// I valori veri vengono compilati in src/resources/content.ts durante la fase di contenuto,
// non durante questo scaffolding.

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface PersonalInfo {
  fullName: string;
  tagline: string;
  contact: ContactInfo;
  photo?: string; // path in /public, es. "/images/francesco.jpg". Se assente, viene mostrato un avatar con le iniziali.
}

export interface AboutContent {
  intro: string; // chi sono
  whatIDo: string; // cosa faccio
  lookingFor: string; // cosa cerco (es. tirocinio Erasmus+)
}

export interface Stat {
  label: string;
  value: string;
}

export interface SkillGroup {
  area: string; // es. "Frontend", "Mobile", "Backend", "AI/LLM"
  skills: string[];
}

export interface AmuseAppProduct {
  name: string; // es. "Console", "Visitor webapp"
  tagline: string; // breve etichetta, es. "Backoffice", "Hardware"
  description: string;
  stack: string[];
}

export interface AmuseAppContent {
  intro: string;
  products: AmuseAppProduct[];
}

export interface ProjectRepo {
  label: string; // es. "Frontend", "Backend", "Repository" — alcuni progetti hanno più repo separati
  url: string;
}

export interface ProjectHighlightGroup {
  title: string; // es. "Integrations", "Automations"
  items: { name: string; description: string }[];
}

export interface Project {
  slug: string; // usato nell'URL della pagina di dettaglio: /projects/<slug>/
  title: string;
  icon?: { name: ProjectIconName; color: string }; // icona a sinistra del titolo, nella card e nella pagina
  description: string; // breve, per la card nella home
  concept?: string; // il "perché"/l'idea di partenza, se distinta dal "come funziona"
  longDescription: string; // dettagliata (come funziona), per la pagina del progetto
  role?: string; // il tuo contributo specifico, se il progetto non è solo tuo
  status?: string; // maturità dichiarata, es. "MVP" o "Prototype — never reached MVP": mostrata come badge su card e pagina
  compact?: boolean; // card più piccola (sotto la griglia), per i progetti secondari
  highlights?: ProjectHighlightGroup[]; // funzionalità raggruppate (integrazioni, automazioni, ...), nella pagina del progetto
  link?: string; // demo live, se esiste
  repos: ProjectRepo[];
  tags: string[];
  featured: boolean;
  spotlight?: boolean; // il progetto di punta: card a tutta larghezza in cima alla griglia, con badge
  order: number;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  startDate: string; // formato: "YYYY-MM"
  endDate: string | "present";
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  location?: string;
  startDate: string;
  endDate: string | "present";
  details?: string[];
}

export interface LanguageEntry {
  language: string;
  level: string; // es. "Madrelingua", "C1", "B2"
}

export interface VolunteerEntry {
  organization: string;
  role: string;
  period?: string;
  description?: string;
}

export interface CVContent {
  personal: PersonalInfo;
  about: AboutContent;
  amuseApp: AmuseAppContent;
  summary: string; // professional summary sintetico, usato nella pagina /cv
  stats: Stat[]; // numeri concreti (utenti, performance, repo gestiti, ...)
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  languages: LanguageEntry[];
  volunteer: VolunteerEntry[];
}
