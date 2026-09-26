const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "francesco-portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Necessario per GitHub Pages quando il sito è servito da
  // https://<user>.github.io/francesco-portfolio (project pages, no dominio custom).
  // Se in futuro si passa a un dominio personalizzato, rimuovere questo blocco.
  ...(isGithubActions
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
