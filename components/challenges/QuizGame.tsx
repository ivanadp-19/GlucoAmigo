"use client";

import { useEffect, useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/mock-data";
import { saveQuizStats } from "@/lib/challenges-storage";
import { ConfettiSuccess } from "@/components/ui/ConfettiSuccess";

const TOTAL = QUIZ_QUESTIONS.length;

function getQuizEndMessage(score: number, total: number): string {
  if (score === total) {
    return "¡Perfecto! Aprender también es parte de cuidarte.";
  }
  if (score >= 3) {
    return "¡Buen trabajo! Aprender también es parte de cuidarte.";
  }
  return "Cada intento suma. Aprender también es parte de cuidarte.";
}

export function QuizGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const question = QUIZ_QUESTIONS[currentIndex];
  const questionsAnswered = answered ? currentIndex + 1 : currentIndex;
  const progressPct = finished
    ? 100
    : Math.round((questionsAnswered / TOTAL) * 100);

  function handleAnswer(correct: boolean, label: string) {
    if (answered) return;
    setAnswered(true);
    setSelectedLabel(label);
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setMaxStreak((m) => Math.max(m, next));
        return next;
      });
      setShowConfetti(true);
      setFeedback({
        correct: true,
        explanation: question.explanation,
      });
    } else {
      setStreak(0);
      setFeedback({
        correct: false,
        explanation: question.explanation,
      });
    }
  }

  function handleNext() {
    setShowConfetti(false);
    setFeedback(null);
    setAnswered(false);
    setSelectedLabel(null);
    if (currentIndex + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setFeedback(null);
    setFinished(false);
    setAnswered(false);
    setSelectedLabel(null);
    setShowConfetti(false);
  }

  useEffect(() => {
    if (!finished) return;
    saveQuizStats({
      lastScore: score,
      lastTotal: TOTAL,
      maxStreak,
      completedAt: new Date().toISOString(),
    });
  }, [finished, score, maxStreak]);

  if (finished) {
    const pct = Math.round((score / TOTAL) * 100);
    const stars =
      score === TOTAL ? 3 : score >= 3 ? 2 : score >= 1 ? 1 : 0;

    return (
      <section className="rounded-[var(--radius-card)] border-2 border-accent/40 bg-accent-soft p-6 text-center shadow-[var(--shadow-card)]">
        <ConfettiSuccess
          show={score >= 3}
          message="¡Buen trabajo!"
          onDone={() => {}}
        />
        <p className="text-4xl" aria-hidden>
          {stars === 3 ? "🏆" : stars === 2 ? "⭐" : "🌱"}
        </p>
        <h2 className="mt-2 text-lg font-extrabold text-text">Reto completado</h2>
        <p className="mt-2 text-3xl font-extrabold text-primary">
          {score}/{TOTAL}
        </p>
        <div className="mx-auto mt-3 flex justify-center gap-1" aria-hidden>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`text-xl ${i <= stars ? "opacity-100" : "opacity-25"}`}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="mx-auto mt-3 h-2 max-w-xs overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted">
          Racha máxima: {maxStreak}{" "}
          {maxStreak === 1 ? "acierto seguido" : "aciertos seguidos"}
        </p>
        <p className="mt-4 text-sm font-medium leading-relaxed text-text">
          {getQuizEndMessage(score, TOTAL)}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-5 rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302] transition active:translate-y-0.5 active:shadow-none"
        >
          Jugar de nuevo
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-text">Reto rápido</h2>
            <p className="mt-0.5 text-[11px] font-semibold text-muted">
              Mini quiz · elige la mejor opción
            </p>
          </div>
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <span className="animate-streak-pop rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-warning">
                🔥 {streak}
              </span>
            )}
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary-dark">
              {score} pts
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-muted">
          <span>
            {questionsAnswered} de {TOTAL} respondida
            {questionsAnswered === 1 ? "" : "s"}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="mt-5 rounded-xl bg-background px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-muted">
          Pregunta {currentIndex + 1}
        </p>
        <p className="mt-3 text-base font-bold leading-snug text-text">
          {question.question}
        </p>

        <div className="mt-4 space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedLabel === opt.label;
            const showCorrect = answered && opt.correct;
            const showWrong = answered && isSelected && !opt.correct;

            return (
              <button
                key={opt.label}
                type="button"
                disabled={answered}
                onClick={() => handleAnswer(opt.correct, opt.label)}
                className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm font-semibold transition active:scale-[0.98] ${
                  showCorrect
                    ? "border-primary bg-primary-soft text-primary-dark"
                    : showWrong
                      ? "border-warning/60 bg-accent-soft text-text"
                      : answered
                        ? "border-border bg-background text-muted opacity-50"
                        : "border-border bg-background hover:border-primary hover:bg-primary-soft/50"
                }`}
              >
                <span className="font-bold">{opt.label}.</span> {opt.text}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div
            className={`animate-fade-in mt-4 rounded-xl px-4 py-3 text-sm ${
              feedback.correct
                ? "bg-primary-soft text-primary-dark"
                : "bg-secondary-soft text-text"
            }`}
          >
            <p className="font-bold">
              {feedback.correct
                ? "¡Correcto!"
                : "No te preocupes — sigue aprendiendo:"}
            </p>
            <p className="mt-1 leading-relaxed">{feedback.explanation}</p>
            <button
              type="button"
              onClick={handleNext}
              className="mt-3 w-full rounded-[var(--radius-button)] bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_3px_0_0_#46a302] active:translate-y-0.5 active:shadow-none"
            >
              {currentIndex + 1 >= TOTAL
                ? "Ver resultado"
                : "Siguiente pregunta"}
            </button>
          </div>
        )}
      </section>

      <ConfettiSuccess
        show={showConfetti}
        message="¡Correcto!"
        onDone={() => setShowConfetti(false)}
      />
    </>
  );
}
