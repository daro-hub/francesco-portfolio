# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primario: recruiter/aziende che valutano Francesco Da Rin Zanco per un
tirocinio Erasmus+ 2026-2027 in ambito full-stack / IoT / AI. Il sito deve
convincere in pochi minuti di lettura che il profilo è adatto a quel tipo di
ruolo.

## Product Purpose

Sito personale portfolio/CV one-page (più una pagina `/cv` stampabile in A4)
che presenta Francesco: chi è, cosa fa, percorso di studi/lavoro, progetti.
Successo = un recruiter capisce rapidamente il profilo e procede con la
candidatura/tirocinio.

## Positioning

Full-stack developer in produzione (amuseapp: console, webapp, app mobile, kiosk Android) con progetti AI
costruiti in autonomia; Second Brain è il progetto di punta. Cerca un tirocinio Erasmus+ 2026-2027. Inglese: buon livello (non certificato, niente livello CEFR nel CV).
Scolastica è dichiarato MVP e Orbis un prototipo mai arrivato a MVP: niente claim oltre lo stato reale.

## Operating Context

- Sito statico Next.js (App Router) + TypeScript, esportato staticamente e
  pubblicato su GitHub Pages via `.github/workflows/deploy.yml` ad ogni push
  su `main`.
- Struttura home one-page a blocchi: Hero, About, Projects, Experience,
  Education.
- Pagina `/cv` separata, formato A4 stampabile (bottone "Download PDF" =
  stampa del browser con CSS dedicato in `src/app/cv/cv.css`).
- `src/resources/content.ts` è l'unica fonte dei contenuti: modificarlo lì
  per aggiornare qualsiasi dato (contatti, skill, progetti, esperienze,
  education, lingue, volontariato).
- i18n predisposto (`src/i18n/`) ma solo l'inglese (`en`) è attivo; la
  tendina lingua in alto a destra mostra un messaggio per lingue non ancora
  supportate.
- Componenti layout esistenti: Header, ThemeToggle (dark/light), 
  LanguageSwitcher, SectionDots.

## Capabilities and Constraints

- Contenuti completi in `content.ts`; nessun campo `TODO` deve comparire sul sito. Non inventare numeri
  (utenti, performance): se non verificati, non vanno aggiunti.
- Deploy statico (`next build` → export in `out/`) su GitHub Pages: nessun backend, nessuna route API.

## Brand Commitments

Nessuno confermato. Nome: Francesco Da Rin Zanco. Tagline attuale
"Full-Stack Developer" è segnata come da confermare (non ancora vincolante).

## Evidence on Hand

- Esperienza: amuseapp (dal 2025-02), NeoCode Studio (2024-07/2024-12), ecs project (estate 2023).
- Laurea triennale in Informatica (IoT, Big Data & ML) a Udine, in corso; diploma ITI Girolamo Segato.
- Progetti: Second Brain, Longevity, Scolastica (MVP), Orbis (prototipo).

## Product Principles

- Chiarezza per recruiter in pochi secondi di scroll: il profilo (full-stack
  + IoT/Big Data/ML) deve emergere prima di ogni dettaglio.
- La UI deve restare credibile anche con contenuti parzialmente in
  placeholder: niente numeri o affermazioni inventate per "riempire".
- Contenuto e struttura restano quelli di `content.ts`/`types/content.ts`:
  il lavoro di design non introduce nuovi campi o narrazioni non richieste.
- Nessun vincolo visivo pregresso (palette/font/foto libere da scegliere).
