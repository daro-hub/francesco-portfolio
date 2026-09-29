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

// Applica il tema salvato prima dell'idratazione, per evitare un flash del tema sbagliato.
// Default: dark (l'identità visiva del sito è pensata prima di tutto per il tema scuro).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${newsreader.variable}`}
      data-theme="dark"
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
