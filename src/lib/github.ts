// Statistiche GitHub reali, lette dall'API pubblica (nessun token) a build
// time — coerente con l'export statico del sito: niente fetch lato client,
// niente rate-limit visibile ai visitatori, e se GitHub non risponde durante
// la build il sito continua a generarsi senza questa sezione (fail-soft).
//
// Stelle/follower sono stati scartati di proposito: con un account personale
// senza audience sono quasi sempre 0, numeri che non raccontano nulla.
// Commit e linguaggi usati sono metriche dove c'è davvero qualcosa da
// mostrare.

const GITHUB_USERNAME = "daro-hub";
// Oltre questo numero di repo non paga più la richiesta extra per ognuno
// (rate limit anonimo: 60 richieste/ora totali per IP) — i rimanenti non
// contano nel totale commit, ma il sito continua a generarsi comunque.
const MAX_REPOS_FOR_COMMIT_COUNT = 15;

export interface GithubStats {
  username: string;
  publicRepos: number;
  commitCount: number;
  languageCount: number;
}

interface GithubRepo {
  name: string;
  language: string | null;
  fork: boolean;
}

export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!userRes.ok) return null;
    const user = await userRes.json();

    const repos: GithubRepo[] = [];
    for (let page = 1; page <= 5; page += 1) {
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
        { headers: { Accept: "application/vnd.github+json" } },
      );
      if (!reposRes.ok) break;
      const pageRepos: GithubRepo[] = await reposRes.json();
      if (pageRepos.length === 0) break;
      repos.push(...pageRepos);
      if (pageRepos.length < 100) break;
    }

    const ownRepos = repos.filter((repo) => !repo.fork);

    const languageCount = new Set(
      ownRepos.map((repo) => repo.language).filter((lang): lang is string => Boolean(lang)),
    ).size;

    const commitCount = await getTotalCommitCount(ownRepos.slice(0, MAX_REPOS_FOR_COMMIT_COUNT));

    return {
      username: GITHUB_USERNAME,
      publicRepos: user.public_repos ?? 0,
      commitCount,
      languageCount,
    };
  } catch {
    // Nessuna connessione durante la build, API down, rate limit: la
    // sezione statistiche viene semplicemente omessa, il resto del sito no.
    return null;
  }
}

/**
 * L'API pubblica di GitHub non espone un conteggio commit diretto. Il
 * trucco noto: chiedere 1 commit per pagina e leggere il numero dell'ultima
 * pagina dall'header Link — risposta pesante quanto un normale GET, niente
 * dei 202 "in elaborazione" che l'endpoint /stats/contributors può restituire.
 */
async function getTotalCommitCount(repos: GithubRepo[]): Promise<number> {
  const counts = await Promise.all(
    repos.map(async (repo) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&per_page=1`,
          { headers: { Accept: "application/vnd.github+json" } },
        );
        if (!res.ok) return 0;

        const link = res.headers.get("link");
        const lastPageMatch = link?.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
        if (lastPageMatch) return Number(lastPageMatch[1]);

        // Nessun header Link: una sola pagina di risultati (0 o 1 commit).
        const body = await res.json();
        return Array.isArray(body) ? body.length : 0;
      } catch {
        return 0;
      }
    }),
  );
  return counts.reduce((sum, count) => sum + count, 0);
}
