"use client";

import { useMemo, useState } from "react";
import {
  FAMILY_CHALLENGES,
  type DailyQuestionKind,
  type FamilyChallenge,
} from "@/lib/mock-data";
import {
  type ChallengeProgress,
  computeFamilyChallengeSummary,
  useChallengeProgress,
} from "@/lib/challenges-storage";
import { ConfettiSuccess } from "@/components/ui/ConfettiSuccess";

const DAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];

type PendingCheckIn = {
  challengeId: string;
  dayIndex: number;
};

function getSuccessMessage(challenge: FamilyChallenge): string {
  switch (challenge.id) {
    case "caminata":
      return "¡Qué bien! Moverse en familia también suma.";
    case "sin-pantallas":
      return "¡Lo hiciste muy bien! Comer sin distracciones ayuda a todos.";
    case "porcion":
      return "¡Vas muy bien! La pausa te ayuda a escuchar a tu cuerpo.";
    default:
      return "¡Buen día! Cada punto cuenta.";
  }
}

function getRetryMessage(challenge: FamilyChallenge): string {
  switch (challenge.id) {
    case "caminata":
      return "Está bien. Mañana es otra oportunidad para caminar juntos.";
    case "sin-pantallas":
      return "No pasa nada. La próxima comida sin pantallas será una nueva oportunidad.";
    case "porcion":
      return "Está bien. La próxima pausa de 10 minutos será una nueva oportunidad.";
    default:
      return "No pasa nada. Mañana puedes intentarlo de nuevo.";
  }
}

function isCheckInSuccess(
  kind: DailyQuestionKind | undefined,
  answerYes: boolean,
): boolean {
  if (kind === "no-success") return !answerYes;
  return answerYes;
}

function isInverseCheckIn(challenge: FamilyChallenge): boolean {
  return challenge.dailyQuestionKind === "no-success";
}

