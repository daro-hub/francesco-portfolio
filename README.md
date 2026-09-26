# francesco-portfolio

Sito personale portfolio/CV di Francesco Da Rin Zanco. Next.js (App Router) +
TypeScript, esportato staticamente per GitHub Pages.

## Sviluppo

```bash
npm install
npm run dev
```

Apri http://localhost:3000.

## Build statica

```bash
npm run build
```

Genera l'export statico in `out/` (usato dal workflow di deploy).

## Struttura

- `src/app/page.tsx` — home one-page a blocchi (Hero, About, Projects, Experience, Education)
- `src/app/cv/` — pagina `/cv`, versione stampabile in formato A4 (bottone "Download PDF" = stampa del browser con CSS dedicato)
- `src/resources/content.ts` — **unica fonte dei contenuti del CV** (dati personali, summary, skill, progetti, esperienze, education, lingue, volontariato). Per aggiungere un progetto o aggiornare qualsiasi contenuto si modifica solo questo file.
- `src/types/content.ts` — schema TypeScript dei contenuti
- `src/i18n/` — dizionario stringhe UI. Solo l'inglese (`en`) è attivo; la tendina lingua in alto a destra mostra un messaggio se si seleziona una lingua non ancora supportata
- `src/components/` — componenti layout (Header, ThemeToggle, LanguageSwitcher, SectionDots) e sezioni della home

## Stato contenuti

I campi marcati `TODO` in `src/resources/content.ts` vanno ancora compilati con i
dati reali (contatti, skill per area, dettagli esperienze/education, progetti in
evidenza, numeri concreti su utenti/performance/repository gestiti, lingue,
eventuale foto).

## Deploy

Il workflow `.github/workflows/deploy.yml` builda ed esporta il sito ad ogni push
su `main` e lo pubblica su GitHub Pages. Se è il primo deploy, potrebbe essere
necessario impostare manualmente **Settings → Pages → Source: GitHub Actions**
sul repository.
