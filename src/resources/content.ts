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
  summary:
    "Full-stack developer building the platforms behind museum ticketing and visitor experiences at amuseapp — backoffice console, visitor webapp, mobile app, and the Android kiosk software that talks to payment hardware. Outside of work I design and ship AI-driven side projects solo, end to end: a RAG-based nutrition assistant, an algorithmic trading platform with a rigorously-tested backtesting engine, and an AI pipeline that turns source PDFs into finished PowerPoint decks. Currently completing a Master's in Computer Science (IoT, Big Data & ML) at the University of Udine, and looking for an Erasmus+ 2026-2027 internship to keep building real things.",
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
    {
      slug: "longevity",
      title: "Longevity — AI Nutrition Assistant",
      description:
        "AI nutrition assistant that answers only from scientific sources, via retrieval-augmented generation.",
      concept:
        "The idea started from a simple observation: everything a nutritionist knows, they learned from documents — scientific papers, guidelines, studies. That's exactly the kind of knowledge a RAG (retrieval-augmented generation) system can consult and answer from, grounded in real sources instead of guessing.",
      longDescription:
        "Nutrition documents are uploaded to the backend, vectorized, and indexed in Pinecone; when a question comes in, the system retrieves the most relevant passages and asks GPT-4 to answer using only that context. The chat also runs a short intake — age, weight, height, activity level, goals — and uses that profile to personalize the guidance it gives. The one part of an in-person visit that can't be replicated is the physical exam; letting users optionally upload a file with fuller biometric data for an even more accurate result is the next planned refinement.\n\nThe FastAPI backend and the Next.js chat frontend are deployed separately on Render and Vercel.",
      role: "Designed and built the full stack solo: the retrieval pipeline, the grounding prompt strategy, and the chat frontend.",
      link: "https://longevity-alpha.vercel.app",
      repos: [
        { label: "Frontend", url: "https://github.com/daro-hub/longevity" },
        { label: "Backend", url: "https://github.com/daro-hub/longevity-backend" },
      ],
      tags: ["Next.js", "FastAPI", "Pinecone", "GPT-4", "RAG"],
      featured: true,
      order: 1,
    },
    {
      slug: "orbis",
      title: "Orbis — Algorithmic Trading Platform",
      description:
        "Automated trading and backtesting platform for Bitcoin, NASDAQ 100, and Gold, with live strategy execution.",
      concept:
        "The idea behind Orbis is a self-correcting strategy loop: a trading idea almost never works on the first try, so it has to be backtested to find where it fails, corrected, and tested again — repeatedly, until it becomes consistently profitable. Orbis is built toward eventually automating that whole loop with AI agents that write a strategy, backtest it, read the results, and revise it on their own, then keep monitoring and adjusting it over time as conditions change. The codebase is already shaped for that future: strategies plug into the backtester and the live bot through a small registry instead of being hardcoded, so an agent that writes a new strategy just has to register it — nothing else in the system needs to change.",
      longDescription:
        "Orbis is a full-stack trading platform: a FastAPI backend connects to Binance and Capital.com, runs an event-driven backtesting engine against historical data, and can execute strategies manually or through running bots in real time. The backtester is tested against the mistakes that make backtests lie: no look-ahead (a signal only fills at the next bar's open, never the current bar's own close), and the Sharpe ratio annualized for the data's real bar spacing instead of a hardcoded trading-day count. The Next.js frontend shows live candlestick charts for Bitcoin, NASDAQ 100, and Gold, lets you backtest a strategy before risking anything, place manual trades, and monitor open positions and account balance.\n\nToday the two included strategies (SMA crossover, RSI) are still written and tuned by hand — the self-correcting agent loop described above is the direction the project is being built toward.\n\nA further idea for later: AI models answer based on probability learned from past examples, and the same structure could apply to price data — training a model on an asset's historical movements to estimate the probability that a pattern repeats, and trading on that probabilistic prediction.",
      role: "Built solo: the backend trading engine, broker integrations, and the dashboard/backtesting frontend.",
      repos: [{ label: "Repository", url: "https://github.com/daro-hub/Orbis" }],
      tags: ["Next.js", "FastAPI", "Trading strategies", "Backtesting"],
      featured: true,
      order: 2,
    },
    {
      slug: "scolastica",
      title: "Scolastica — AI Educational Content Generator",
      description:
        "Turns source PDFs into template-matching PowerPoint decks, quizzes, subtitles, and interactive maps — a manual, hours-long process cut down to about 30 minutes.",
      concept:
        "Turning a source PDF into a polished, template-matching PowerPoint deck used to be entirely manual: reading every page and rebuilding slides by hand could take most of a working day. Scolastica turns that into an automated pipeline that still keeps a human in control of the final choice for every section.",
      longDescription:
        "An operator uploads a source PDF plus a PowerPoint master template. Claude proposes several layout variants per section, but nothing ships on trust: every plan is validated against the master's real placeholders — an invalid layout, a placeholder that doesn't exist, or an empty text fill triggers one automatic repair round-trip back to Claude instead of a silent fallback — and every text fill is scored against the source PDF for how much it actually overlaps with it, flagging anything that looks invented instead of shipping it quietly. The operator picks the best variant per section plus an image, and python-pptx assembles a final deck that matches the template exactly. What used to take most of a working day by hand comes down to about 30 minutes end to end.\n\nThe whole generation runs as a background job with an explicit, persisted state machine (queued → planning → grounding → rendering → building → completed), so a server restart mid-job doesn't silently lose it — a real problem the first request/response version had. The same pipeline extends to other content built from the same source material: auto-generated subtitles for audio/video, quizzes, and interactive maps.",
      role: "Built entirely solo — design, backend, frontend, and the whole content-generation pipeline.",
      repos: [{ label: "Repository", url: "https://github.com/daro-hub/Scolastica" }],
      tags: ["Next.js", "FastAPI", "Claude", "SQLite"],
      featured: true,
      order: 3,
    },
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
