import Link from "next/link";
import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { ArrowRightIcon } from "@/components/icons";
import { ScrollCue } from "@/components/ScrollCue";

export function Projects() {
  const projects = [...content.projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="doc-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.projects.title}</h2>

        {projects.length === 0 ? (
          <p className="placeholder">{dictionary.projects.empty}</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}/`}
                className="project-card glass-card"
              >
                {project.link && (
                  <div className="project-card-thumb">
                    <iframe
                      src={project.link}
                      title=""
                      tabIndex={-1}
                      aria-hidden="true"
                      className="project-card-thumb-iframe"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="project-card-cta">
                  {dictionary.projects.viewDetails}
                  <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <ScrollCue targetId="experience" />
    </section>
  );
}
