import { MeshBackground } from "@/components/MeshBackground";
import { ProfileHero } from "@/components/ProfileHero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { DevPlayground } from "@/components/DevPlayground";
import { getPortfolioData } from "@/lib/portfolio";

export default async function Home() {
  const data = await getPortfolioData();
  const { profile, projects, experiences, stack } = data;

  return (
    <>
      <MeshBackground />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Ahmad Alvin Griffin home">
          <span className="brand-mark">AG</span>
          <span>Ahmad Alvin</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#arcade">Arcade</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="icon-link" href="/admin" aria-label="Open admin dashboard">
          Admin
        </a>
      </header>

      <main>
        {/* Interactive Hero with Photo Toggle (Formal LinkedIn vs Cyber Dev) */}
        <ProfileHero profile={profile} />

        {/* Dynamic Capabilities Ticker */}
        <section className="ticker" aria-label="Core capabilities">
          <div>
            <span>Bank Mandiri ODP IT</span>
            <span>React 19 & Next.js 15</span>
            <span>Java 21 & Spring Boot 3</span>
            <span>Node.js & Express</span>
            <span>Laravel 10/11</span>
            <span>PostgreSQL & MySQL</span>
            <span>Google Cloud Run</span>
            <span>TensorFlow & ONNX</span>
            <span>WebSocket STOMP</span>
            <span>Docker</span>
          </div>
        </section>

        {/* Work Experiences */}
        <section id="work" className="section split">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience</p>
            <h2>Mission-critical systems that keep teams moving.</h2>
          </div>
          <div className="timeline">
            {experiences.map((experience) => (
              <article className="timeline-item reveal" key={experience.id}>
                <time>{experience.period}</time>
                <h3>{experience.role}</h3>
                <p className="muted">{experience.company}</p>
                <p>{experience.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Projects Showcase with Frontend Mockup Preview & GitHub Links */}
        <ProjectShowcase projects={projects} />

        {/* Interactive Games & Dev Playground (Retro Snake & Code Speed Typer) */}
        <DevPlayground />

        {/* Tech Stack */}
        <section id="stack" className="section stack-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Stack & Architecture</p>
            <h2>Comfortable across enterprise product layers.</h2>
          </div>
          <div className="stack-board reveal">
            {stack.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Leadership */}
        <section className="section education">
          <div className="section-heading reveal">
            <p className="eyebrow">Education & Leadership</p>
            <h2>Built through research, campus leadership, and delivery work.</h2>
          </div>
          <div className="education-grid">
            <article className="info-card reveal">
              <h3>Universitas Diponegoro</h3>
              <p className="muted">Bachelor of Computer Science, 2021 - 2025 (GPA: 3.57/4.00)</p>
              <p>
                Focused on software engineering, databases, algorithms, and deep learning. Bachelor thesis:
                real-time CNN based face gender detection using InceptionV3 with 96.4% validation accuracy.
              </p>
            </article>
            <article className="info-card reveal">
              <h3>HMIF Learning Materials Manager</h3>
              <p className="muted">Feb 2023 - Feb 2024</p>
              <p>
                Managed academic archives and solution banks for Informatics students, improving access to
                learning documents and examination prep for hundreds of peers.
              </p>
            </article>
            <article className="info-card reveal">
              <h3>Event & Mentoring Roles</h3>
              <p className="muted">ANFORCOM, Informatics Gathering, i-Console</p>
              <p>
                Spearheaded promotion, technical documentation, logistics coordination, and senior mentorship across
                department-level technology initiatives.
              </p>
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Connect</p>
            <h2>Let us build something reliable, sharp, and scalable.</h2>
            <p>{profile.summary}</p>
          </div>
          <div className="terminal reveal" aria-label="Contact information">
            <div className="terminal-bar">
              <span aria-hidden="true">&nbsp;</span>
              <span aria-hidden="true">&nbsp;</span>
              <span aria-hidden="true">&nbsp;</span>
              <p>contact.sh</p>
            </div>
            <div className="terminal-body">
              <p>
                <span>$</span> email --to alvin
              </p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <p>
                <span>$</span> connect --social
              </p>
              <div className="terminal-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub Profile
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn Profile
                </a>
                <a href="/assets/Ahmad-Alvin-Griffin-CV.pdf" target="_blank" rel="noreferrer">
                  Download Full CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Ahmad Alvin Griffin • Bank Mandiri ODP IT Class 348</p>
        <p>Fullstack Engineer | Enterprise Systems | Cloud Computing | AI Builder</p>
      </footer>
    </>
  );
}
