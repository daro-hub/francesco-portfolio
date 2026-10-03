import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { ScrollCue } from "@/components/ScrollCue";

export function AmuseApp() {
  return (
    <section id="amuse-app" className="doc-section">
      <div className="section-inner">
        <h2 className="section-title">{dictionary.amuseApp.title}</h2>
        <p className="amuse-intro">{content.amuseApp.intro}</p>

        <div className="amuse-grid">
          {content.amuseApp.products.map((product) => (
            <div key={product.name} className="amuse-card glass-card">
              <h3>
                {product.name} <span className="amuse-tagline">— {product.tagline}</span>
              </h3>
              <p>{product.description}</p>
              <ul className="project-tags">
                {product.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <span className="amuse-badge">{dictionary.amuseApp.badge}</span>
            </div>
          ))}
        </div>
      </div>

      <ScrollCue targetId="projects" />
    </section>
  );
}
