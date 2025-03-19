"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`HTTP Error: ${res.statusText}`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;
  if (categories.length === 0) return <p>No categories available.</p>;

  return (
    <div>
      <h1>Categories</h1>
      {categories.map((category) => (
        <div key={category.id} style={{ marginBottom: "20px" }}>
          <h2
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => router.push(`/questions?categoryId=${category.id}`)}
          >
            {category.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
