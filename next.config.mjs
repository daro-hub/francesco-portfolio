import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "francesco-portfolio";
// public/CNAME esiste solo quando il sito ha un dominio custom (es.
// francesco.is-a.dev): in quel caso GitHub Pages serve il sito dalla
// radice del dominio, non più da <user>.github.io/francesco-portfolio —
// il basePath/assetPrefix sotto andrebbe altrimenti ad anteporre un
// prefisso di percorso che non esiste più, rompendo ogni asset/link.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const hasCustomDomain = existsSync(path.join(projectRoot, "public", "CNAME"));
const usesBasePath = isGithubActions && !hasCustomDomain;
const basePath = usesBasePath ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Necessario solo per GitHub Pages senza dominio custom, quando il sito
  // è servito da https://<user>.github.io/francesco-portfolio (project
  // pages). Con un dominio custom (vedi hasCustomDomain sopra) questo
  // blocco non si applica più.
  ...(usesBasePath
    ? {
        basePath,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
  // next/link e next/image anteporrebbero basePath da soli; un <img src="/...">
  // puntato a un file in public/ (es. la foto in Hero.tsx) no — da qui
  // src/lib/basePath.ts lo legge per costruire quell'URL a mano.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
