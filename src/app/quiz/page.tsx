"use client";

import React, { useEffect, useState } from "react";

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

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quiz/${quizId}`);
        if (!res.ok) throw new Error("Quiz not found");
        const data = await res.json();
        setQuiz(data);
      } catch (error) {
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) return <p>Hleð inn prófi...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Engin próf fundust.</p>;

  const handleAnswerClick = (correct: boolean) => {
    if (correct) setScore(score + 1);
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= quiz.questions.length) {
    return <h2>Þú fékkst {score} af {quiz.questions.length} rétt! 🎉</h2>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <h2>{quiz.questions[currentIndex].content}</h2>
      {quiz.questions[currentIndex].answers.map((answer) => (
        <button key={answer.id} onClick={() => handleAnswerClick(answer.correct)}>
          {answer.content}
        </button>
      ))}
    </div>
  );
}
