"use client";

import Link from "next/link";
import {
  getDailyPhrase,
  getGlucoseStatus,
  LAST_GLUCOSE,
  MICROCOPY,
  STATUS_MESSAGES,
  USER,
  WEEKLY_SUMMARY,
} from "@/lib/mock-data";
import { useGlucoseRecords } from "@/lib/glucose-storage";
import { MotivationalCard } from "@/components/home/MotivationalCard";
import { GoalCard } from "@/components/home/GoalCard";
import { ProgressRing } from "@/components/home/ProgressRing";
import { Disclaimer } from "@/components/ui/Disclaimer";

const STATUS_STYLES = {
  success: {
    card: "border-primary/40 bg-gradient-to-br from-primary-soft to-surface",
    badge: "bg-primary text-white",
    value: "text-primary-dark",
  },
  warning: {
    card: "border-warning/30 bg-gradient-to-br from-accent-soft to-surface",
    badge: "bg-warning text-white",
    value: "text-text",
  },
  danger: {
    card: "border-danger/30 bg-gradient-to-br from-danger-soft to-surface",
    badge: "bg-danger text-white",
    value: "text-danger",
  },
};

export function HomeScreen() {
  const { latestRecord } = useGlucoseRecords();
  const glucoseValue = latestRecord?.value ?? LAST_GLUCOSE.value;
  const status = getGlucoseStatus(glucoseValue, latestRecord?.moment);
  const styles = STATUS_STYLES[status.color];
  const statusMeta = STATUS_MESSAGES[status.label];
  const message = latestRecord
    ? "Gracias por registrar. Cada dato te ayuda a cuidar mejor tu salud."
    : statusMeta.hint;

  return (
    <div className="space-y-4 pb-2">
      <header className="animate-fade-in space-y-3 pt-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-lg shadow-[0_3px_0_0_#46a302]">
              💚
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-primary">
                GlucoAmigo
              </p>
              <p className="truncate text-[11px] font-medium text-muted">
                Tu compañero de cuidado
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-secondary-soft px-2.5 py-1 text-[10px] font-bold text-secondary">
            DM {USER.diabetesType.replace("Tipo ", "T")}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-text">
            Hola, {USER.name}
          </h1>
          <p className="mt-0.5 text-sm text-muted">{MICROCOPY.todayCounts}</p>
        </div>
      </header>

      {/* 1. Estado actual */}
      <section
        className={`animate-fade-in delay-75 rounded-[var(--radius-card)] border-2 p-4 shadow-[var(--shadow-card)] ${styles.card}`}
        aria-label="Estado actual de glucosa"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
              Tu glucosa ahora
            </p>
            <p className={`mt-1 text-4xl font-extrabold tabular-nums ${styles.value}`}>
              {glucoseValue}
              <span className="ml-1 text-base font-bold text-muted">mg/dL</span>
            </p>
          </div>
          <span
            className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${styles.badge}`}
          >
            <span aria-hidden>{statusMeta.emoji}</span>
            {status.label}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text/90">{message}</p>
      </section>

      {/* 2. Motivación */}
      <div className="animate-fade-in delay-150">
        <MotivationalCard phrase={getDailyPhrase()} />
      </div>

      {/* 3. Acción principal */}
      <Link
        href="/glucosa"
        className="animate-fade-in delay-200 flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-primary px-5 py-4 text-base font-bold text-white shadow-[0_4px_0_0_#46a302] transition active:translate-y-0.5 active:shadow-none"
      >
        <span aria-hidden>📊</span>
        Registrar glucosa
      </Link>

      <div className="animate-fade-in delay-300">
        <GoalCard />
      </div>

      {/* Resumen semanal + racha */}
      <section className="animate-fade-in delay-[375ms] rounded-[var(--radius-card)] border-2 border-border bg-surface p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-text">Tu semana</h2>
          <span className="text-[11px] font-medium text-muted">
            {MICROCOPY.everyRecord}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-primary-soft px-2 py-2.5">
            <p className="text-xl font-extrabold tabular-nums text-primary-dark">
              {WEEKLY_SUMMARY.records}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold leading-tight text-muted">
              registros
            </p>
          </div>
          <div className="rounded-xl bg-secondary-soft px-2 py-2.5">
            <p className="text-xl font-extrabold tabular-nums text-secondary">
              {WEEKLY_SUMMARY.daysInRange}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold leading-tight text-muted">
              días objetivo
            </p>
          </div>
          <div className="rounded-xl bg-accent-soft px-2 py-2.5">
            <p className="text-xl font-extrabold tabular-nums text-text">
              {WEEKLY_SUMMARY.streak}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold leading-tight text-muted">
              días racha
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 rounded-xl bg-background px-3 py-4">
          <p className="text-xs font-bold text-text">Racha saludable</p>
          <p className="text-[11px] text-muted">{MICROCOPY.stepByStep}</p>
          <div className="mt-2">
            <ProgressRing streak={WEEKLY_SUMMARY.streak} />
          </div>
        </div>
      </section>

      {/* Accesos secundarios */}
      <section className="animate-fade-in delay-500" aria-label="Accesos rápidos">
        <p className="mb-2 text-xs font-bold text-muted">También puedes</p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/comida"
            className="flex min-h-[88px] flex-col rounded-[var(--radius-card)] border-2 border-border bg-secondary-soft p-3 shadow-[var(--shadow-card)] transition active:scale-[0.98]"
          >
            <span className="text-xl" aria-hidden>
              🍽️
            </span>
            <p className="mt-auto text-sm font-bold leading-tight text-text">
              ¿Qué comer?
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">
              Ideas y plato saludable
            </p>
          </Link>
          <Link
            href="/emociones"
            className="flex min-h-[88px] flex-col rounded-[var(--radius-card)] border-2 border-border bg-accent-soft p-3 shadow-[var(--shadow-card)] transition active:scale-[0.98]"
          >
            <span className="text-xl" aria-hidden>
              💚
            </span>
            <p className="mt-auto text-sm font-bold leading-tight text-text">
              Emociones
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">
              ¿Cómo te sientes hoy?
            </p>
          </Link>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
