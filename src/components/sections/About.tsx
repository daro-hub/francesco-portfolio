import { content } from "@/resources/content";
import { dictionary } from "@/i18n";

export function About() {
  return (
    <section id="about" className="snap-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.about.title}</h2>

        <div className="about-grid">
          <div className="about-text">
            <h3>{dictionary.about.whoAmI}</h3>
            <p>{content.about.intro}</p>

            <h3>{dictionary.about.whatIDo}</h3>
            <p>{content.about.whatIDo}</p>

            <h3>{dictionary.about.lookingFor}</h3>
            <p>{content.about.lookingFor}</p>
          </div>

          <div className="about-skills">
            <h3>{dictionary.about.skillsTitle}</h3>
            <div className="skill-groups">
              {content.skills.map((group) => (
                <div key={group.area} className="skill-group">
                  <h4>{group.area}</h4>
                  <ul className="skill-tags">
                    {group.skills.length > 0 ? (
                      group.skills.map((skill) => <li key={skill}>{skill}</li>)
                    ) : (
                      <li className="placeholder">TODO</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-row">
          {content.stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
