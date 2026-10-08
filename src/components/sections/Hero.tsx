import Link from "next/link";
import { content } from "@/resources/content";
import { dictionary } from "@/i18n";
import { ContactActionPill } from "@/components/ContactActionPill";
import { ScrollCue } from "@/components/ScrollCue";
import { MapPinIcon } from "@/components/icons";
import { withBasePath } from "@/lib/basePath";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7.5l7.1 5.2a1.5 1.5 0 001.8 0L20 7.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.15.37 2.38.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.47.57 3.6a1 1 0 01-.25 1.03l-2.22 2.17z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 00-3.8 23.38c.6.1.83-.26.83-.57v-2.23c-3.02.56-3.8-.73-4.04-1.4-.13-.35-.72-1.42-1.23-1.7-.42-.23-1.02-.78-.02-.8.94-.01 1.62.87 1.85 1.23 1.08 1.82 2.8 1.31 3.5 1 .1-.79.42-1.31.77-1.61-2.67-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 016 0c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.44.38.81 1.11.81 2.25v3.36c0 .32.23.69.83.57A12 12 0 0012 .3z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function Hero() {
  const { fullName, tagline, contact, photo } = content.personal;
  const [firstName, ...rest] = fullName.split(" ");
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("");

  // tel: vuole solo cifre e "+", niente spazi — il numero resta leggibile
  // in content.ts e nella pillola, la pulizia avviene solo qui.
  const phoneDigits = contact.phone.replace(/[^0-9+]/g, "");

  const actionPills = [
    {
      key: "phone",
      href: `tel:${phoneDigits}`,
      copyValue: phoneDigits,
      icon: <PhoneIcon />,
      value: contact.phone,
    },
    {
      key: "email",
      href: `mailto:${contact.email}`,
      copyValue: contact.email,
      icon: <MailIcon />,
      value: contact.email,
    },
  ];

  const linkPills = [
    {
      key: "linkedin",
      href: contact.linkedin,
      copyValue: contact.linkedin,
      icon: <LinkedInIcon />,
      value: `${dictionary.hero.linkedin} · FDRZ`,
    },
    {
      key: "github",
      href: contact.github,
      copyValue: contact.github,
      icon: <GithubIcon />,
      value: `${dictionary.hero.github} · daro-hub`,
    },
  ];

  return (
    <section id="top" className="doc-section hero-section">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <span className="section-kicker">
            <span className="dot" aria-hidden="true" />
            {dictionary.hero.greeting}
          </span>

          <h1 className="hero-name">
            {firstName} <span className="accent">{rest.join(" ")}</span>
          </h1>

          <p className="hero-tagline">{tagline}</p>

          {contact.location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location)}`}
              target="_blank"
              rel="noreferrer"
              className="hero-location"
            >
              <MapPinIcon />
              {contact.location}
            </a>
          )}

          {/* Le 4 pillole supportano tutte tap-prolungato-per-copiare
              (telefono/email copiano il valore "pulito", LinkedIn/GitHub
              copiano l'URL del profilo) — un'unica grid, un unico hint. */}
          <div className="contact-pills">
            {[...actionPills, ...linkPills].map((pill) => (
                <ContactActionPill
                  key={pill.key}
                  href={pill.href}
                  copyValue={pill.copyValue}
                  icon={pill.icon}
                  label={pill.value}
                  copiedLabel={dictionary.hero.copied}
                  external={pill.key === "linkedin" || pill.key === "github"}
                />
            ))}
          </div>
          <p className="contact-pills-hint">{dictionary.hero.holdToCopyHint}</p>

          {/* Porta alla pagina /cv per leggerlo (non lo scarica — il vero
              download è il bottone "Download PDF" su quella pagina), quindi
              l'etichetta dice "See CV", non "Download". */}
          <Link href="/cv" className="cv-link-subtle">
            <EyeIcon />
            {dictionary.hero.ctaResume}
          </Link>
        </div>

        <div className="hero-portrait">
          <div className={`hero-avatar${photo ? "" : " hero-avatar-placeholder"}`}>
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withBasePath(photo)} alt={fullName} />
            ) : (
              <>
                <span className="hero-avatar-initials" aria-hidden="true">
                  {initials}
                </span>
                <svg
                  className="hero-avatar-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="6" width="18" height="14" rx="2" />
                  <circle cx="9" cy="12" r="2.2" />
                  <path d="M3 17l4.5-4.5a2 2 0 0 1 2.8 0L14 16" />
                  <path d="M8 6l1.2-2h5.6L16 6" />
                </svg>
                <span className="hero-avatar-label">{dictionary.hero.photoComingSoon}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <ScrollCue targetId="about" />
    </section>
  );
}
