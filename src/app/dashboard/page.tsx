"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link"; // Link component for navigation

export default function Dashboard() {
  const { data: session, status } = useSession();

  // Check if the session is loading
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If no session, inform the user to sign in
  if (!session?.user) {
    return (
      <div>
        <h1>Please sign in to access the dashboard</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {session.user.username}!</h1>
      <p>User ID: {session.user.id}</p>

      {/* Links to navigate to categories, questions */}
      <div>
        <h2>Explore the following:</h2>
        <ul>
          <li>
            <Link href="/categories">View Categories</Link>
          </li>
          <li>
            <Link href="/questions">View Questions</Link>
          </li>
        </ul>
      </div>

      <button
        onClick={() => signOut()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF4C4C",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
