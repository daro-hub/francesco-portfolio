import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { content } from "@/resources/content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-voice",
});

// URL pubblica reale (GitHub Pages, project page senza dominio custom —
// vedi next.config.mjs/README.md), usata per i tag SEO/social che vogliono
// un URL assoluto (canonical, Open Graph, Twitter card, JSON-LD). È una
// costante indipendente da NEXT_PUBLIC_BASE_PATH: quel valore cambia in
// base all'ambiente di build (vuoto in locale), ma i metadati devono
// sempre puntare al sito pubblicato, non a dove sta girando la build.
const siteUrl = "https://daro-hub.github.io/francesco-portfolio/";
const pageTitle = `${content.personal.fullName} — ${content.personal.tagline}`;
const ogImagePath = "images/francesco.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s — ${content.personal.fullName}`,
  },
  description: content.summary,
  keywords: [
    content.personal.fullName,
    content.personal.tagline,
    ...content.skills.flatMap((group) => group.skills),
  ],
  authors: [{ name: content.personal.fullName, url: content.personal.contact.github }],
  creator: content.personal.fullName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: pageTitle,
    description: content.summary,
    url: siteUrl,
    siteName: pageTitle,
    images: [{ url: ogImagePath, width: 1200, height: 1200, alt: content.personal.fullName }],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: content.summary,
    images: [ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a10" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fd" },
  ],
};

// Person schema (JSON-LD): aiuta i motori di ricerca a collegare questo
// sito all'identità reale di Francesco (rich result "Persona" invece di
// una generica pagina web). filter(Boolean) scarta i contatti ancora TODO.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: content.personal.fullName,
  jobTitle: content.personal.tagline,
  url: siteUrl,
  image: `${siteUrl}${ogImagePath}`,
  sameAs: [content.personal.contact.linkedin, content.personal.contact.github].filter(
    (url) => url !== "TODO",
  ),
};

// Applica il tema giusto prima dell'idratazione, per evitare un flash del
// tema sbagliato. Priorità: una scelta manuale salvata (localStorage) vince
// sempre; altrimenti, alla primissima visita, segue la preferenza del
// browser/OS (prefers-color-scheme) invece di forzare sempre dark — il
// toggle manuale resta comunque disponibile e, una volta usato, sovrascrive
// la preferenza di sistema per le visite successive.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
  try {
    // Il sito scrolla dentro #scroll-container (vedi ScrollContainer.tsx),
    // non il documento — ma Chrome può comunque tentare di ripristinare lo
    // scrollTop di un elemento con id stabile per uno stesso URL, anche su
    // una visita "fresca". Disattivarlo appena possibile, prima che React
    // monti; ScrollContainer poi forza comunque scrollTop a 0 (o all'hash)
    // appena il nodo esiste, nel caso il ripristino sia già scattato.
    history.scrollRestoration = 'manual';
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${newsreader.variable}`}
      data-theme="dark"
      // themeInitScript (sotto, in <head>) sovrascrive data-theme prima
      // dell'idratazione, per evitare un flash del tema sbagliato — ma
      // questo fa sì che React veda un attributo diverso da quello che ha
      // renderizzato lato server ogni volta che il tema reale è "light".
      // suppressHydrationWarning non basta (sopprime solo i mismatch sul
      // contenuto testuale di un nodo, non sugli attributi — confermato
      // provandolo: il warning restava identico con o senza), e togliere
      // del tutto data-theme dal JSX produce comunque un mismatch (React
      // segnala anche un attributo presente solo lato client). Il warning
      // è quindi ineliminabile con questo pattern — ma è una delle
      // eccezioni note e innocue: solo in `next dev`, mai in produzione
      // (React rimuove questi controlli/log nella build di produzione),
      // quindi non arriva a chi visita il sito statico esportato.
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <div className="bg-aurora" aria-hidden="true">
          <span className="blob blob-1" />
          <span className="blob blob-2" />
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
