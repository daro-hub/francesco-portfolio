import type { CVContent } from "@/types/content";

// TODO: questo file va completato con i dati reali.
// I campi marcati "TODO" non sono ancora stati forniti/confermati.

export const content: CVContent = {
  personal: {
    fullName: "Francesco Da Rin Zanco",
    tagline: "Full-Stack Developer", // TODO: confermare tagline definitiva
    contact: {
      email: "TODO",
      linkedin: "TODO",
      github: "TODO",
      location: "TODO",
    },
    // photo: "/images/francesco.jpg", // TODO: aggiungere una foto in public/images
  },
  about: {
    intro: "TODO: chi sono (2-3 frasi).",
    whatIDo: "TODO: cosa faccio oggi (ruolo, stack, su cosa lavoro).",
    lookingFor:
      "TODO: cosa cerco — es. tirocinio Erasmus+ 2026-2027 in ambito full-stack / IoT / AI.",
  },
  summary: "TODO: professional summary (3-5 righe) per la pagina /cv.",
  stats: [
    { label: "TODO — es. Active users", value: "TODO" },
    { label: "TODO — es. Performance improvement", value: "TODO" },
    { label: "TODO — es. Repositories managed", value: "TODO" },
  ],
  skills: [
    { area: "Frontend", skills: [] },
    { area: "Mobile", skills: [] },
    { area: "Backend", skills: [] },
    { area: "AI/LLM", skills: [] },
    // TODO: aggiungere/rinominare aree se necessario (es. DevOps, Data/ML, Cloud)
  ],
  projects: [
    // TODO: 2-3 progetti in evidenza, es:
    // {
    //   slug: "project-slug",
    //   title: "Project Name",
    //   description: "Breve descrizione del progetto e del tuo ruolo.",
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
      role: "TODO",
      location: "TODO",
      startDate: "TODO",
      endDate: "present",
      highlights: [],
    },
    {
      company: "NeoCode Studio",
      role: "TODO",
      location: "TODO",
      startDate: "TODO",
      endDate: "TODO",
      highlights: [],
    },
  ],
  education: [
    {
      institution: "Università degli Studi di Udine",
      degree:
        "Laurea Magistrale in Scienze e Tecnologie Informatiche (IoT, Big Data & ML)",
      location: "Udine, IT",
      startDate: "TODO",
      endDate: "present",
      details: [],
    },
    {
      institution: "ITI Girolamo Segato",
      degree: "TODO (titolo di diploma)",
      location: "TODO",
      startDate: "TODO",
      endDate: "TODO",
      details: [],
    },
  ],
  languages: [
    { language: "Italiano", level: "Madrelingua" },
    // TODO: altre lingue (es. Inglese) con livello
  ],
  volunteer: [
    // TODO: eventuali esperienze di volontariato
  ],
};