function FamilySummaryCard({
  summary,
}: {
  summary: ReturnType<typeof computeFamilyChallengeSummary>;
}) {
  const weeklyPct = Math.round(
    (summary.totalDaysMarked / summary.totalDaySlots) * 100,
  );

  return (
    <div className="rounded-[var(--radius-card)] border-2 border-primary/30 bg-gradient-to-br from-primary-soft/80 to-secondary-soft/40 p-4 shadow-[var(--shadow-card)]">
      <h2 className="text-sm font-extrabold text-text">Resumen de la semana</h2>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-surface/80 px-2 py-2.5">
          <p className="text-xl font-extrabold text-primary-dark">
            {summary.activeCount}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold leading-tight text-muted">
            Retos en curso
          </p>
        </div>
        <div className="rounded-xl bg-surface/80 px-2 py-2.5">
          <p className="text-xl font-extrabold text-primary-dark">
            {summary.goalsReached}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold leading-tight text-muted">
            Metas logradas
          </p>
        </div>
        <div className="rounded-xl bg-surface/80 px-2 py-2.5">
          <p className="text-xl font-extrabold text-primary-dark">
            {summary.totalDaysMarked}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold leading-tight text-muted">
            Días marcados
          </p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] font-semibold text-muted">
          <span>Progreso semanal en familia</span>
          <span>{weeklyPct}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${weeklyPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({
  challenge,
  completedDays,
  onToggleDay,
  onRequestCheckIn,
}: {
  challenge: FamilyChallenge;
  completedDays: boolean[];
  onToggleDay: (challengeId: string, dayIndex: number) => void;
  onRequestCheckIn: (challengeId: string, dayIndex: number) => void;
}) {
  const completed = completedDays.filter(Boolean).length;
  const goalReached = completed >= challenge.goalDays;
  const progressPct = Math.min(
    100,
    Math.round((completed / challenge.goalDays) * 100),
  );
  const inverse = isInverseCheckIn(challenge);

  function handleDayTap(dayIndex: number) {
    if (completedDays[dayIndex]) {
      onToggleDay(challenge.id, dayIndex);
      return;
    }
    if (challenge.dailyQuestion) {
      onRequestCheckIn(challenge.id, dayIndex);
    } else {
      onToggleDay(challenge.id, dayIndex);
    }
  }

  return (
    <article
      className={`rounded-[var(--radius-card)] border-2 p-5 shadow-[var(--shadow-card)] transition ${
        goalReached
          ? "border-primary bg-primary-soft/30"
          : "border-border bg-surface"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          {challenge.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-extrabold text-text">{challenge.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-text">Objetivo: </span>
            {challenge.objective}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-secondary">
            <span className="font-semibold">Qué hacer: </span>
            {challenge.action}
          </p>
          {inverse && challenge.dailyQuestion && (
            <p className="mt-2 rounded-lg bg-secondary-soft/60 px-2.5 py-2 text-[11px] leading-relaxed text-text">
              <span className="font-bold">Cómo marcar el día: </span>
              al responder la pregunta diaria, elige{" "}
              <span className="font-bold text-primary-dark">No</span> cuando
              cumpliste el acuerdo (sin pantallas o sin repetir porción).
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-muted">Meta: {challenge.goalLabel}</span>
          <span className={goalReached ? "text-primary-dark" : "text-text"}>
            {completed}/{challenge.goalDays}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              goalReached ? "bg-primary" : "bg-secondary"
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">
        Progreso de 7 días
      </p>
      <div className="mt-2 flex justify-between gap-1">
        {completedDays.map((done, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleDayTap(i)}
            className={`flex h-10 w-10 flex-col items-center justify-center rounded-xl text-[10px] font-bold transition active:scale-95 ${
              done
                ? "bg-primary text-white shadow-[0_2px_0_0_#46a302]"
                : "border-2 border-border bg-background text-muted hover:border-primary hover:text-primary-dark"
            }`}
            aria-label={`Día ${DAY_LABELS[i]} ${done ? "completado" : "pendiente"}`}
          >
            {DAY_LABELS[i]}
            {done && <span className="text-[9px]">✓</span>}
          </button>
        ))}
      </div>

      {goalReached ? (
        <p className="animate-fade-in mt-4 rounded-xl bg-primary-soft px-3 py-2 text-xs font-bold leading-relaxed text-primary-dark">
          ¡Lo lograste! Los hábitos saludables también se construyen en familia.
        </p>
      ) : (
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Si un día no se logra, no pasa nada: mañana puedes intentarlo de nuevo.
          Puedes marcar o desmarcar días cuando quieras.
        </p>
      )}
    </article>
  );
}

export function FamilyChallenges() {
  const { progress, setProgress, loaded } = useChallengeProgress();
  const summary = useMemo(
    () => computeFamilyChallengeSummary(progress),
    [progress],
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState("¡Meta cumplida!");
  const [pendingCheckIn, setPendingCheckIn] = useState<PendingCheckIn | null>(
    null,
  );
  const [checkInFeedback, setCheckInFeedback] = useState<string | null>(null);

  function persist(next: ChallengeProgress) {
    setProgress(next);
  }

  function celebrate(message: string) {
    setConfettiMessage(message);
    setShowConfetti(true);
  }

  function toggleDay(challengeId: string, dayIndex: number, markComplete: boolean) {
    const challenge = FAMILY_CHALLENGES.find((c) => c.id === challengeId);
    if (!challenge) return;

    const prevDays = progress[challengeId] ?? Array(7).fill(false);
    const wasGoalReached =
      prevDays.filter(Boolean).length >= challenge.goalDays;

    const newDays = [...prevDays];
    newDays[dayIndex] = markComplete;

    const nowComplete =
      newDays.filter(Boolean).length >= challenge.goalDays;

    persist({ ...progress, [challengeId]: newDays });

    if (markComplete && !wasGoalReached && nowComplete) {
      celebrate("¡Meta cumplida!");
    } else if (markComplete) {
      celebrate(getSuccessMessage(challenge));
    }
  }

  function handleToggleDay(challengeId: string, dayIndex: number) {
    const prevDays = progress[challengeId] ?? Array(7).fill(false);
    toggleDay(challengeId, dayIndex, !prevDays[dayIndex]);
  }

  function handleCheckInAnswer(answerYes: boolean) {
    if (!pendingCheckIn) return;
    const challenge = FAMILY_CHALLENGES.find(
      (c) => c.id === pendingCheckIn.challengeId,
    );
    if (!challenge) return;

    const success = isCheckInSuccess(challenge.dailyQuestionKind, answerYes);

    if (success) {
      toggleDay(pendingCheckIn.challengeId, pendingCheckIn.dayIndex, true);
      setCheckInFeedback(getSuccessMessage(challenge));
    } else {
      setCheckInFeedback(getRetryMessage(challenge));
    }

    setPendingCheckIn(null);
  }

  const activeCheckInChallenge = pendingCheckIn
    ? FAMILY_CHALLENGES.find((c) => c.id === pendingCheckIn.challengeId)
    : null;
  const inverseModal = activeCheckInChallenge
    ? isInverseCheckIn(activeCheckInChallenge)
    : false;

  if (!loaded) {
    return (
      <section className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-5 shadow-[var(--shadow-card)]">
        <p className="text-sm text-muted">Cargando retos familiares…</p>
      </section>
    );
  }

  return (
    <>
      <section className="space-y-4">
        <FamilySummaryCard summary={summary} />

        <div className="rounded-[var(--radius-card)] border-2 border-secondary/30 bg-secondary-soft/40 p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-base font-extrabold text-text">
            Elige un acuerdo familiar para esta semana
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Selecciona retos que tu familia pueda cumplir de manera realista durante
            los próximos 7 días. Lo importante es una acción pequeña que mejore el
            ambiente en casa y apoye tus hábitos saludables.
          </p>
        </div>

        {FAMILY_CHALLENGES.map((c) => (
          <ChallengeCard
            key={c.id}
            challenge={c}
            completedDays={progress[c.id] ?? Array(7).fill(false)}
            onToggleDay={handleToggleDay}
            onRequestCheckIn={(id, day) => {
              setCheckInFeedback(null);
              setPendingCheckIn({ challengeId: id, dayIndex: day });
            }}
          />
        ))}
      </section>

      {pendingCheckIn && activeCheckInChallenge?.dailyQuestion && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/30 p-4 sm:items-center">
          <div
            className="animate-slide-up w-full max-w-md rounded-[var(--radius-card)] border-2 border-border bg-surface p-5 shadow-lg"
            role="dialog"
            aria-labelledby="checkin-title"
          >
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              Día {DAY_LABELS[pendingCheckIn.dayIndex]}
            </p>
            <p
              id="checkin-title"
              className="mt-2 text-sm font-bold leading-snug text-text"
            >
              {activeCheckInChallenge.dailyQuestion}
            </p>
            {inverseModal ? (
              <p className="mt-2 rounded-lg bg-primary-soft/60 px-3 py-2 text-xs leading-relaxed text-primary-dark">
                En este reto, <span className="font-bold">No</span> significa que
                sí cumpliste (por ejemplo: comieron sin pantallas o no repetiste
                porción).
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted">
                Responde con honestidad — sin culpa si hoy no se logró.
              </p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleCheckInAnswer(true)}
                className={`rounded-[var(--radius-button)] border-2 py-3 text-sm font-bold active:scale-[0.98] ${
                  inverseModal
                    ? "border-border bg-background text-text"
                    : "border-primary bg-primary-soft text-primary-dark"
                }`}
              >
                Sí
                {!inverseModal && (
                  <span className="mt-0.5 block text-[10px] font-semibold opacity-80">
                    Sí lo logré
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleCheckInAnswer(false)}
                className={`rounded-[var(--radius-button)] border-2 py-3 text-sm font-bold active:scale-[0.98] ${
                  inverseModal
                    ? "border-primary bg-primary text-white shadow-[0_3px_0_0_#46a302]"
                    : "border-border bg-background text-text"
                }`}
              >
                No
                {inverseModal && (
                  <span className="mt-0.5 block text-[10px] font-semibold opacity-90">
                    Cumplí el acuerdo
                  </span>
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setPendingCheckIn(null)}
              className="mt-3 w-full py-2 text-xs font-semibold text-muted"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {checkInFeedback && !pendingCheckIn && (
        <div className="animate-fade-in fixed bottom-24 left-4 right-4 z-30 mx-auto max-w-md rounded-xl border-2 border-primary/30 bg-surface px-4 py-3 shadow-lg">
          <p className="text-sm font-medium text-text">{checkInFeedback}</p>
          <button
            type="button"
            onClick={() => setCheckInFeedback(null)}
            className="mt-2 text-xs font-bold text-primary"
          >
            Entendido
          </button>
        </div>
      )}

      <ConfettiSuccess
        show={showConfetti}
        message={confettiMessage}
        onDone={() => setShowConfetti(false)}
      />
    </>
  );
}
