"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../../app/styles/auth.module.css";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      setError("❌ Villa: Vitlaust notandanafn eða lykilorð.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Innskráning</h1>
        <p>Sláðu inn notendaupplýsingar þínar.</p>

        {error && <p className={styles.loginError}>{error}</p>}

        <form onSubmit={handleLogin}>
          <label htmlFor="username">Notandanafn</label>
          <input
            id="username"
            type="text"
            placeholder="Notandanafn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.loginInput}
            required
          />

          <label htmlFor="password">Lykilorð</label>
          <input
            id="password"
            type="password"
            placeholder="Lykilorð"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.loginInput}
            required
          />

          <button type="submit" className={styles.loginButton}>
            🔑 Skrá inn
          </button>
        </form>

        <p className={styles.loginLink}>
          Áttu ekki aðgang? <Link href="../auth/register">Nýskráning</Link>
        </p>
      </div>
    </div>
  );
}
