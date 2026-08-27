import Link from "next/link";

import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects } from "@/lib/content/projects";
import { profile, skillGroups } from "@/lib/profile";

export default async function Home() {
  const featuredProjects = (await getAllProjects()).filter(
    ({ featured }) => featured,
  );

  return (
    <div className="home-page">
      <section className="hero shell" aria-labelledby="hero-title">
        <p className="eyebrow">
          Backend engineering · Reliable systems · Clear decisions
        </p>
        <h1 id="hero-title">
          I build backend systems with fundamentals first.
        </h1>
        <p className="hero-copy">
          I&apos;m {profile.name}, a {profile.role}. I focus on maintainable
          services, sound engineering practices, and the reasoning that turns
          requirements into reliable software.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/projects">
            Explore projects
          </Link>
          <a
            className="button button-secondary"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="home-section shell" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="featured-title">Featured projects</h2>
          </div>
          <Link className="text-link" href="/projects">
            View all projects →
          </Link>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard
              project={project}
              headingLevel={3}
              key={project.slug}
            />
          ))}
        </div>
      </section>

      <section
        className="home-section shell split-section"
        aria-labelledby="about-summary-title"
      >
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-summary-title">Engineering beyond the framework.</h2>
        </div>
        <div className="section-copy">
          <p>
            My approach starts with understanding the system: its boundaries,
            failure modes, data flow, and operational constraints. Tools matter,
            but the decisions behind them matter more.
          </p>
          <Link className="text-link" href="/about">
            More about my approach →
          </Link>
        </div>
      </section>

      <section className="home-section shell" aria-labelledby="skills-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 id="skills-title">Tools used in real projects.</h2>
          </div>
          <p className="section-note">
            A focused selection from the work represented in my repositories.
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.skills.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="home-section contact-section shell"
        aria-labelledby="contact-title"
      >
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let&apos;s talk engineering.</h2>
        </div>
        <div className="contact-links">
          <a className="button" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a
            className="text-link"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </section>
    </div>
  );
}
