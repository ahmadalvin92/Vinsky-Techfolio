"use server";

import { revalidatePath } from "next/cache";
import { getAdminEmail } from "@/lib/env";
import { fallbackData } from "@/lib/fallback-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== getAdminEmail()) {
    throw new Error("You are not allowed to edit this portfolio.");
  }

  return supabase;
}

export async function updateProfile(formData: FormData) {
  const supabase = await requireAdmin();

  const payload = {
    id: "main",
    name: String(formData.get("name") ?? fallbackData.profile.name),
    eyebrow: String(formData.get("eyebrow") ?? fallbackData.profile.eyebrow),
    headline: String(formData.get("headline") ?? fallbackData.profile.headline),
    summary: String(formData.get("summary") ?? fallbackData.profile.summary),
    email: String(formData.get("email") ?? fallbackData.profile.email),
    github: String(formData.get("github") ?? fallbackData.profile.github),
    linkedin: String(formData.get("linkedin") ?? fallbackData.profile.linkedin),
    location: String(formData.get("location") ?? fallbackData.profile.location),
  };

  const { error } = await supabase.from("profile").upsert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createProject(formData: FormData) {
  const supabase = await requireAdmin();
  const tech = String(formData.get("tech") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const { error } = await supabase.from("projects").insert({
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    description: String(formData.get("description") ?? ""),
    href: String(formData.get("href") ?? ""),
    tech,
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 99),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createExperience(formData: FormData) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("experiences").insert({
    period: String(formData.get("period") ?? ""),
    role: String(formData.get("role") ?? ""),
    company: String(formData.get("company") ?? ""),
    description: String(formData.get("description") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 99),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteExperience(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { error } = await supabase.from("experiences").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
