import { content } from "@/resources/content";
import { dictionary } from "@/i18n";

export function Projects() {
  const projects = [...content.projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="snap-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.projects.title}</h2>

        {projects.length === 0 ? (
          <p className="placeholder">{dictionary.projects.empty}</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.slug} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      {dictionary.projects.viewProject}
                    </a>
                  )}
                  {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noreferrer">
                      {dictionary.projects.viewCode}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
