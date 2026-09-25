// Schema dei contenuti del CV/portfolio.
// I valori veri vengono compilati in src/resources/content.ts durante la fase di contenuto,
// non durante questo scaffolding.

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface PersonalInfo {
  fullName: string;
  tagline: string;
  contact: ContactInfo;
}

export interface SkillGroup {
  area: string; // es. "Frontend", "Mobile", "Backend", "AI/LLM"
  skills: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  link?: string;
  repoLink?: string;
  tags: string[];
  featured: boolean;
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
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  languages: LanguageEntry[];
  volunteer: VolunteerEntry[];
}
