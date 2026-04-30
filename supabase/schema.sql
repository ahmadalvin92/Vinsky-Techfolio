create extension if not exists "pgcrypto";

create table if not exists public.profile (
  id text primary key default 'main',
  name text not null,
  eyebrow text not null,
  headline text not null,
  summary text not null,
  email text not null,
  github text not null,
  linkedin text not null,
  location text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  href text not null,
  tech text[] not null default '{}',
  featured boolean not null default false,
  sort_order integer not null default 99,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  role text not null,
  company text not null,
  description text not null,
  sort_order integer not null default 99,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;

drop policy if exists "Public can read profile" on public.profile;
drop policy if exists "Public can read projects" on public.projects;
drop policy if exists "Public can read experiences" on public.experiences;
drop policy if exists "Only Ahmad can edit profile" on public.profile;
drop policy if exists "Only Ahmad can edit projects" on public.projects;
drop policy if exists "Only Ahmad can edit experiences" on public.experiences;

create policy "Public can read profile"
on public.profile for select
to anon, authenticated
using (true);

create policy "Public can read projects"
on public.projects for select
to anon, authenticated
using (true);

create policy "Public can read experiences"
on public.experiences for select
to anon, authenticated
using (true);

create policy "Only Ahmad can edit profile"
on public.profile for all
to authenticated
using ((auth.jwt() ->> 'email') = 'ahmadalvin92@gmail.com')
with check ((auth.jwt() ->> 'email') = 'ahmadalvin92@gmail.com');

create policy "Only Ahmad can edit projects"
on public.projects for all
to authenticated
using ((auth.jwt() ->> 'email') = 'ahmadalvin92@gmail.com')
with check ((auth.jwt() ->> 'email') = 'ahmadalvin92@gmail.com');

create policy "Only Ahmad can edit experiences"
on public.experiences for all
to authenticated
using ((auth.jwt() ->> 'email') = 'ahmadalvin92@gmail.com')
with check ((auth.jwt() ->> 'email') = 'ahmadalvin92@gmail.com');

insert into public.profile (id, name, eyebrow, headline, summary, email, github, linkedin, location)
values (
  'main',
  'Ahmad Alvin Griffin',
  'Jakarta based builder / Computer Vision / Fullstack',
  'I build production-ready web systems and AI-powered products with clean architecture, fast APIs, and reliable cloud delivery.',
  'Computer Science graduate from Universitas Diponegoro focused on Machine Learning, Computer Vision, Full-Stack Web Development, and cloud deployment.',
  'ahmadalvin92@gmail.com',
  'https://github.com/ahmadalvin92',
  'https://linkedin.com/in/ahmad-alvin-griffin',
  'Jakarta, Indonesia'
)
on conflict (id) do update set
  name = excluded.name,
  eyebrow = excluded.eyebrow,
  headline = excluded.headline,
  summary = excluded.summary,
  email = excluded.email,
  github = excluded.github,
  linkedin = excluded.linkedin,
  location = excluded.location,
  updated_at = now();

insert into public.projects (title, category, description, href, tech, featured, sort_order)
values
  (
    'Real-time Face Gender Detection',
    'Computer Vision',
    'End-to-end CNN system using InceptionV3, MediaPipe, OpenCV, and ONNX Runtime for efficient real-time inference.',
    'https://github.com/ahmadalvin92/real-time-face-gender-detection-cnn-inceptionv3',
    array['TensorFlow', 'ONNX', 'OpenCV', 'MediaPipe'],
    true,
    1
  ),
  (
    'IT Support Ticket System',
    'Fullstack',
    'Centralized ticket workflow with dashboards, activity tracking, JWT auth, Admin/User roles, and structured issue resolution.',
    'https://github.com/ahmadalvin92/IT-Support-Ticket-System-Radio-Elshinta',
    array['React', 'Express', 'PostgreSQL'],
    false,
    2
  ),
  (
    'Radio Elshinta Jobdesk',
    'Laravel',
    'Operational web application for internal jobdesk tracking, built to support office workflows and clearer accountability.',
    'https://github.com/ahmadalvin92/radio-elshinta-jobdesk',
    array['PHP', 'Laravel', 'MySQL'],
    false,
    3
  ),
  (
    'Stunting ML Inference API',
    'Cloud API',
    'Containerized API for ML inference, deployed through the Bangkit capstone workflow with cloud storage and API delivery.',
    'https://github.com/ahmadalvin92/API-Stunting-Express-JS',
    array['Node.js', 'Docker', 'Cloud Run'],
    false,
    4
  )
on conflict do nothing;

insert into public.experiences (period, role, company, description, sort_order)
values
  (
    'Dec 2025 - Present',
    'Fullstack Web Developer | IT Support Experience',
    'PT Radio Elshinta - Jakarta, Indonesia',
    'Developed an internal IT support ticketing system with React, Node.js, Express, PostgreSQL, Prisma, JWT authentication, and role based workflows.',
    1
  ),
  (
    'Jan 2024 - Feb 2024',
    'Software Engineer Intern',
    'PT Angkasa Pura II - Tangerang, Indonesia',
    'Built preventive maintenance and IT device monitoring platforms with Laravel, MySQL, LDAP, PDF exports, digital signatures, and structured reporting.',
    2
  ),
  (
    'Feb 2024 - Jul 2024',
    'Cloud Computing Cohort',
    'Bangkit Academy 2024 - Remote',
    'Shipped a cloud ML inference API using Google Cloud Run, Cloud Storage, API Gateway, Docker, monitoring, and collaborative ML/mobile delivery.',
    3
  )
on conflict do nothing;
