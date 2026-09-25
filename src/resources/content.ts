import type { CVContent } from "@/types/content";

// TODO: questo file va completato con i dati reali prima della fase di design.
// I campi marcati "TODO" non sono ancora stati forniti/confermati.

export const content: CVContent = {
  personal: {
    fullName: "Francesco Da Rin Zanco",
    tagline: "Full-Stack Developer", // TODO: confermare tagline definitiva (es. includere "Erasmus+ candidate"?)
    contact: {
      email: "TODO", // email pubblica da mostrare sul CV (potrebbe differire da quella dell'account)
      linkedin: "TODO",
      github: "TODO",
      location: "TODO", // città attuale
    },
  },
  summary: "TODO: professional summary (3-5 righe).",
  skills: [
    { area: "Frontend", skills: [] },
    { area: "Mobile", skills: [] },
    { area: "Backend", skills: [] },
    { area: "AI/LLM", skills: [] },
    // TODO: aggiungere/rinominare aree se necessario (es. DevOps, Data/ML, Cloud)
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
