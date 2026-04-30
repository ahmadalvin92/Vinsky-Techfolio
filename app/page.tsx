import { MeshBackground } from "@/components/MeshBackground";
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
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="icon-link" href="/admin" aria-label="Open admin dashboard">
          Admin
        </a>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy reveal">
            <p className="eyebrow">{profile.eyebrow}</p>
            <h1>{profile.name}</h1>
            <p className="hero-role">{profile.headline}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View work
              </a>
              <a className="button button-ghost" href={`mailto:${profile.email}`}>
                Start a conversation
              </a>
            </div>
          </div>

          <aside className="hero-panel reveal" aria-label="Profile snapshot">
            <div className="portrait-shell">
              <img src="/assets/avatar.jpg" alt="Ahmad Alvin Griffin" />
            </div>
            <div className="signal-grid">
              <div>
                <span>46</span>
                <p>Public repos</p>
              </div>
              <div>
                <span>96.4%</span>
                <p>CNN validation accuracy</p>
              </div>
              <div>
                <span>3.57</span>
                <p>GPA / 4.00</p>
              </div>
              <div>
                <span>2024</span>
                <p>Bangkit Cloud cohort</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="ticker" aria-label="Core capabilities">
          <div>
            <span>React</span>
            <span>Node.js</span>
            <span>Laravel</span>
            <span>PostgreSQL</span>
            <span>Google Cloud Run</span>
            <span>TensorFlow</span>
            <span>OpenCV</span>
            <span>Docker</span>
          </div>
        </section>

        <section id="work" className="section split">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience</p>
            <h2>Systems that keep teams moving.</h2>
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

        <section id="projects" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected projects</p>
            <h2>Practical software, from internal tools to real-time AI.</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card reveal ${project.featured ? "featured" : ""}`} key={project.id}>
                <div>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Stack</p>
            <h2>Comfortable across product layers.</h2>
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

        <section className="section education">
          <div className="section-heading reveal">
            <p className="eyebrow">Education & leadership</p>
            <h2>Built through research, campus leadership, and delivery work.</h2>
          </div>
          <div className="education-grid">
            <article className="info-card reveal">
              <h3>Universitas Diponegoro</h3>
              <p className="muted">Bachelor of Computer Science, 2021 - 2025</p>
              <p>
                Focused on software engineering, databases, algorithms, and machine learning. Thesis:
                real-time CNN based gender detection using InceptionV3.
              </p>
            </article>
            <article className="info-card reveal">
              <h3>HMIF Learning Materials Manager</h3>
              <p className="muted">Feb 2023 - Feb 2024</p>
              <p>
                Managed academic archives and solution banks for Informatics students, improving access to
                learning documents for hundreds of students.
              </p>
            </article>
            <article className="info-card reveal">
              <h3>Event & mentoring roles</h3>
              <p className="muted">ANFORCOM, Informatics Gathering, i-Console</p>
              <p>
                Supported promotion, documentation, logistics, mentoring, and operations across department-level
                programs.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let us build something reliable, useful, and sharp.</h2>
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
                <span>$</span> email --to ahmad
              </p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <p>
                <span>$</span> connect --social
              </p>
              <div className="terminal-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href="/assets/Ahmad-Alvin-Griffin-CV.pdf" target="_blank" rel="noreferrer">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>(c) 2026 Ahmad Alvin Griffin</p>
        <p>Fullstack Web Developer | Computer Vision Builder | Cloud Computing Cohort</p>
      </footer>
    </>
  );
}
