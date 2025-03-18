"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect user if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError(""); 
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Villa: Vitlaus notandanafn eða lykilorð.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="login-container">
      <h1>Innskráning</h1>
      <p>Sláðu inn notendaupplýsingar þínar.</p>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show errors */}

      <form onSubmit={handleLogin}>
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

        <button type="submit">Skrá inn</button>
      </form>

      <p>
        Áttu ekki aðgang? <Link href="/auth/register">Nýskráning</Link>
      </p>
    </div>
  );
}
