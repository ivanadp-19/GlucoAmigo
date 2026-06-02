"use client";

import { useMemo, useState } from "react";
import {
  LESSON_CATEGORIES,
  LESSONS,
  getLessonsByCategory,
  type LessonCategory,
} from "@/lib/mock-data";
import {
  isLessonCompleted,
  isLessonUnlocked,
  useLessonProgress,
} from "@/lib/lesson-storage";
import {
  LessonCard,
  LessonModal,
  useLessonModal,
} from "@/components/learn/LessonCard";
import { GoalsSection } from "@/components/learn/GoalsSection";
import { Disclaimer } from "@/components/ui/Disclaimer";

type CategoryFilter = LessonCategory | "all";

export function LearningScreen() {
  const { selected, open, close } = useLessonModal();
  const { progress, markCompleted, loaded } = useLessonProgress();
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const completedIds = progress.completedIds;
  const completedCount = completedIds.length;
  const totalCount = LESSONS.length;
  const progressPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categoriesToShow = useMemo(() => {
    if (filter === "all") return LESSON_CATEGORIES;
    return LESSON_CATEGORIES.filter((c) => c.id === filter);
  }, [filter]);

  const selectedCompleted = selected
    ? isLessonCompleted(selected.id, completedIds)
    : false;

  return (
    <div className="space-y-6 pb-2 pt-2">
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-text">Aprende</h1>
            <p className="mt-1 text-sm text-muted">
              Cápsulas cortas para cuidar tu salud, a tu ritmo.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-primary-soft px-3 py-2 text-center">
            <p className="text-[10px] font-bold uppercase text-primary">
              Tu avance
            </p>
            <p className="text-lg font-extrabold text-text">
              {loaded ? completedCount : "—"}/{totalCount}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted">
            <span>Cápsulas completadas</span>
            <span>{loaded ? `${progressPct}%` : "…"}</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-background"
            role="progressbar"
            aria-valuenow={loaded ? progressPct : 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de cápsulas"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: loaded ? `${progressPct}%` : "0%" }}
            />
          </div>
        </div>

        <p className="rounded-xl bg-accent-soft/50 px-3 py-2 text-xs leading-relaxed text-muted">
          Toca una cápsula disponible (~2 min). Al completarla, se desbloquea la
          siguiente de esa categoría. Las marcadas con 🔒 son tu próximo paso.
        </p>

        <div
          className="-mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          role="tablist"
          aria-label="Filtrar por categoría"
        >
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Todas"
            icon="✨"
          />
          {LESSON_CATEGORIES.map((category) => {
            const lessons = getLessonsByCategory(category.id);
            const done = lessons.filter((l) =>
              isLessonCompleted(l.id, completedIds),
            ).length;
            return (
              <FilterChip
                key={category.id}
                active={filter === category.id}
                onClick={() => setFilter(category.id)}
                label={category.label}
                icon={category.icon}
                badge={`${done}/${lessons.length}`}
              />
            );
          })}
        </div>
      </header>

      <section className="space-y-6">
        {categoriesToShow.map((category) => {
          const lessons = getLessonsByCategory(category.id);
          const categoryDone = lessons.filter((l) =>
            isLessonCompleted(l.id, completedIds),
          ).length;
          const nextUp = lessons.find(
            (l) =>
              isLessonUnlocked(l.id, completedIds) &&
              !isLessonCompleted(l.id, completedIds),
          );

          return (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>
                  {category.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-extrabold text-text">
                    {category.label}
                  </h2>
                  <p className="text-xs text-muted">{category.hint}</p>
                  {nextUp && filter !== "all" && (
                    <p className="mt-1 text-[10px] font-semibold text-primary">
                      Siguiente: {nextUp.title}
                    </p>
                  )}
                </div>
                <span className="shrink-0 rounded-full bg-background px-2 py-0.5 text-[10px] font-bold text-muted">
                  {categoryDone}/{lessons.length}
                </span>
              </div>
              <div className="space-y-2">
                {lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <LessonCard
                      lesson={lesson}
                      unlocked={isLessonUnlocked(lesson.id, completedIds)}
                      completed={isLessonCompleted(lesson.id, completedIds)}
                      onOpen={open}
                      compact
                      isNextUp={lesson.id === nextUp?.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <GoalsSection />
      <Disclaimer />
      <LessonModal
        lesson={selected}
        completed={selectedCompleted}
        onClose={close}
        onMarkComplete={() => {
          if (selected) markCompleted(selected.id);
        }}
      />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  icon,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition active:scale-[0.98] ${
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-surface text-text"
      }`}
    >
      <span aria-hidden>{icon}</span>
      {label}
      {badge && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] ${
            active ? "bg-surface/80 text-primary" : "bg-background text-muted"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
