"use client";

import { QuizGame } from "@/components/challenges/QuizGame";
import { FamilyChallenges } from "@/components/challenges/FamilyChallenges";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { useQuizStats } from "@/lib/challenges-storage";

function formatQuizDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "short",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function RetosScreen() {
  const { stats: lastQuiz, loaded: quizLoaded } = useQuizStats();

  return (
    <div className="space-y-6 pb-4 pt-2">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🎯
          </span>
          <h1 className="text-2xl font-extrabold text-text">Retos</h1>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          Aprende jugando con el reto rápido y construye hábitos en familia con
          acuerdos realistas de 7 días.
        </p>
      </header>

      {quizLoaded && lastQuiz && (
        <aside
          className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] border-2 border-primary/25 bg-primary-soft/50 px-4 py-3 shadow-[var(--shadow-card)]"
          aria-label="Último resultado del quiz"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary-dark">
              Tu último reto rápido
            </p>
            <p className="mt-0.5 text-lg font-extrabold text-text">
              {lastQuiz.lastScore}/{lastQuiz.lastTotal} aciertos
            </p>
            {lastQuiz.maxStreak > 0 && (
              <p className="text-xs text-muted">
                Mejor racha: {lastQuiz.maxStreak} seguidos
              </p>
            )}
          </div>
          <div className="text-right text-xs text-muted">
            <span className="text-2xl" aria-hidden>
              ⭐
            </span>
            {lastQuiz.completedAt && (
              <p className="mt-1 font-semibold">
                {formatQuizDate(lastQuiz.completedAt)}
              </p>
            )}
          </div>
        </aside>
      )}

      <QuizGame />
      <FamilyChallenges />
      <Disclaimer className="mt-2" />
    </div>
  );
}
