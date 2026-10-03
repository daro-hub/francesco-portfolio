// GitHub Pages serves this site from /francesco-portfolio (project page,
// no custom domain) — see next.config.mjs. next/link and next/image
// prepend that basePath automatically; a plain <img src="/images/...">
// pointing at a file in public/ does not, and would 404 in production
// (it'd request the *root* of daro-hub.github.io instead of /francesco-
// portfolio/images/...). Use this for any such path instead.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
