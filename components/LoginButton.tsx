"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const ADMIN_USERNAME = "ahmadalvin92";
const ADMIN_EMAIL = "ahmadalvin92@gmail.com";

export function LoginButton() {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (username.trim().toLowerCase() !== ADMIN_USERNAME) {
      setError("Username tidak terdaftar sebagai admin.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (currentError) {
      setError(currentError instanceof Error ? currentError.message : "Login failed.");
      setLoading(false);
    }
  }

  return (
    <form className="auth-box" onSubmit={signIn}>
      <label>
        Username
        <input
          autoComplete="username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          required
          value={username}
        />
      </label>
      <label>
        Password
        <input
          autoComplete="current-password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </label>
      <button className="button button-primary" disabled={loading} type="submit">
        {loading ? "Checking..." : "Masuk"}
      </button>
      {error ? <p className="muted">{error}</p> : null}
    </form>
  );
}
