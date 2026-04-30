import Link from "next/link";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { LoginButton } from "@/components/LoginButton";
import { getAdminEmail, isSupabaseConfigured } from "@/lib/env";
import { fallbackData } from "@/lib/fallback-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Experience, Profile, Project } from "@/lib/types";
import {
  createExperience,
  createProject,
  deleteExperience,
  deleteProject,
  updateProfile,
} from "@/app/admin/actions";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return <SetupRequired />;
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return <SetupRequired />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <AdminFrame>
        <div className="setup-card">
          <p className="eyebrow">Admin login</p>
          <h1>Masuk sebagai admin.</h1>
          <p className="hero-role">
            Dashboard ini dikunci untuk <strong>{getAdminEmail()}</strong>.
          </p>
          <LoginButton />
        </div>
      </AdminFrame>
    );
  }

  if (user.email !== getAdminEmail()) {
    return (
      <AdminFrame>
        <div className="setup-card">
          <p className="eyebrow">Access denied</p>
          <h1>Email ini belum diizinkan.</h1>
          <p className="hero-role">
            Kamu login sebagai <strong>{user.email}</strong>, sedangkan admin yang diizinkan adalah{" "}
            <strong>{getAdminEmail()}</strong>.
          </p>
          <form action="/auth/sign-out" method="post">
            <button className="button button-primary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </AdminFrame>
    );
  }

  const [profileResult, projectsResult, experiencesResult] = await Promise.all([
    supabase.from("profile").select("*").eq("id", "main").maybeSingle(),
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
  ]);

  const profile = (profileResult.data ?? fallbackData.profile) as Profile;
  const projects = (projectsResult.data ?? []) as Project[];
  const experiences = (experiencesResult.data ?? []) as Experience[];

  return (
    <AdminFrame>
      <div className="admin-shell">
        <div className="admin-header">
          <div>
            <span className="status-pill">Logged in as {user.email}</span>
            <h1>Portfolio admin</h1>
            <p className="hero-role">Tambah/update konten portfolio dari sini. Data publik akan ikut berubah.</p>
          </div>
          <div className="admin-actions">
            <Link className="button button-ghost" href="/">
              View site
            </Link>
            <form action="/auth/sign-out" method="post">
              <button className="button button-primary" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="admin-grid">
          <section className="admin-form-section">
            <form action={updateProfile} className="admin-form">
              <p className="eyebrow">Profile</p>
              <h2>Hero content</h2>
              <label>
                Name
                <input name="name" required defaultValue={profile.name} />
              </label>
              <label>
                Eyebrow
                <input name="eyebrow" required defaultValue={profile.eyebrow} />
              </label>
              <label>
                Headline
                <textarea name="headline" required defaultValue={profile.headline} />
              </label>
              <label>
                Summary
                <textarea name="summary" required defaultValue={profile.summary} />
              </label>
              <label>
                Email
                <input name="email" type="email" required defaultValue={profile.email} />
              </label>
              <label>
                GitHub
                <input name="github" type="url" required defaultValue={profile.github} />
              </label>
              <label>
                LinkedIn
                <input name="linkedin" type="url" required defaultValue={profile.linkedin} />
              </label>
              <label>
                Location
                <input name="location" required defaultValue={profile.location} />
              </label>
              <button className="button button-primary" type="submit">
                Save profile
              </button>
            </form>

            <form action={createProject} className="admin-form">
              <p className="eyebrow">Projects</p>
              <h2>Add project</h2>
              <label>
                Title
                <input name="title" required placeholder="New project title" />
              </label>
              <label>
                Category
                <input name="category" required placeholder="Fullstack / AI / Cloud" />
              </label>
              <label>
                GitHub or live URL
                <input name="href" required type="url" placeholder="https://github.com/..." />
              </label>
              <label>
                Description
                <textarea name="description" required placeholder="What did you build?" />
              </label>
              <label>
                Tech, separated by comma
                <input name="tech" required placeholder="React, Node.js, PostgreSQL" />
              </label>
              <label>
                Sort order
                <input name="sort_order" min="1" type="number" defaultValue={projects.length + 1} />
              </label>
              <label>
                <span>
                  <input name="featured" type="checkbox" /> Featured project
                </span>
              </label>
              <button className="button button-primary" type="submit">
                Add project
              </button>
            </form>

            <form action={createExperience} className="admin-form">
              <p className="eyebrow">Experience</p>
              <h2>Add experience</h2>
              <label>
                Period
                <input name="period" required placeholder="May 2026 - Present" />
              </label>
              <label>
                Role
                <input name="role" required placeholder="Fullstack Developer" />
              </label>
              <label>
                Company
                <input name="company" required placeholder="Company - City" />
              </label>
              <label>
                Description
                <textarea name="description" required placeholder="Impact, tech stack, responsibilities" />
              </label>
              <label>
                Sort order
                <input name="sort_order" min="1" type="number" defaultValue={experiences.length + 1} />
              </label>
              <button className="button button-primary" type="submit">
                Add experience
              </button>
            </form>

            <ChangePasswordForm />
          </section>

          <section className="admin-list">
            <div className="admin-card">
              <p className="eyebrow">Current projects</p>
              <h2>{projects.length || "No"} database projects</h2>
              <p className="muted">
                Kalau kosong, public site masih pakai fallback data dari CV. Setelah kamu add project pertama,
                data dari database akan tampil.
              </p>
            </div>
            {projects.map((project) => (
              <article className="admin-list-item" key={project.id}>
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
                <form action={deleteProject} className="inline-form">
                  <input name="id" type="hidden" value={project.id} />
                  <button className="button danger-button" type="submit">
                    Delete
                  </button>
                </form>
              </article>
            ))}

            <div className="admin-card">
              <p className="eyebrow">Current experiences</p>
              <h2>{experiences.length || "No"} database experiences</h2>
            </div>
            {experiences.map((experience) => (
              <article className="admin-list-item" key={experience.id}>
                <p className="eyebrow">{experience.period}</p>
                <h3>{experience.role}</h3>
                <p className="muted">{experience.company}</p>
                <p>{experience.description}</p>
                <form action={deleteExperience} className="inline-form">
                  <input name="id" type="hidden" value={experience.id} />
                  <button className="button danger-button" type="submit">
                    Delete
                  </button>
                </form>
              </article>
            ))}
          </section>
        </div>
      </div>
    </AdminFrame>
  );
}

function AdminFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-page">
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Back to portfolio">
          <span className="brand-mark">AG</span>
          <span>Ahmad Admin</span>
        </Link>
        <nav className="nav-links" aria-label="Admin navigation">
          <Link href="/">Portfolio</Link>
          <a href="/assets/Ahmad-Alvin-Griffin-CV.pdf" target="_blank" rel="noreferrer">
            CV
          </a>
        </nav>
        <Link className="icon-link" href="/">
          Site
        </Link>
      </header>
      {children}
    </main>
  );
}

function SetupRequired() {
  return (
    <AdminFrame>
      <div className="setup-card">
        <p className="eyebrow">Supabase setup required</p>
        <h1>Admin belum aktif.</h1>
        <p className="hero-role">
          Public portfolio tetap jalan dengan fallback data. Untuk menyalakan login Google dan database edit,
          isi environment variables berikut di Vercel dan lokal.
        </p>
        <pre>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
ADMIN_EMAIL=ahmadalvin92@gmail.com`}</pre>
        <p className="muted">
          Setelah itu jalankan SQL di <code>supabase/schema.sql</code> pada Supabase SQL Editor, lalu enable
          Google provider di Supabase Auth.
        </p>
      </div>
    </AdminFrame>
  );
}
