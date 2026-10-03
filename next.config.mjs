const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "francesco-portfolio";
const basePath = isGithubActions ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Necessario per GitHub Pages quando il sito è servito da
  // https://<user>.github.io/francesco-portfolio (project pages, no dominio custom).
  // Se in futuro si passa a un dominio personalizzato, rimuovere questo blocco
  // (e NEXT_PUBLIC_BASE_PATH sotto, che esiste solo per riflettere lo stesso valore).
  ...(isGithubActions
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
