import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Se il sito verrà pubblicato su https://<user>.github.io/francesco-portfolio
  // (senza dominio personalizzato) andranno impostati basePath/assetPrefix:
  // basePath: "/francesco-portfolio",
  // assetPrefix: "/francesco-portfolio/",
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
