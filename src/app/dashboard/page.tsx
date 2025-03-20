"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/dashboard.module.css";

interface Category {
  id: string;
  name: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (status === "loading") return <p>Hleður inn...</p>;
  if (!session?.user) {
    return <h1>Vinsamlegast skráðu þig aftur inn</h1>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1>Velkominn, {session.user.name || session.user.username || "User"}!</h1> 
    

      <h2>Veldu flokk til að læra:</h2>
      {loading ? (
        <p>Hleð inn flokkum...</p>
      ) : error ? (
        <p>{error}</p>
      ) : categories.length === 0 ? (
        <p>Engir flokkar fundust.</p>
      ) : (
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <Link key={category.id} href={`/questions?categoryId=${category.id}`} className={styles.categoryBox}>
              {category.name}
            </Link>
          ))}
        </div>
      )}

<button
  onClick={() =>
    signOut().then(() => {
      window.location.href = "/";
    })
  }
  className={styles.logoutButton}
>
  Útskrá
</button>
    </div>
  );
}

