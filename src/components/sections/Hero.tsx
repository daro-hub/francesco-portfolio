import Link from "next/link";
import { content } from "@/resources/content";
import { dictionary } from "@/i18n";

export function Hero() {
  const initials = content.personal.fullName
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section id="top" className="snap-section hero-section">
      <div className="hero-inner">
        <div className="hero-avatar" aria-hidden="true">
          {content.personal.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.personal.photo} alt="" />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <p className="hero-greeting">{dictionary.hero.greeting}</p>
        <h1 className="hero-name">{content.personal.fullName}</h1>
        <p className="hero-tagline">{content.personal.tagline}</p>
        <p className="hero-location">{content.personal.contact.location}</p>

        <div className="hero-actions">
          <Link href="/cv" className="btn btn-primary">
            {dictionary.hero.ctaResume}
          </Link>
          <a className="btn btn-secondary" href={`mailto:${content.personal.contact.email}`}>
            {dictionary.hero.ctaContact}
          </a>
        </div>

        <div className="hero-links">
          <a href={content.personal.contact.linkedin} target="_blank" rel="noreferrer">
            {dictionary.hero.linkedin}
          </a>
          <a href={content.personal.contact.github} target="_blank" rel="noreferrer">
            {dictionary.hero.github}
          </a>
        </div>
      </div>
    </section>
  );
}
