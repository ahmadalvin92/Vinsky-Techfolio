"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
    <section id="projects" className="section projects-showcase-section">
      <div className="section-heading reveal">
        <div className="projects-heading-row">
          <div>
            <p className="eyebrow">Curated Engineering Portfolio</p>
            <h2>Proven software across banking, broadcasting, and AI.</h2>
          </div>
          <p className="muted projects-hint">
            💡 Click any card to inspect UI screenshots, architecture decisions, and source code.
          </p>
        </div>
      </div>

      {/* Control Bar: Categories & View Mode Switcher */}
      <div className="projects-control-bar">
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

        <div className="view-mode-toggle" aria-label="Toggle layout view">
          <button
            type="button"
            className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid Card View"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Grid</span>
          </button>
          <button
            type="button"
            className={`view-mode-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="Compact List View"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span>List</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="neat-project-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="neat-project-card"
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
              {/* Visual Thumbnail Header with aspect-ratio */}
              <div className="neat-thumb-wrapper">
                <img
                  src={project.image || "/projects/rbac-dashboard.png"}
                  alt={project.title}
                  className="neat-thumb-image"
                  loading="eager"
                />
                {project.featured && (
                  <span className="neat-featured-badge">
                    ⭐ Featured
                  </span>
                )}
                <div className="neat-thumb-hover-overlay">
                  <span className="neat-hover-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview Mockup
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="neat-card-body">
                <div className="neat-meta-tags">
                  <span className="neat-cat-badge">{project.category}</span>
                  {project.role && <span className="neat-role-badge">{project.role}</span>}
                </div>

                <h3 className="neat-card-title">{project.title}</h3>
                <p className="neat-card-desc">{project.description}</p>

                <div className="neat-tech-row">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="neat-tech-pill">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="neat-tech-pill extra">+{project.tech.length - 4}</span>
                  )}
                </div>

                <div className="neat-card-footer">
                  <span className="neat-cta-text">
                    Inspect Architecture →
                  </span>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="neat-github-btn"
                    onClick={(e) => e.stopPropagation()}
                    title="Open GitHub repository"
                    aria-label="GitHub link"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="neat-project-list">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="neat-list-item"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
            >
              <div className="neat-list-left">
                <span className="neat-list-cat">{project.category}</span>
                <h4 className="neat-list-title">{project.title}</h4>
                <p className="neat-list-desc">{project.description}</p>
                <div className="neat-list-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="neat-list-right">
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => setSelectedProject(project)}
                >
                  Preview
                </button>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-ghost"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

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
                <span className="window-title">{selectedProject.title} — Architecture & Preview</span>
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
