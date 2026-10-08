import type { CVContent } from "@/types/content";

export const content: CVContent = {
  personal: {
    fullName: "Francesco Da Rin Zanco",
    tagline: "Full-Stack Developer",
    contact: {
      email: "darinzancof@gmail.com",
      phone: "+39 351 851 1209",
      linkedin: "https://www.linkedin.com/in/francesco-da-rin-zanco-0b6071272",
      github: "https://github.com/daro-hub",
      location: "Belluno, Italy",
    },
    photo: "/images/francesco.jpg",
  },
  about: {
    intro:
      "I'm a full-stack developer at amuseapp, where I build and maintain the platforms behind museum ticketing and visitor experiences — and I'm completing a Bachelor's in Computer Science (IoT, Big Data & ML) at the University of Udine to push further into the hardware side of what I already help ship.",
    whatIDo:
      "Day to day I work across the backoffice console, the visitor-facing webapp, our mobile app, and the Android kiosk software that runs our museum ticket totems — talking directly to payment terminals and hardware. I've also been taking on more ownership of the system's health: monitoring, automations, and keeping things stable in production.",
    lookingFor:
      "I'm looking for an Erasmus+ 2026-2027 internship, and I'm genuinely open — any hands-on computer science work interests me, as long as I get to build real things instead of just studying them.",
  },
  amuseApp: {
    intro:
      "Full-stack developer at amuseapp since 2025 — I build and maintain the systems behind museum ticketing and visitor experiences, end to end: console, visitor webapp, mobile app, and the kiosk hardware that talks to payment terminals.",
    products: [
      {
        name: "Console",
        tagline: "Backoffice",
        description:
          "Where curators manage audioguides, itineraries, and multilingual content — including AI-assisted tools for translation and text generation that I built.",
        stack: ["Next.js", "Xano"],
      },
      {
        name: "Visitor webapp",
        tagline: "Visitor-facing",
        description: "Led the redesign of the booking and itinerary experience visitors use on-site.",
        stack: ["Next.js"],
      },
      {
        name: "Mobile app",
        tagline: "iOS & Android",
        description: "Contributed features to the visitor companion app.",
        stack: ["React Native", "Expo"],
      },
      {
        name: "Totem kiosk",
        tagline: "Hardware",
        description:
          "Integrated the Console with self-service museum kiosks — device-level flows and backend security, talking directly to payment terminals.",
        stack: ["Kotlin", "Android"],
      },
    ],
  },
  summary:
    "Full-stack developer at amuseapp, building the platforms behind museum ticketing and visitor experiences: backoffice console, visitor webapp, mobile app and the Android kiosk software that talks to payment hardware. Outside work I build AI projects solo, end to end, such as Second Brain, a personal assistant I use daily that answers from my notes and live data and runs a coding agent with human approval. Bachelor's student in Computer Science (IoT, Big Data & ML) at the University of Udine, looking for an Erasmus+ 2026-2027 internship.",
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
      slug: "second-brain",
      title: "Second Brain — Aira, a Personal AI Assistant",
      icon: { name: "brain", color: "#ff6fae" },
      description:
        "A personal AI assistant I talk to in plain language, by text or voice, on Telegram or the web. It answers from my own notes and from live data across calendar, email, code, issues, Slack, fitness and health, and it runs parts of my day on its own: morning and evening digests, reminders, check-ins, and an agent that investigates and fixes code, with my approval before anything is pushed.",
      concept:
        "Everything I need to know about my own life and work is scattered across a dozen apps: calendar, email, GitHub, Linear, Slack, Strava, Apple Health, a password manager, my university notes. Second Brain is one assistant, Aira, that sits on top of all of them. I just ask, the way I would ask a human assistant, with no commands to remember. Every source is queried live instead of being copied into a database, so the answers are never stale.",
      longDescription:
        "Every message, typed or spoken, goes through a single shared pipeline. A few exact shortcuts handle the unambiguous cases in plain code with no model call. Everything else goes to an intent classifier that routes it to the right source: a RAG knowledge base on Supabase pgvector (with full-text search) for notes and university material, structured workout logs with automatic personal-record detection, or live API calls to Google Calendar, Gmail, GitHub, Linear, Slack, Strava and Apple Health. Voice messages are transcribed, answered, and replied to with synthesized speech, and photos are described by a vision model so a meal, a receipt or a gym machine can enter the same pipeline as text.\n\nThe same pipeline powers several front ends: a Telegram bot running as a Vercel webhook (so it works without my computer switched on), a full-screen web interface with a hands-free voice mode over the OpenAI Realtime API that shows in real time which data sources each answer came from, installable web push notifications, and an MCP server that exposes every capability to Claude Code and Cursor. A password-protected Next.js dashboard brings the data together: a daily timeline that overlays heart rate, steps, meals, lessons and workouts, a study planner, a training view, and a view that correlates different sources and refuses to show a correlation until enough data exists to back it.\n\nIt is also proactive. Scheduled jobs send a web-researched morning news digest and an evening briefing with tomorrow's agenda and workout, a daily \"knowledge pill\" with a monthly review, a mood diary check-in with one-tap buttons, and reminders. At midnight it summarises my day from the commits and calendar calls and logs my work hours, which I confirm with a one-word reply.\n\nThe latest layer is an agent. From Telegram I can hand a job to a worker running on my own machines: in read-only mode it investigates an issue or a codebase and reports back, and in write mode it works on an isolated git worktree, runs the typecheck and tests, and commits locally. It has no shell, it cannot touch lockfiles, CI or secrets, and nothing is pushed until I tap Approve in Telegram. The push itself is then done by deterministic code, not by the model.\n\nRouting quality is treated as something to test, not guess. A Vitest suite covers the core logic, and an eval set of real phrases that the bot once misrouted is replayed against the live model whenever the router changes.",
      role: "Designed and built solo, end to end: the routing pipeline, every integration, the voice loop, the scheduled automations, the MCP server, the dashboard, the agent worker and the test and eval tooling. It's the tool I use most every day.",
      highlights: [
        {
          title: "Live integrations",
          items: [
            { name: "Google Calendar", description: "Reads my agenda and can create and edit events from a sentence." },
            { name: "Gmail", description: "Read-only search across my email, queried live." },
            { name: "GitHub & Linear", description: "Repository info and issue status on demand, like \"how is the audio issue going?\"." },
            { name: "Slack", description: "Read-only access. Message text is treated as data, never as instructions." },
            { name: "Strava & Apple Health", description: "Activities, steps, heart rate and other health metrics, correlated with the rest of my day." },
            { name: "Bitwarden", description: "Passwords fetched through the local CLI. They never pass through the language model and are never read aloud." },
          ],
        },
        {
          title: "Ways to talk to it",
          items: [
            { name: "Telegram", description: "Text, voice notes and photos. No commands needed for normal use." },
            { name: "Web voice mode", description: "Hands-free voice-to-voice over WebRTC and the Realtime API, with sub-second replies, and I can interrupt it by speaking." },
            { name: "MCP server", description: "Every capability exposed as a tool to Claude Code and Cursor." },
            { name: "Push notifications", description: "Installable web push for reminders and digests." },
          ],
        },
        {
          title: "Automations",
          items: [
            { name: "Morning news", description: "A daily digest researched on the web, with the day's AI breakthrough." },
            { name: "Evening briefing", description: "Tomorrow's agenda, the workout to do and open reminders, in one message." },
            { name: "Reminders", description: "Scheduled in the database, checked every five minutes. Each job is booked once per day, so it never fires twice." },
            { name: "Knowledge pills & mood diary", description: "A daily pill with a monthly review, and a nightly mood check-in answered with one tap." },
            { name: "Work log", description: "At midnight it reads the day's commits and calendar calls, drafts the entry and asks for the hours. Replying \"2,5h\" completes it. It also tracks what is still to be invoiced." },
            { name: "Study", description: "Lecture slides and handwritten notes uploaded as PDFs are converted by Claude into clean Markdown with LaTeX formulas, plus an exam planner." },
          ],
        },
        {
          title: "Coding agent",
          items: [
            { name: "Read-only jobs", description: "\"Look at this issue and tell me what you would do\" runs a Claude Agent SDK session on my repositories." },
            { name: "Write jobs with approval", description: "Works in an isolated git worktree, runs typecheck and tests, commits locally. No push, install or free shell commands." },
            { name: "Human in the loop", description: "Anything with external effects waits for an Approve tap on Telegram, then deterministic code performs it." },
            { name: "Multi-machine", description: "Several workers can be online. Jobs are claimed atomically, with a preferred machine and a fallback." },
          ],
        },
        {
          title: "Reliability & safety",
          items: [
            { name: "Asks instead of guessing", description: "Low-confidence requests get a clarifying question, and anything it has no data for is reported as unsupported rather than forced into the closest category." },
            { name: "Remembers the thread", description: "Keeps the active topic for 20 minutes so short follow-ups like \"and yesterday?\" work." },
            { name: "No duplicate memories", description: "Near-identical notes are skipped, and similar ones are offered as a replacement with confirm buttons." },
            { name: "Tested routing", description: "A Vitest suite across dozens of modules and a replayable eval set of real misrouted phrases." },
            { name: "Locked down", description: "The dashboard and the voice and chat APIs sit behind a password and fail closed in production if it is missing." },
          ],
        },
      ],
      cvSummary:
        "Personal AI assistant on Telegram and web (text and voice). Routes each request to a RAG knowledge base or to live APIs (Calendar, Gmail, GitHub, Linear, Slack, Strava, Apple Health), runs scheduled automations, and drives a Claude Agent SDK coding agent that needs my approval before any push. Next.js, TypeScript, Supabase pgvector, OpenAI, MCP.",
      repos: [{ label: "Repository", url: "https://github.com/daro-hub/second-brain" }],
      tags: ["Next.js", "TypeScript", "Supabase pgvector", "OpenAI", "Claude Agent SDK", "RAG", "MCP", "Telegram bot", "Voice"],
      featured: true,
      spotlight: true,
      order: 0,
    },
    {
      slug: "longevity",
      title: "Longevity — AI Nutrition Assistant",
      icon: { name: "apple", color: "#4ade80" },
      description:
        "AI nutrition assistant that answers only from scientific sources, via retrieval-augmented generation.",
      concept:
        "The idea started from a simple observation: everything a nutritionist knows, they learned from documents — scientific papers, guidelines, studies. That's exactly the kind of knowledge a RAG (retrieval-augmented generation) system can consult and answer from, grounded in real sources instead of guessing.",
      longDescription:
        "Nutrition documents are uploaded to the backend, vectorized, and indexed in Pinecone; when a question comes in, the system retrieves the most relevant passages and asks GPT-4 to answer using only that context. The chat also runs a short intake — age, weight, height, activity level, goals — and uses that profile to personalize the guidance it gives. The one part of an in-person visit that can't be replicated is the physical exam; letting users optionally upload a file with fuller biometric data for an even more accurate result is the next planned refinement.\n\nThe FastAPI backend and the Next.js chat frontend are deployed separately on Render and Vercel.",
      role: "Designed and built the full stack solo: the retrieval pipeline, the grounding prompt strategy, and the chat frontend.",
      link: "https://longevity-alpha.vercel.app",
      cvSummary:
        "RAG nutrition assistant that answers only from indexed scientific documents and personalises its guidance from a short intake. FastAPI backend, Next.js chat frontend, Pinecone, GPT-4.",
      repos: [
        { label: "Frontend", url: "https://github.com/daro-hub/longevity" },
        { label: "Backend", url: "https://github.com/daro-hub/longevity-backend" },
      ],
      tags: ["Next.js", "FastAPI", "Pinecone", "GPT-4", "RAG"],
      featured: true,
      order: 1,
    },
    {
      slug: "scolastica",
      title: "Scolastica — AI Educational Content Generator",
      icon: { name: "slides", color: "#ff8a4c" },
      status: "MVP",
      description:
        "Turns source PDFs into template-matching PowerPoint decks, quizzes, subtitles, and interactive maps — a manual, hours-long process cut down to about 30 minutes.",
      concept:
        "Turning a source PDF into a polished, template-matching PowerPoint deck used to be entirely manual: reading every page and rebuilding slides by hand could take most of a working day. Scolastica turns that into an automated pipeline that still keeps a human in control of the final choice for every section.",
      longDescription:
        "An operator uploads a source PDF plus a PowerPoint master template. Claude proposes several layout variants per section, but nothing ships on trust: every plan is validated against the master's real placeholders — an invalid layout, a placeholder that doesn't exist, or an empty text fill triggers one automatic repair round-trip back to Claude instead of a silent fallback — and every text fill is scored against the source PDF for how much it actually overlaps with it, flagging anything that looks invented instead of shipping it quietly. The operator picks the best variant per section plus an image, and python-pptx assembles a final deck that matches the template exactly. What used to take most of a working day by hand comes down to about 30 minutes end to end. Scolastica is currently at MVP level.\n\nThe whole generation runs as a background job with an explicit, persisted state machine (queued → planning → grounding → rendering → building → completed), so a server restart mid-job doesn't silently lose it — a real problem the first request/response version had. The same pipeline extends to other content built from the same source material: auto-generated subtitles for audio/video, quizzes, and interactive maps.",
      role: "Built entirely solo — design, backend, frontend, and the whole content-generation pipeline.",
      cvSummary:
        "MVP that turns source PDFs into template-matching PowerPoint decks with Claude. Every plan is validated against the template and text not grounded in the source is flagged; cuts about a day of manual work to roughly 30 minutes. FastAPI, Next.js, SQLite.",
      repos: [{ label: "Repository", url: "https://github.com/daro-hub/Scolastica" }],
      tags: ["Next.js", "FastAPI", "Claude", "SQLite"],
      featured: true,
      order: 3,
    },
    {
      slug: "orbis",
      title: "Orbis — Algorithmic Trading Experiment",
      icon: { name: "candles", color: "#f5b73b" },
      status: "Prototype — never reached MVP",
      compact: true,
      description:
        "An early experiment in backtesting trading strategies on Bitcoin, NASDAQ 100 and Gold. It was never taken to an MVP.",
      concept:
        "The idea behind Orbis is a self-correcting strategy loop: a trading idea almost never works on the first try, so it has to be backtested to find where it fails, corrected, and tested again. The long-term goal was to automate that loop with AI agents that write a strategy, backtest it, read the results and revise it.",
      longDescription:
        "Orbis never got past the prototype stage and I don't present it as a finished product. What exists is a FastAPI backend that connects to Binance and Capital.com and runs an event-driven backtesting engine, plus a Next.js frontend with live candlestick charts for Bitcoin, NASDAQ 100 and Gold. The backtester is tested against the mistakes that make backtests lie: no look-ahead (a signal only fills at the next bar's open, never the current bar's own close), and the Sharpe ratio annualized for the data's real bar spacing instead of a hardcoded trading-day count.\n\nThe two included strategies (SMA crossover, RSI) are written and tuned by hand, and strategies plug in through a small registry so that an agent could one day register a new one without touching the rest of the system. That agent loop was never built. What I took from the project is the backtesting discipline, not a trading product.",
      role: "Built solo as an experiment: the backtesting engine, the broker integrations and the dashboard.",
      repos: [{ label: "Repository", url: "https://github.com/daro-hub/Orbis" }],
      tags: ["Next.js", "FastAPI", "Backtesting"],
      featured: false,
      order: 4,
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
      degree: "Bachelor's Degree in Computer Science (IoT, Big Data & ML)",
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
    { language: "English", level: "B2 – Upper intermediate" },
    { language: "French", level: "Elementary" },
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
