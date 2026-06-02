"use client";

import { useState } from "react";
import type { Lesson, LessonContentBlock } from "@/lib/mock-data";
import { ConfettiSuccess } from "@/components/ui/ConfettiSuccess";

const CATEGORY_COLORS: Record<string, string> = {
  Alimentación: "bg-primary-soft border-primary/30",
  "Actividad física": "bg-secondary-soft border-secondary/30",
  Monitoreo: "bg-accent-soft border-accent/30",
  Descanso: "bg-background border-border",
  "Mitos y realidades": "bg-secondary-soft/60 border-secondary/20",
  Prevención: "bg-danger-soft border-danger/20",
};

const CATEGORY_ICONS: Record<string, string> = {
  Alimentación: "🥗",
  "Actividad física": "🏃",
  Monitoreo: "📊",
  Descanso: "😴",
  "Mitos y realidades": "💡",
  Prevención: "🛡️",
};

type LessonCardProps = {
  lesson: Lesson;
  unlocked: boolean;
  completed: boolean;
  onOpen: (lesson: Lesson) => void;
  compact?: boolean;
  isNextUp?: boolean;
};

export function LessonCard({
  lesson,
  unlocked,
  completed,
  onOpen,
  compact,
  isNextUp = false,
}: LessonCardProps) {
  const colorClass =
    CATEGORY_COLORS[lesson.category] ?? "bg-background border-border";

  const statusLabel = completed
    ? "Completada"
    : unlocked
      ? "Lista"
      : "Próxima";

  return (
    <button
      type="button"
      onClick={() => unlocked && onOpen(lesson)}
      disabled={!unlocked}
      className={`w-full rounded-[var(--radius-card)] border-2 p-4 text-left shadow-[var(--shadow-card)] transition active:scale-[0.98] ${colorClass} ${
        !unlocked ? "cursor-not-allowed opacity-60" : ""
      } ${completed ? "ring-2 ring-primary/40" : ""} ${isNextUp ? "animate-ring-pulse" : ""} ${compact ? "p-3" : ""}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl bg-surface/80 ${compact ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl"}`}
          aria-hidden
        >
          {completed ? "✅" : unlocked ? (CATEGORY_ICONS[lesson.category] ?? "📚") : "🔒"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {!compact && (
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
                {lesson.category}
              </p>
            )}
            <span className="rounded-full bg-surface/90 px-2 py-0.5 text-[10px] font-bold text-muted">
              {lesson.minutes} min
            </span>
          </div>
          <p
            className={`font-bold text-text ${compact ? "text-xs" : "mt-0.5 text-sm"}`}
          >
            {lesson.title}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-muted">{lesson.summary}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              completed
                ? "bg-primary/15 text-primary"
                : unlocked
                  ? "bg-surface/90 text-primary"
                  : "bg-background/80 text-muted"
            }`}
          >
            {statusLabel}
          </span>
          {unlocked && !completed && (
            <span className="text-xs font-bold text-primary" aria-hidden>
              →
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ContentBlock({ block }: { block: LessonContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-text">{block.text}</p>
      );
    case "bullets":
      return (
        <div className="space-y-2 rounded-xl bg-background/80 p-3">
          {block.title && (
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              {block.title}
            </p>
          )}
          <ul className="space-y-1.5">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-text"
              >
                <span className="mt-0.5 shrink-0 text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "tags":
      return (
        <div className="space-y-2">
          {block.title && (
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              {block.title}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {block.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-text"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    case "myth":
      return (
        <div className="space-y-3 rounded-[var(--radius-card)] border-2 border-border bg-background p-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-danger">Mito</p>
            <p className="mt-1 text-sm font-semibold text-text">{block.myth}</p>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-[10px] font-bold uppercase text-primary">
              Realidad
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text">
              {block.reality}
            </p>
          </div>
        </div>
      );
    case "visual":
      return (
        <div className="overflow-hidden rounded-[var(--radius-card)] border-2 border-primary/20 bg-gradient-to-br from-primary-soft to-secondary-soft p-4 text-center">
          <span className="text-4xl" aria-hidden>
            {block.emoji}
          </span>
          <p className="mt-2 text-base font-extrabold text-text">
            {block.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {block.subtitle}
          </p>
        </div>
      );
    case "tip":
      return (
        <div className="rounded-xl border-l-4 border-primary bg-primary-soft/60 px-3 py-2.5">
          <p className="text-xs font-bold text-primary">Tip</p>
          <p className="mt-0.5 text-sm leading-relaxed text-text">
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

type LessonModalProps = {
  lesson: Lesson | null;
  completed: boolean;
  onClose: () => void;
  onMarkComplete: () => void;
};

export function LessonModal({
  lesson,
  completed,
  onClose,
  onMarkComplete,
}: LessonModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  if (!lesson) return null;

  const handleComplete = () => {
    if (!completed) {
      onMarkComplete();
      setShowConfetti(true);
    } else {
      onClose();
    }
  };

  return (
    <>
      <div
        className="animate-fade-in fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="animate-slide-up max-h-[85vh] w-full max-w-[430px] overflow-y-auto rounded-[var(--radius-card)] bg-surface p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lesson-title"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold uppercase text-muted">
                  {lesson.category}
                </p>
                <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-bold text-muted">
                  ~{lesson.minutes} min
                </span>
                {completed && (
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
                    Completada
                  </span>
                )}
              </div>
              <h2
                id="lesson-title"
                className="mt-1 text-lg font-extrabold text-text"
              >
                {lesson.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-text/90">
                {lesson.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-muted hover:bg-background"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <p className="mt-4 rounded-xl bg-accent-soft/40 px-3 py-2 text-xs leading-relaxed text-muted">
            Una idea a la vez — sin culpas. Si algo no encaja contigo, coméntalo
            con tu equipo de salud.
          </p>

          <div className="mt-4 space-y-3">
            {lesson.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>

          <button
            type="button"
            onClick={handleComplete}
            className="mt-6 w-full rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302] transition active:translate-y-0.5 active:shadow-none"
          >
            {completed ? "¡Listo!" : "Marcar cápsula como completada"}
          </button>
          {!completed && (
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full py-2 text-xs font-semibold text-muted"
            >
              Cerrar sin marcar
            </button>
          )}
        </div>
      </div>
      <ConfettiSuccess
        show={showConfetti}
        message="¡Cápsula completada!"
        onDone={() => {
          setShowConfetti(false);
          onClose();
        }}
      />
    </>
  );
}

export function useLessonModal() {
  const [selected, setSelected] = useState<Lesson | null>(null);
  return {
    selected,
    open: setSelected,
    close: () => setSelected(null),
  };
}
