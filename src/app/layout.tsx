import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: `${content.personal.fullName} — ${content.personal.tagline}`,
  description: content.summary,
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
