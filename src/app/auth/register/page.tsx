"use client";

import React, { useState } from "react";
import styles from "../../styles/auth.module.css"; 

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, password }),
      });

      const data = await res.json();
      setMessage(res.ok ? "✅ Aðgangur stofnaður! 🎉" : data.error || "❌ Villa við stofnun aðgangs.");
    } catch (error) {
      setMessage("❌ Eitthvað fór úrskeiðis. Reyndu aftur.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h1>Nýskráning</h1>
        <p>Hér getur þú búið til nýjan aðgang.</p>

        <form onSubmit={handleRegister}>
          <input
            className={styles.registerInput}
            type="text"
            placeholder="Notandanafn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={styles.registerInput}
            type="text"
            placeholder="Display Nafn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={styles.registerInput}
            type="password"
            placeholder="Lykilorð"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.registerButton}>Stofna aðgang</button>
        </form>

        {message && <p className={`${styles.registerMessage} ${message.includes("❌") ? styles.registerError : ""}`}>{message}</p>}
      </div>
    </div>
  );
}
