import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { ScrollCue } from "@/components/ScrollCue";

function formatRange(start: string, end: string) {
  return `${start} — ${end === "present" ? dictionary.experience.present : end}`;
}

export function Experience() {
  return (
    <section id="experience" className="doc-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.experience.title}</h2>

        <ol className="timeline">
          {content.experience.map((exp) => (
            <li key={`${exp.company}-${exp.startDate}`} className="timeline-item">
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-content">
                <h3>{exp.role}</h3>
                <p className="timeline-meta">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""} ·{" "}
                  {formatRange(exp.startDate, exp.endDate)}
                </p>
                {exp.highlights.length > 0 ? (
                  <ul>
                    {exp.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="placeholder">TBD</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <ScrollCue targetId="education" />
    </section>
  );
}
