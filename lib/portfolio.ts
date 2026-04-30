import { fallbackData } from "@/lib/fallback-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Experience, PortfolioData, Project } from "@/lib/types";

export async function getPortfolioData(): Promise<PortfolioData> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return fallbackData;
  }

  const [profileResult, projectsResult, experiencesResult] = await Promise.all([
    supabase.from("profile").select("*").maybeSingle(),
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
  ]);

  return {
    profile: profileResult.data ?? fallbackData.profile,
    projects: normalizeProjects(projectsResult.data) ?? fallbackData.projects,
    experiences: normalizeExperiences(experiencesResult.data) ?? fallbackData.experiences,
    stack: fallbackData.stack,
  };
}

function normalizeProjects(data: unknown[] | null): Project[] | null {
  if (!data?.length) {
    return null;
  }

  return data.map((item) => {
    const project = item as Project;
    return {
      ...project,
      tech: Array.isArray(project.tech) ? project.tech : [],
    };
  });
}

function normalizeExperiences(data: unknown[] | null): Experience[] | null {
  if (!data?.length) {
    return null;
  }

  return data as Experience[];
}
