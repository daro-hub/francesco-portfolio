export const en = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
  },
  hero: {
    greeting: "Hi, I'm",
    ctaResume: "Download CV (PDF)",
    ctaContact: "Get in touch",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  about: {
    title: "About",
    whoAmI: "Who I am",
    whatIDo: "What I do",
    lookingFor: "What I'm looking for",
    skillsTitle: "Technical Skills",
  },
  projects: {
    title: "Projects",
    viewProject: "View project",
    viewCode: "View code",
    empty: "Featured projects coming soon.",
  },
  experience: {
    title: "Experience",
    present: "Present",
  },
  education: {
    title: "Education",
    volunteerTitle: "Volunteer Experience",
  },
  cv: {
    download: "Download PDF",
    back: "Back to site",
  },
  language: {
    label: "Language",
    unsupported:
      "Only English is currently supported — more languages coming soon.",
  },
  theme: {
    toggleToDark: "Switch to dark mode",
    toggleToLight: "Switch to light mode",
  },
} as const;

export type Dictionary = typeof en;
