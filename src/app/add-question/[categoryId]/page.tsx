"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; 
import styles from "../../styles/question.module.css";

export default function AddQuestionPage() {
  const paramsPromise = useParams(); 
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await paramsPromise;
      setCategoryId(resolvedParams.categoryId as string);
    }
    unwrapParams();
  }, [paramsPromise]);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ content: "", correct: false }]);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!categoryId) return;

    const res = await fetch("/api/questions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, question, answers }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Spurning bætt við!");
      setQuestion("");
      setAnswers([{ content: "", correct: false }]);
      setTimeout(() => router.push(`/questions?categoryId=${categoryId}`), 2000);
    } else {
      setMessage("❌ Villa: " + data.error);
    }
  }

  if (!categoryId) return <p>Hleð inn...</p>;

  return (
    <div className={styles.addQuestionContainer}>
      <div className={styles.addQuestionBox}>
        <h1>Bæta við spurningu</h1>
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit} className={styles.addQuestionForm}>
          <input
            type="text"
            placeholder="Spurning"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.addQuestionInput}
            required
          />

          <div className={styles.answerOptions}>
            {answers.map((a, i) => (
              <div key={i} className={styles.answerRow}>
                <input
                  type="text"
                  placeholder={`Svarmöguleiki ${i + 1}`}
                  value={a.content}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[i].content = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className={styles.addQuestionInput}
                  required
                />
                <input
                  type="checkbox"
                  checked={a.correct}
                  onChange={() => {
                    const newAnswers = answers.map((ans, index) =>
                      index === i ? { ...ans, correct: !ans.correct } : ans
                    );
                    setAnswers(newAnswers);
                  }}
                  className={styles.checkbox}
                />
                Rétt svar?
              </div>
            ))}
          </div>

          <button type="button" onClick={() => setAnswers([...answers, { content: "", correct: false }])} className={styles.addQuestionButton}>
            ➕ Bæta við svarmöguleika
          </button>

          <button type="submit" className={styles.addQuestionButton}>✅ Bæta við spurningu</button>
        </form>
      </div>
    </div>
  );
}
