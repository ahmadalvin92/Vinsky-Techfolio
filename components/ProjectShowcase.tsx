"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Fullstack", "Enterprise", "AI & Realtime", "Cloud"];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Fullstack") {
      return (
        project.category.toLowerCase().includes("fullstack") ||
        project.category.toLowerCase().includes("operations")
      );
    }
    if (activeCategory === "Enterprise") {
      return (
        project.category.toLowerCase().includes("enterprise") ||
        project.category.toLowerCase().includes("security") ||
        project.category.toLowerCase().includes("web portal")
      );
    }
    if (activeCategory === "AI & Realtime") {
      return (
        project.category.toLowerCase().includes("ai") ||
        project.category.toLowerCase().includes("vision") ||
        project.category.toLowerCase().includes("realtime")
      );
    }
    if (activeCategory === "Cloud") {
      return (
        project.category.toLowerCase().includes("cloud") ||
        project.category.toLowerCase().includes("cross-platform")
      );
    }
    return true;
  });

  return (
    <section id="projects" className="section">
      <div className="section-heading reveal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="eyebrow">Interactive Portfolio</p>
            <h2>Proven software across banking, broadcasting, and AI.</h2>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: "14px" }}>
            💡 Click any project card to inspect screenshots, architecture, and live links.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="category-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="project-grid">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className={`project-card interactive-card ${project.featured ? "featured" : ""}`}
            onClick={() => setSelectedProject(project)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${project.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
          >
            {/* Visual Preview Header */}
            {project.image && (
              <div className="project-thumb-frame">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-thumb-img"
                  loading="lazy"
                />
                <div className="project-thumb-overlay">
                  <span className="preview-cta">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Inspect Project
                  </span>
                </div>
              </div>
            )}

            <div className="project-content">
              <div className="project-meta">
                <span className="category-tag">{project.category}</span>
                {project.role && <span className="role-tag">{project.role}</span>}
              </div>

              <h3>{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="tech-list">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="card-footer-action">
                <span className="action-hint">
                  Details & Mockup →
                </span>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card-github-icon"
                  onClick={(e) => e.stopPropagation()}
                  title="Open GitHub repository"
                  aria-label="GitHub link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-shell"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="modal-top-bar">
              <div className="browser-dots">
                <span className="dot dot-red" />
                <span className="dot dot-amber" />
                <span className="dot dot-green" />
                <span className="window-title">{selectedProject.title} — Preview</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body-scroll">
              {/* Project Screenshot / Mockup Preview */}
              {selectedProject.image && (
                <div className="modal-browser-viewport">
                  <div className="browser-address-bar">
                    <span className="lock-icon">🔒</span>
                    <span className="address-text">
                      https://github.com/ahmadalvin92/{selectedProject.id}
                    </span>
                    <span className="badge-live">VERIFIED ARTIFACT</span>
                  </div>
                  <div className="modal-img-container">
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} interface`}
                      className="modal-preview-image"
                    />
                  </div>
                </div>
              )}

              {/* Project Details */}
              <div className="modal-content-grid">
                <div>
                  <div className="modal-tags">
                    <span className="category-tag">{selectedProject.category}</span>
                    {selectedProject.role && <span className="role-tag">{selectedProject.role}</span>}
                  </div>
                  <h2 id="modal-title" className="modal-heading">
                    {selectedProject.title}
                  </h2>
                  <p className="modal-description">{selectedProject.description}</p>
                </div>

                {/* Key Architectural Highlights */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div className="modal-highlights">
                    <h4>Key Architecture & Features</h4>
                    <ul>
                      {selectedProject.highlights.map((item, idx) => (
                        <li key={idx}>
                          <span className="check-icon">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="modal-tech-stack">
                  <h4>Technologies Used</h4>
                  <div className="tech-list">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="tech-pill-large">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="modal-actions-footer">
                  <a
                    href={selectedProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-primary"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Explore on GitHub
                  </a>
                  {selectedProject.demoUrl && selectedProject.demoUrl !== selectedProject.href && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-ghost"
                    >
                      Live Demo / Client ↗
                    </a>
                  )}
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
