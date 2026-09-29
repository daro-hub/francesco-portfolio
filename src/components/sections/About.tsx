import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { getGithubStats } from "@/lib/github";
import { GitHubIcon } from "@/components/icons";

export async function About() {
  const githubStats = await getGithubStats();

  return (
    <section id="about" className="doc-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.about.title}</h2>

        <div className="about-grid">
          <div className="about-text glass-card about-panel">
            <h3>{dictionary.about.whoAmI}</h3>
            <p>{content.about.intro}</p>

            <h3>{dictionary.about.whatIDo}</h3>
            <p>{content.about.whatIDo}</p>

            <h3>{dictionary.about.lookingFor}</h3>
            <p>{content.about.lookingFor}</p>
          </div>

          <div className="about-skills glass-card about-panel">
            <h3>{dictionary.about.skillsTitle}</h3>
            <div className="skill-groups">
              {content.skills.map((group) => (
                <div key={group.area} className="skill-group">
                  <h4>{group.area}</h4>
                  <ul className="skill-tags">
                    {group.skills.length > 0 ? (
                      group.skills.map((skill) => <li key={skill}>{skill}</li>)
                    ) : (
                      <li className="placeholder">TBD</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {githubStats && (
          <a
            href={`https://github.com/${githubStats.username}`}
            target="_blank"
            rel="noreferrer"
            className="github-stats"
          >
            <span className="github-stats-title">
              <GitHubIcon />
              {dictionary.about.githubStatsTitle}
            </span>
            <div className="github-stats-row">
              <div className="github-stat">
                <span className="github-stat-value">{githubStats.publicRepos}</span>
                <span className="github-stat-label">{dictionary.about.githubPublicRepos}</span>
              </div>
              <div className="github-stat">
                <span className="github-stat-value">{githubStats.totalStars}</span>
                <span className="github-stat-label">{dictionary.about.githubStars}</span>
              </div>
              <div className="github-stat">
                <span className="github-stat-value">{githubStats.followers}</span>
                <span className="github-stat-label">{dictionary.about.githubFollowers}</span>
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
