"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  LESSONS,
  getLessonsByCategory,
  type Lesson,
  type LessonCategory,
} from "@/lib/mock-data";
import {
  createClientReadyStore,
  createLocalStorageStore,
} from "@/lib/create-local-storage-store";

const STORAGE_KEY = "glucoamigo-lesson-progress";

export type LessonProgress = {
  completedIds: string[];
};

export function getDefaultLessonProgress(): LessonProgress {
  return { completedIds: [] };
}

export function loadLessonProgress(): LessonProgress {
  if (typeof window === "undefined") return getDefaultLessonProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultLessonProgress();
    const parsed = JSON.parse(raw) as LessonProgress;
    const validIds = new Set(LESSONS.map((l) => l.id));
    return {
      completedIds: (parsed.completedIds ?? []).filter((id) => validIds.has(id)),
    };
  } catch {
    return getDefaultLessonProgress();
  }
}

export function saveLessonProgress(progress: LessonProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLessonUnlocked(
  lessonId: string,
  completedIds: string[],
): boolean {
  const lesson = LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return false;
  const inCategory = getLessonsByCategory(lesson.category);
  const index = inCategory.findIndex((l) => l.id === lessonId);
  if (index <= 0) return true;
  return completedIds.includes(inCategory[index - 1]!.id);
}

export function isLessonCompleted(
  lessonId: string,
  completedIds: string[],
): boolean {
  return completedIds.includes(lessonId);
}

export function getNextLessonInCategory(
  category: LessonCategory,
  completedIds: string[],
): Lesson | null {
  const lessons = getLessonsByCategory(category);
  return (
    lessons.find(
      (l) =>
        isLessonUnlocked(l.id, completedIds) &&
        !isLessonCompleted(l.id, completedIds),
    ) ?? null
  );
}

const lessonProgressStore = createLocalStorageStore(
  loadLessonProgress,
  getDefaultLessonProgress(),
);
const clientReadyStore = createClientReadyStore();

export function useLessonProgress() {
  const progress = useSyncExternalStore(
    lessonProgressStore.subscribe,
    lessonProgressStore.getSnapshot,
    lessonProgressStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  const markCompleted = useCallback((lessonId: string) => {
    const current = lessonProgressStore.getSnapshot();
    if (current.completedIds.includes(lessonId)) return;
    const next: LessonProgress = {
      completedIds: [...current.completedIds, lessonId],
    };
    saveLessonProgress(next);
    lessonProgressStore.updateCache(next);
  }, []);

  return { progress, markCompleted, loaded };
}
