"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "../styles/question.module.css"; 

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

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
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

        const shuffledQuestions = data.map((q: Question) => ({
          ...q,
          answers: q.answers.sort(() => Math.random() - 0.5),
        }));

        setQuestions(shuffledQuestions);
        setSelectedAnswers(data.reduce((acc: { [key: string]: string | null }, q: Question) => ({ ...acc, [q.id]: null }), {}));
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

  if (loading) return <p className={styles.loading}>Hleð inn spurningum...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (questions.length === 0) return <p className={styles.noQuestions}>Engar spurningar í þessum flokki.</p>;

  return (
    <div className={styles.container}>
      <h1>Spurningar</h1>

   <Link href={`/add-question/${categoryId}`}>
  <button className={styles.addQuestionButton}>➕ Bæta við spurningu</button>
</Link>

  
      <div className={styles.questionList}>
        {questions.map((question) => (
          <div key={question.id} className={styles.questionCard}>
            <h2>{question.content}</h2>
            <div className={styles.answers}>
              {question.answers.map((answer) => {
                const isSelected = selectedAnswers[question.id] === answer.id;
                return (
                  <button
                    key={answer.id}
                    className={`${styles.answerButton} ${isSelected ? (answer.correct ? styles.correct : styles.wrong) : ""}`}
                    onClick={() => handleAnswerClick(question.id, answer.id)}
                  >
                    {answer.content}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
