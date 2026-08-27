import type { Metadata } from "next";

import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, engineering approach, experience, and education of backend engineer Eliya Cohen.",
};

export default function AboutPage() {
  return (
    <div className="content-section shell about-page">
      <header className="about-intro">
        <p className="eyebrow">About</p>
        <h1 className="page-title">
          I care about how systems work, not only how they are assembled.
        </h1>
        <div className="about-lede">
          <p>
            I&apos;m {profile.name}, a backend engineer with a B.Sc. in Computer
            Science and experience combining hands-on development with team
            leadership.
          </p>
          <p>
            I approach engineering by clarifying the problem first, identifying
            boundaries and failure modes, and then choosing the smallest design
            that can remain understandable as the system evolves.
          </p>
          <p>
            I continue to deepen my understanding of system design, distributed
            systems, and infrastructure. The goal is not to collect
            technologies, but to make better technical decisions with stronger
            fundamentals.
          </p>
        </div>
      </header>

      <section className="about-section" aria-labelledby="experience-title">
        <div className="about-section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">{profile.role}</h2>
        </div>
        <ul className="responsibility-list">
          {profile.experience.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      </section>

      <section className="about-section" aria-labelledby="education-title">
        <div className="about-section-heading">
          <p className="eyebrow">Education</p>
          <h2 id="education-title">{profile.education.degree}</h2>
        </div>
        <div className="education-details">
          <p>{profile.education.institution}</p>
          <p>{profile.education.period}</p>
        </div>
      </section>
    </div>
  );
}
