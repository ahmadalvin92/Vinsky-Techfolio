export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  tech: string[];
  featured: boolean;
  sort_order: number;
};

export type Experience = {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  sort_order: number;
};

export type StackItem = {
  title: string;
  description: string;
};

export type Profile = {
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
};

export type PortfolioData = {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  stack: StackItem[];
};
