"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Velkomin í Vefforritunarprófið! 🌐</h1>
        <p>Þetta er verkefni byggt með Next.js</p>

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className={styles.ctas}>
          <a href="/auth/login" className={styles.primary}>🔑 Skrá Inn</a>
          <a href="/auth/register" className={styles.secondary}>📝 Nýskráning</a>
        </div>
      </main>
    </div>
  );
}
