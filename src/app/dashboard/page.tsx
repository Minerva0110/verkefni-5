"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../dashboard.module.css"; // ✅ Import the new CSS module

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
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (!session?.user) {
    return (
      <div>
        <h1>Please sign in to access the dashboard</h1>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1>Welcome, {session.user.name || "User"}!</h1>
      <p>User ID: {session.user.id}</p>

      <h2>Select a Category:</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/questions?categoryId=${category.id}`}
              className={styles.categoryBox}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      <button onClick={() => signOut()} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}
