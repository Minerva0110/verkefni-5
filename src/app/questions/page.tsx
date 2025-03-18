"use client";
import { useEffect, useState } from "react";

interface Question {
  id: string;
  content: string;
}

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions"); // Make sure this points to your correct API route
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched questions:", data); // Log the response for debugging

        // Ensure that `data` is an array before calling `.map`
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          setError("The fetched data is not an array.");
        }
      } catch (error) {
        setError("Failed to fetch questions");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (questions.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question) => (
        <div key={question.id} style={{ marginBottom: "20px" }}>
          <h2>{question.content}</h2>
        </div>
      ))}
    </div>
  );
};

export default QuestionsPage;
