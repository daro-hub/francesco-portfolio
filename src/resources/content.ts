import type { CVContent } from "@/types/content";

// TODO: this file still needs to be filled in with real data.
// Fields marked "TODO" have not been provided/confirmed yet.

export const content: CVContent = {
  personal: {
    fullName: "Francesco Da Rin Zanco",
    tagline: "Full-Stack Developer", // TODO: confirm final tagline
    contact: {
      email: "darinzancof@gmail.com",
      phone: "+39 351 851 1209",
      linkedin: "https://www.linkedin.com/in/francesco-da-rin-zanco-0b6071272",
      github: "https://github.com/daro-hub",
      location: "Belluno, Italy",
    },
    // photo: "/images/francesco.jpg", // TODO: add a photo under public/images
  },
  about: {
    intro:
      "I'm a full-stack developer at amuseapp, where I build and maintain the platforms behind museum ticketing and visitor experiences — and I'm completing a Master's in Computer Science (IoT, Big Data & ML) at the University of Udine to push further into the hardware side of what I already help ship.",
    whatIDo:
      "Day to day I work across the backoffice console, the visitor-facing webapp, our mobile app, and the Android kiosk software that runs our museum ticket totems — talking directly to payment terminals and hardware. I've also been taking on more ownership of the system's health: monitoring, automations, and keeping things stable in production.",
    lookingFor:
      "I'm looking for an Erasmus+ 2026-2027 internship, and I'm genuinely open — any hands-on computer science work interests me, as long as I get to build real things instead of just studying them.",
  },
  summary: "TODO: professional summary (3-5 lines) for the /cv page.",
  stats: [],
  skills: [
    { area: "Frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { area: "Mobile", skills: ["React Native", "Expo"] },
    { area: "Backend", skills: ["Xano", "Supabase", "PostgreSQL", "Stripe"] },
    { area: "Hardware & Native", skills: ["Kotlin", "Android", "Bluetooth LE (BLE)"] },
    {
      area: "AI/LLM",
      skills: ["Claude Code", "Anthropic SDK", "OpenAI API", "AWS Bedrock", "MCP"],
    },
  ],
  projects: [
    // TODO: 2-3 featured projects, e.g.:
    // {
    //   slug: "project-slug",
    //   title: "Project Name",
    //   description: "Short description of the project and your role.",
    //   link: "https://...",
    //   repoLink: "https://github.com/...",
    //   tags: ["React", "Node.js"],
    //   featured: true,
    //   order: 1,
    // },
  ],
  experience: [
    {
      company: "amuseapp",
      role: "Full-Stack Developer",
      location: "Remote",
      startDate: "2025-02",
      endDate: "present",
      highlights: [
        "Built and maintain the museum Console — the backoffice where curators manage audioguides, itineraries, multilingual content, and museum settings, including AI-assisted tools for translation and text generation.",
        "Contributed to the mobile app and led the redesign of the visitor-facing webapp.",
        "Integrated the Console with self-service museum kiosks (totems), covering both device-level flows and backend security.",
        "Connected the platform to external services — AWS (S3, Lambda), Stripe, ElevenLabs, and OpenAI — for on-demand audio generation, payments, and smart caching.",
      ],
    },
    {
      company: "NeoCode Studio",
      role: "Junior Web Developer (Internship)",
      location: "Remote",
      startDate: "2024-07",
      endDate: "2024-12",
      highlights: [
        "Built dynamic, database-connected websites with responsive interfaces and server-side functionality.",
        "Implemented interactive pages, CRUD operations, and integrations with external APIs.",
      ],
    },
    {
      company: "ecs project",
      role: "Electronics Assembly Operator",
      location: "Belluno, IT",
      startDate: "2023-06",
      endDate: "2023-09",
      highlights: [
        "Assembled electronic boards following technical diagrams and production specs.",
        "Performed quality control and component checks before and after assembly.",
        "Applied safety and precision practices to ensure device reliability.",
      ],
    },
  ],
  education: [
    {
      institution: "Università degli Studi di Udine",
      degree: "Master's Degree in Computer Science (IoT, Big Data & ML)",
      location: "Udine, IT",
      startDate: "2024-09",
      endDate: "present",
      details: ["Expected graduation: 2027"],
    },
    {
      institution: "ITI Girolamo Segato",
      degree: "High School Diploma in Computer Science",
      location: "Belluno, IT",
      startDate: "2019-09",
      endDate: "2024-07",
      details: [],
    },
  ],
  languages: [
    { language: "Italian", level: "Native" },
    { language: "English", level: "Limited working proficiency" },
    { language: "French", level: "Elementary proficiency" },
  ],
  volunteer: [
    {
      organization: "Parrocchia di Castion",
      role: "Youth Group & Summer Camp Leader",
      period: "Sep 2022 - Present",
      description:
        "Volunteer activity leader for parish youth groups and summer camps, working with children — it's taught me a lot about coordinating with other leaders and organizing events and programs.",
    },
  ],
};
