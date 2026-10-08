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

Non ancora deciso dall'utente: i contenuti che dimostrerebbero la
differenziazione (skill per area, progetti in evidenza, numeri concreti,
dettagli su esperienza in azienda vs percorso IoT/Big Data/ML) sono ancora
`TODO` in `src/resources/content.ts` e verranno compilati in seguito. Il
lavoro di design attuale procede su placeholder/contenuti reali parziali già
presenti (nome, ruolo attuale in "amuseapp", percorso a "NeoCode Studio",
laurea triennale a Udine in IoT/Big Data/ML, diploma ITI Girolamo Segato).

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

- Molti campi contenuto sono ancora `TODO` (contatti, tagline definitiva,
  intro/about, summary CV, stats, skill per area, progetti in evidenza,
  dettagli ruoli/date esperienza ed education, lingue oltre l'italiano,
  eventuale foto, volontariato). Non vanno inventati: il lavoro di design
  procede sulla struttura e sui placeholder esistenti, i contenuti reali
  verranno compilati dall'utente in un secondo momento.
- Nessuna foto personale ancora disponibile/caricata.
- Deploy è statico (`next build` → export in `out/`) su GitHub Pages: nessun
  backend, nessuna route API.

## Brand Commitments

Nessuno confermato. Nome: Francesco Da Rin Zanco. Tagline attuale
"Full-Stack Developer" è segnata come da confermare (non ancora vincolante).

## Evidence on Hand

- Esperienza lavorativa in corso presso "amuseapp" (ruolo/date TODO) e
  precedente presso "NeoCode Studio" (ruolo/date TODO).
- Percorso accademico: Laurea Triennale in Informatica
  (IoT, Big Data & ML) — Università degli Studi di Udine
  (in corso); diploma precedente presso ITI Girolamo Segato.
- Nessun progetto, numero (utenti/performance/repo), testimonianza o
  case study concreti ancora presenti: da non fabbricare, verranno aggiunti
  dall'utente in `content.ts`.

## Product Principles

- Chiarezza per recruiter in pochi secondi di scroll: il profilo (full-stack
  + IoT/Big Data/ML) deve emergere prima di ogni dettaglio.
- La UI deve restare credibile anche con contenuti parzialmente in
  placeholder: niente numeri o affermazioni inventate per "riempire".
- Contenuto e struttura restano quelli di `content.ts`/`types/content.ts`:
  il lavoro di design non introduce nuovi campi o narrazioni non richieste.
- Nessun vincolo visivo pregresso (palette/font/foto libere da scegliere).
