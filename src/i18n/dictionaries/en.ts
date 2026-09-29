export const en = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
  },
  hero: {
    greeting: "Ready to dive in",
    ctaResume: "Download CV (PDF)",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    phone: "Phone",
    photoComingSoon: "Photo coming soon",
    scrollCue: "Scroll to explore",
    copied: "Copied!",
    holdToCopyHint: "Tap to open · hold to copy",
    githubStatsTitle: "On GitHub",
    githubPublicRepos: "Public repos",
    githubStars: "Stars",
    githubFollowers: "Followers",
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
    viewDetails: "View project",
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
    back: "Back to site",
  },
  theme: {
    toggleToDark: "Switch to dark mode",
    toggleToLight: "Switch to light mode",
  },
} as const;

export type Dictionary = typeof en;
