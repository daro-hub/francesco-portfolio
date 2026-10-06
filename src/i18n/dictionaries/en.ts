export const en = {
  nav: {
    about: "About",
    amuseApp: "Amuse App",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
  },
  hero: {
    greeting: "Hello world!",
    ctaResume: "See CV",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    phone: "Phone",
    photoComingSoon: "Photo coming soon",
    scrollCue: "Scroll to explore",
    copied: "Copied!",
    holdToCopyHint: "Tap to open · hold to copy",
  },
  about: {
    title: "About",
    whoAmI: "Who I am",
    whatIDo: "What I do",
    lookingFor: "What I'm looking for",
    skillsTitle: "Technical Skills",
  },
  amuseApp: {
    title: "Amuse App",
    badge: "amuseapp · production",
  },
  projects: {
    title: "Projects",
    viewDetails: "View project",
    spotlight: "Flagship project",
    empty: "Featured projects coming soon.",
    backToProjects: "Back to projects",
    concept: "The idea",
    role: "My role",
    liveDemo: "Live demo",
    source: "Source",
    previewComingSoon: "Preview coming soon",
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
    downloading: "Preparing PDF…",
    back: "Close",
  },
  theme: {
    toggleToDark: "Switch to dark mode",
    toggleToLight: "Switch to light mode",
  },
} as const;

export type Dictionary = typeof en;
