import Link from "next/link";
import { content } from "@/resources/content";
import type { Project } from "@/types/content";
import { dictionary } from "@/i18n";
import { ArrowRightIcon } from "@/components/icons";
import { ScrollCue } from "@/components/ScrollCue";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={`project-card glass-card${project.spotlight ? " project-card-spotlight" : ""}`}
    >
      {project.spotlight && (
        <span className="project-spotlight-badge">{dictionary.projects.spotlight}</span>
      )}
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
  );
}

export function Projects() {
  const projects = [...content.projects].sort((a, b) => a.order - b.order);
  // Il progetto di punta sta fuori dalla griglia: dentro, con auto-fit, una card
  // a riga intera impedirebbe alle colonne vuote di collassare e le altre card
  // non riempirebbero più la riga.
  const spotlight = projects.filter((project) => project.spotlight);
  const rest = projects.filter((project) => !project.spotlight);

  return (
    <section id="projects" className="doc-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.projects.title}</h2>

        {projects.length === 0 ? (
          <p className="placeholder">{dictionary.projects.empty}</p>
        ) : (
          <>
            {spotlight.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
            {rest.length > 0 && (
              <div className="projects-grid">
                {rest.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ScrollCue targetId="experience" />
    </section>
  );
}
