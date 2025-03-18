"use client";
import { useEffect, useState } from "react";

type Answer = {
  id: string;
  answer: string;
  correct: boolean;
};

type Question = {
  id: string;
  question: string;
  answers: Answer[];
};

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`/api/questions?quizId=${quizId}`)
      .then((res) => res.json())
      .then((data: Question[]) => setQuestions(data));
  }, [quizId]);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const handleAnswerClick = (correct: boolean) => {
    if (correct) setScore(score + 1);
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= questions.length) {
    return <h2>You scored {score} / {questions.length} 🎉</h2>;
  }

  return (
    <div>
      <h2>{questions[currentIndex].question}</h2>
      {questions[currentIndex].answers.map((answer) => (
        <button key={answer.id} onClick={() => handleAnswerClick(answer.correct)}>
          {answer.answer}
        </button>
      ))}
    </div>
  );
}
