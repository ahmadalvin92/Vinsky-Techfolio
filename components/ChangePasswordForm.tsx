"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (password.length < 8) {
      setMessage("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password belum sama.");
      return;
    }

    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    setMessage(error ? error.message : "Password berhasil diganti.");

    if (!error) {
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <form className="admin-form" onSubmit={updatePassword}>
      <p className="eyebrow">Security</p>
      <h2>Change password</h2>
      <label>
        New password
        <input
          autoComplete="new-password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </label>
      <label>
        Confirm new password
        <input
          autoComplete="new-password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          type="password"
          value={confirmPassword}
        />
      </label>
      <button className="button button-primary" disabled={loading} type="submit">
        {loading ? "Saving..." : "Save password"}
      </button>
      {message ? <p className="muted">{message}</p> : null}
    </form>
  );
}
