import { content } from "@/resources/content";
import { dictionary } from "@/i18n";

export function Education() {
  return (
    <section id="education" className="snap-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.education.title}</h2>

        <ol className="timeline">
          {content.education.map((edu) => (
            <li key={`${edu.institution}-${edu.startDate}`} className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-content">
                <h3>{edu.degree}</h3>
                <p className="timeline-meta">
                  {edu.institution}
                  {edu.location ? ` · ${edu.location}` : ""} · {edu.startDate} —{" "}
                  {edu.endDate === "present" ? dictionary.experience.present : edu.endDate}
                </p>
                {edu.details && edu.details.length > 0 && (
                  <ul>
                    {edu.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        {content.languages.length > 0 && (
          <div className="languages-row">
            {content.languages.map((lang) => (
              <span key={lang.language} className="language-pill">
                {lang.language} · {lang.level}
              </span>
            ))}
          </div>
        )}

        {content.volunteer.length > 0 && (
          <div className="volunteer-block">
            <h3>{dictionary.education.volunteerTitle}</h3>
            <ul>
              {content.volunteer.map((entry) => (
                <li key={entry.organization}>
                  <strong>{entry.role}</strong> — {entry.organization}
                  {entry.period ? ` (${entry.period})` : ""}
                  {entry.description ? `: ${entry.description}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
