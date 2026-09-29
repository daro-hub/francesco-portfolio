---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/cv/page.tsx"]
---

## Direction contract

THESIS: dark-first "aurora" surface — soft blurred blue/violet blobs behind
a near-black ground, glass cards with soft rounded corners, pill-shaped
nav/buttons/badges. Rejects every hard edge, hairline grid, and 0-radius
device from the previous datasheet direction; the visitor should feel a
calm, premium, futuristic product page rather than a technical document.
This direction is pinned directly by the user (dark theme, blue secondary
color, soft lines, no grids, expressive fonts) after reviewing 3 HTML
comps — it overrides the concept-seed roll from the previous round.

OWN-WORLD: dark ground `#0a0a10` / `#12121b`, three blurred blob shapes
(blue `#3b6bff`, violet `#7c6cf6`, teal `#2fd4c8`) fixed behind all content
at low opacity. One accent color, blue `#3b6bff`, carrying pills, CTAs,
active states, link hovers, timeline markers, stat values. Cards are
translucent "glass" (`background: rgba(255,255,255,.045)`, `backdrop-filter:
blur(18px)`, 16-24px radius, soft shadow, no hard border accents). Nav is a
pill-shaped segmented control. Type: Space Grotesk (display/headings,
bold, geometric) + Inter (body/UI). Light mode is a secondary, softer
counterpart (pale blue-white ground, same blue accent, blobs at low
opacity) reached via the existing theme toggle; dark is the default and
primary experience.

STORY: the visitor lands on a calm, glowing hero — kicker badge, big name
with the surname in accent blue, tagline, two pill CTAs — then scrolls
through soft glass sections (About, Projects, Experience, Education) with
a glowing dot index on the right tracking position. No document/table
metaphor; this is a persuade-mode profile page, not a technical artifact.

FIRST VIEWPORT: pill nav bar top (logo left, nav pills center, language +
theme toggle + CTA right) over the aurora background; below it, a kicker
badge ("Hi, I'm"), the name in two-tone type (white + accent blue), tagline,
two pill buttons (primary filled blue, secondary glass outline), and two
text links (LinkedIn/GitHub). No datasheet table, no hard grid, no 0-radius
anywhere.

FORM: direction pinned by the user from 3 HTML comps shown inline
(Midnight Glass / Aurora Gradient / Calm Ink) — user picked "Aurora
Gradient" (mock 2) explicitly, in English. Signature interaction: soft
150-250ms ease transitions on hover/theme change (opposite of the previous
direction's hard 90ms steps); glowing dot index with box-shadow halo on
the active section.

FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, DESIGN.md, and every shipping raster
carrying its provenance.
