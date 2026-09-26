import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { SectionDots } from "@/components/layout/SectionDots";
import { dictionary } from "@/i18n";

const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: dictionary.nav.about },
  { id: "projects", label: dictionary.nav.projects },
  { id: "experience", label: dictionary.nav.experience },
  { id: "education", label: dictionary.nav.education },
];

export default function HomePage() {
  return (
    <>
      <div id="scroll-container">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
      </div>
      <SectionDots sections={sections} />
    </>
  );
}
