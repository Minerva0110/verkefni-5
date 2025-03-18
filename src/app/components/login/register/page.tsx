"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Skráning mistókst.");

      setSuccess("Aðgangur búinn til! Þú verður fljótlega vísað áfram.");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (error: any) {
      setError(error.message || "Villa kom upp.");
    }
  }

  return (
    <div>
      <h1>Nýskráning</h1>
      <p>Hér getur þú búið til nýjan aðgang.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleRegister}>
        <label htmlFor="username">Notandanafn</label>
        <input
          id="username"
          type="text"
          placeholder="Notandanafn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Lykilorð</label>
        <input
          id="password"
          type="password"
          placeholder="Lykilorð"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Stofna aðgang</button>
      </form>
    </div>
  );
}
