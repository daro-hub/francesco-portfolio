import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { ArrowLeftIcon, ProjectIcon } from "@/components/icons";
import "./project.css";

export function generateStaticParams() {
  return content.projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return content.projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${content.personal.fullName}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <main className="project-page">
      <div className="project-page-inner">
        <Link href="/#projects" className="project-back-link">
          <ArrowLeftIcon />
          {dictionary.projects.backToProjects}
        </Link>

        <div className="project-preview">
          <span>{dictionary.projects.previewComingSoon}</span>
        </div>

        <div className="project-title-row">
          {project.icon && <ProjectIcon name={project.icon.name} color={project.icon.color} size="lg" />}
          <h1 className="project-title">{project.title}</h1>
        </div>

        {project.status && <span className="project-status">{project.status}</span>}

        <ul className="project-tags project-page-tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {project.concept && (
          <div className="project-concept">
            <span className="project-role-label">{dictionary.projects.concept}</span>
            <p>{project.concept}</p>
          </div>
        )}

        <div className="project-long-description">
          {project.longDescription.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className="project-highlights">
            <h2 className="project-highlights-title">{dictionary.projects.highlights}</h2>
            {project.highlights.map((group) => (
              <section key={group.title} className="project-highlight-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {project.role && (
          <div className="project-role">
            <span className="project-role-label">{dictionary.projects.role}</span>
            <p>{project.role}</p>
          </div>
        )}

        <div className="project-page-links">
          {project.link && (
            <a className="btn btn-primary" href={project.link} target="_blank" rel="noreferrer">
              {dictionary.projects.liveDemo}
            </a>
          )}
          {project.repos.map((repo) => (
            <a
              key={repo.url}
              className="btn btn-secondary"
              href={repo.url}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.projects.source}
              {project.repos.length > 1 ? ` (${repo.label})` : ""}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
