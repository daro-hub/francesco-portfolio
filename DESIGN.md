# Design

<!-- impeccable:design-schema 1 -->

## World

**Aurora Gradient.** Superficie dark-first: fondo quasi-nero con nuvole
sfocate blu/violetto/teal fisse dietro tutti i contenuti, card in "vetro"
(sfondo translucido + blur), pill per nav/bottoni/badge. Angoli morbidi
ovunque, nessuna griglia, nessun hairline, nessun bordo laterale/top come
accento decorativo.

Direzione **pinnata direttamente dall'utente** (tema scuro, colore
secondario blu, linee morbide senza griglie, font più espressivi), dopo
revisione di 3 comp HTML mostrati in chat (Midnight Glass / Aurora
Gradient / Calm Ink). Scelta: Aurora Gradient (mock 2). Sostituisce la
direzione precedente ("Datasheet / scheda tecnica") shippata in questa
stessa sessione — vedi nota "Storia" più sotto.

## Palette

| Ruolo | Dark (default) | Light |
|---|---|---|
| `--color-bg` | `#0A0A10` | `#F4F6FD` |
| `--color-bg-secondary` | `#12121B` | `#E9EDFB` |
| `--color-surface` (glass) | `rgba(255,255,255,.045)` | `#FFFFFF` |
| `--color-text` | `#EEF0F7` | `#10131C` |
| `--color-text-muted` | `#9AA3C2` | `#565F80` |
| `--color-accent` | `#3B6BFF` | `#2F5FE0` |

Blob di sfondo (solo decorativi, `position: fixed`, `filter: blur(90px)`):
blu `#3B6BFF`, violetto `#7C6CF6`, teal `#2FD4C8`, opacità ridotta in light
mode.

## Type

- **Space Grotesk** (`--font-display`) — titoli, logo, valori statistiche.
  Grottesca geometrica bold, carattere "da prodotto", non generica.
- **Inter** (`--font-body`) — corpo, nav, UI.
- **Newsreader italic** (`--font-voice`) — solo la tagline dell'hero
  (`.hero-tagline`). Contrasto editoriale/caldo contro il display bold
  geometrico, aggiunto in una sessione successiva su richiesta di
  arricchire la prima schermata.

## Component language

- **Radius:** pill (999px) per nav/bottoni/badge/tag; 16-24px per le card.
  Nessun elemento a spigolo vivo.
- **Card:** `.glass-card` — sfondo translucido, `backdrop-filter: blur`,
  bordo sottile, ombra soffusa. Nessun bordo laterale/top colorato spesso
  (pattern "side-tab" — rimosso esplicitamente dal detector durante questa
  build, vedi Stato di finitura).
- **Nav:** pillola con link interni arrotondati, stato hover con sfondo
  soffuso.
- **Indice di sezione:** `.section-index` — puntini circolari con alone
  (`box-shadow`) blu sullo stato attivo, sostituiscono qualsiasi indice
  testuale/mono.
- **Bottoni:** `.btn-primary` pieno blu con ombra glow; `.btn-secondary`
  vetro con bordo sottile.
- **Interazione:** transizioni morbide (150-250ms `ease`), mai scatti
  secchi.

## Scroll e prima schermata (rifinitura post-ship)

- **Scroll a blocchi:** `#scroll-container` (`height:100dvh; overflow-y:auto;
  scroll-snap-type:y proximity`) avvolge le sezioni della home; ogni
  `.doc-section` ha `scroll-snap-align:start` e `min-height:100dvh`.
  `proximity` e non `mandatory`: su schermi piccoli About/Education possono
  superare un viewport, e `mandatory` intrappolerebbe lo scroll rimbalzando
  indietro prima di finire di leggere. La pagina `/cv` non è coinvolta
  (resta scroll libero, è un documento stampabile).
- **Fix z-index blob:** `.bg-aurora` (i blob di sfondo) era a `z-index:0`,
  che in CSS lo faceva dipingere SOPRA alle sezioni statiche (non
  posizionate) della pagina, rendendo meno leggibile testo/card nell'angolo
  in alto a sinistra dove il blob è più denso. Corretto a `z-index:-1`
  (i discendenti a z-index negativo dipingono sempre dietro al contenuto
  non posizionato in un contesto di stacking).
- **Ritratto hero:** `.hero-avatar` — se `content.personal.photo` è
  assente, placeholder circolare (bordo tratteggiato, icona immagine,
  iniziali in filigrana, etichetta "Photo coming soon"); diventa una foto
  reale (`object-fit:cover`) non appena il campo viene compilato.
- **Scroll cue:** piccolo indicatore animato in fondo alla hero (nascosto
  sotto 640px per non affollare lo schermo mobile), segnala che c'è altro
  sotto ora che la pagina scrolla a blocchi.

Dark è il tema di default e l'esperienza primaria (`data-theme="dark"` su
`<html>`, impostato anche nello script di init pre-idratazione). Il toggle
chiaro/scuro resta disponibile con una controparte light coerente (stesso
accento blu, blob a opacità ridotta).

## Lingua

Tutto il testo visibile (UI, nav, contenuti placeholder in
`src/resources/content.ts`) è in inglese.

## Pagina /cv

Stessa identità (accento blu, angoli morbidi, ombra soffusa) ma card bianca
fissa (non legata al tema) per garanzia di stampa A4 leggibile in qualunque
condizione.

## Storia di questa build

Questa è la **seconda direzione** shippata in sessione sullo stesso
progetto. La prima ("Datasheet / scheda tecnica", scelta tramite il
processo standard `concept-seed` della skill) è stata sostituita
integralmente su richiesta esplicita dell'utente prima ancora di essere
revisionata — l'utente ha pinnato tema scuro + blu + linee morbide + font
più espressivi, mostrando la direzione voluta tramite 3 comp di confronto.
Nessun elemento della direzione precedente è stato conservato nel CSS/nei
componenti (rewrite completo), in linea con "brief-pinned beats the roll".

## Provenance

Nessun asset raster generato (nessun tool di generazione immagini
disponibile in sessione). I 3 comp di confronto mostrati all'utente erano
file HTML statici temporanei (`/tmp/portfolio-mock-*.html`), rimossi a fine
sessione — non fanno parte del build finale.

## Stato di finitura

Verifica visiva manuale nel browser pane (desktop, mobile, light/dark) al
posto della pipeline formale di sub-agent review/documenter (nessun tool
di sub-agent invocato in questa sessione) — sostituzione dichiarata.
Detector meccanico (`impeccable detect --json`) eseguito due volte: prima
run → 1 finding (`side-tab` su `.cv-sheet`, bordo/ombra decorativa spessa
su un lato di una card arrotondata); rimosso l'accento e rieseguito →
**0 findings**. Contenuti reali restano `TODO`/placeholder (in inglese) —
prossimo step dichiarato dall'utente: raccogliere esperienze/skill reali
da inserire in `src/resources/content.ts`.
