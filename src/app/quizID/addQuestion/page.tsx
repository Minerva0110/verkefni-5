"use client";
import React from "react";
import { useState } from "react";

export default function AddQuestionPage({ params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ text: "", correct: false }]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/questions/add", {
      method: "POST",
      body: JSON.stringify({ quizId, question, answers }),
      headers: { "Content-Type": "application/json" },
    });
    setQuestion("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      {answers.map((a, i) => (
        <input key={i} type="text" placeholder={`Answer ${i + 1}`} value={a.text} onChange={(e) => {
          const newAnswers = [...answers];
          newAnswers[i].text = e.target.value;
          setAnswers(newAnswers);
        }} />
      ))}
      <button type="submit">Add Question</button>
    </form>
  );
}
