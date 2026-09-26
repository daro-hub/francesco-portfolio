import Link from "next/link";
import type { Metadata } from "next";
import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { CvDownloadButton } from "@/components/cv/CvDownloadButton";
import "./cv.css";

export const metadata: Metadata = {
  title: `${content.personal.fullName} — CV`,
};

export default function CvPage() {
  return (
    <main className="cv-page">
      <div className="cv-toolbar no-print">
        <Link href="/">{dictionary.cv.back}</Link>
        <CvDownloadButton />
      </div>

      <article className="cv-sheet">
        <header className="cv-header">
          <h1>{content.personal.fullName}</h1>
          <p className="cv-tagline">{content.personal.tagline}</p>
          <p className="cv-contact">
            {[
              content.personal.contact.location,
              content.personal.contact.email,
              content.personal.contact.linkedin,
              content.personal.contact.github,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </header>

        <section className="cv-section">
          <h2>Professional Summary</h2>
          <p>{content.summary}</p>
        </section>

        <section className="cv-section">
          <h2>Technical Skills</h2>
          {content.skills.map((group) => (
            <p key={group.area}>
              <strong>{group.area}:</strong> {group.skills.length > 0 ? group.skills.join(", ") : "TODO"}
            </p>
          ))}
        </section>

        <section className="cv-section">
          <h2>Professional Experience</h2>
          {content.experience.map((exp) => (
            <div key={`${exp.company}-${exp.startDate}`} className="cv-entry">
              <h3>
                {exp.role} — {exp.company}
              </h3>
              <p className="cv-meta">
                {exp.startDate} – {exp.endDate === "present" ? "Present" : exp.endDate}
                {exp.location ? ` · ${exp.location}` : ""}
              </p>
              {exp.highlights.length > 0 && (
                <ul>
                  {exp.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          {content.education.map((edu) => (
            <div key={`${edu.institution}-${edu.startDate}`} className="cv-entry">
              <h3>{edu.degree}</h3>
              <p className="cv-meta">
                {edu.institution}
                {edu.location ? ` · ${edu.location}` : ""} · {edu.startDate} –{" "}
                {edu.endDate === "present" ? "Present" : edu.endDate}
              </p>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Languages</h2>
          <p>{content.languages.map((lang) => `${lang.language} (${lang.level})`).join(" · ")}</p>
        </section>

        {content.volunteer.length > 0 && (
          <section className="cv-section">
            <h2>Volunteer Experience</h2>
            {content.volunteer.map((entry) => (
              <p key={entry.organization}>
                {entry.role} — {entry.organization}
                {entry.period ? ` (${entry.period})` : ""}
              </p>
            ))}
          </section>
        )}
      </article>
    </main>
  );
}
