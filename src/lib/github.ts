// Statistiche GitHub reali, lette dall'API pubblica (nessun token) a build
// time — coerente con l'export statico del sito: niente fetch lato client,
// niente rate-limit visibile ai visitatori, e se GitHub non risponde durante
// la build il sito continua a generarsi senza questa sezione (fail-soft).

const GITHUB_USERNAME = "daro-hub";

export interface GithubStats {
  username: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
}

interface GithubRepo {
  stargazers_count: number;
  fork: boolean;
}

export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!userRes.ok) return null;
    const user = await userRes.json();

    let totalStars = 0;
    let page = 1;
    // Al massimo qualche pagina: sono una decina di repo pubblici, non serve
    // un ciclo illimitato — 5 pagine (500 repo) è già ben oltre il bisogno.
    for (; page <= 5; page += 1) {
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
        { headers: { Accept: "application/vnd.github+json" } },
      );
      if (!reposRes.ok) break;
      const repos: GithubRepo[] = await reposRes.json();
      if (repos.length === 0) break;
      totalStars += repos
        .filter((repo) => !repo.fork)
        .reduce((sum, repo) => sum + repo.stargazers_count, 0);
      if (repos.length < 100) break;
    }

    return {
      username: GITHUB_USERNAME,
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      totalStars,
    };
  } catch {
    // Nessuna connessione durante la build, API down, rate limit: la
    // sezione statistiche viene semplicemente omessa, il resto del sito no.
    return null;
  }
}
