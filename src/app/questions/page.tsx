"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Answer {
  id: string;
  content: string;
  correct: boolean;
}

interface Question {
  id: string;
  content: string;
  answers: Answer[];
}

const shuffleArray = (array: Answer[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<{ [key: string]: Answer[] }>({});
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    if (!categoryId) {
      setError("No category selected.");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions?categoryId=${categoryId}`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        // Shuffle answers for each question
        const shuffled = data.reduce((acc: any, question: Question) => {
          acc[question.id] = shuffleArray(question.answers);
          return acc;
        }, {});

        setQuestions(data);
        setShuffledAnswers(shuffled);
        setSelectedAnswers(data.reduce((acc: any, q: Question) => ({ ...acc, [q.id]: null }), {}));
      } catch (error) {
        setError("Failed to fetch questions");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  const handleAnswerClick = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;
  if (questions.length === 0) return <p>No questions available for this category.</p>;

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question) => (
        <div key={question.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
          <h2>{question.content}</h2>
          <h3>Answers:</h3>
          <ul>
            {shuffledAnswers[question.id]?.map((answer) => {
              const isSelected = selectedAnswers[question.id] === answer.id;

              return (
                <li
                  key={answer.id}
                  style={{
                    cursor: "pointer",
                    color: isSelected ? (answer.correct ? "green" : "red") : "gray",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                  onClick={() => handleAnswerClick(question.id, answer.id)}
                >
                  {answer.content} {isSelected ? (answer.correct ? "✔️" : "❌") : ""}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionsPage;
