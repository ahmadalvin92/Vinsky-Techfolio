export function getSupabaseEnv() {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);

  return {
    url,
    anonKey:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseEnv();
  return Boolean(url && anonKey);
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? "ahmadalvin92@gmail.com";
}

function normalizeSupabaseUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return value;
  }
}
