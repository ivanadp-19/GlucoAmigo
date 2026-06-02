"use client";

import { useCallback, useSyncExternalStore } from "react";
import { FAMILY_CHALLENGES } from "@/lib/mock-data";
import {
  createClientReadyStore,
  createLocalStorageStore,
} from "@/lib/create-local-storage-store";

const CHALLENGES_KEY = "glucoamigo-family-challenges";
const QUIZ_KEY = "glucoamigo-quiz-stats";

export type ChallengeProgress = Record<string, boolean[]>;

export type QuizStats = {
  lastScore: number;
  lastTotal: number;
  maxStreak: number;
  completedAt: string;
};

export function getDefaultChallengeProgress(): ChallengeProgress {
  return Object.fromEntries(
    FAMILY_CHALLENGES.map((c) => [c.id, Array(7).fill(false)]),
  );
}

export function loadChallengeProgress(): ChallengeProgress {
  if (typeof window === "undefined") return getDefaultChallengeProgress();
  try {
    const raw = localStorage.getItem(CHALLENGES_KEY);
    if (!raw) return getDefaultChallengeProgress();
    const parsed = JSON.parse(raw) as ChallengeProgress;
    const defaults = getDefaultChallengeProgress();
    for (const id of Object.keys(defaults)) {
      if (!parsed[id] || parsed[id].length !== 7) {
        parsed[id] = defaults[id];
      }
    }
    return parsed;
  } catch {
    return getDefaultChallengeProgress();
  }
}

export function saveChallengeProgress(progress: ChallengeProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHALLENGES_KEY, JSON.stringify(progress));
}

export function loadQuizStats(): QuizStats | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuizStats;
  } catch {
    return null;
  }
}

export function saveQuizStats(stats: QuizStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUIZ_KEY, JSON.stringify(stats));
  quizStatsStore.updateCache(stats);
}

const challengeProgressStore = createLocalStorageStore(
  loadChallengeProgress,
  getDefaultChallengeProgress(),
);
const quizStatsStore = createLocalStorageStore<QuizStats | null>(
  loadQuizStats,
  null,
);
const clientReadyStore = createClientReadyStore();

export type FamilyChallengeSummary = {
  activeCount: number;
  goalsReached: number;
  totalDaysMarked: number;
  totalDaySlots: number;
};

export function computeFamilyChallengeSummary(
  progress: ChallengeProgress,
): FamilyChallengeSummary {
  let activeCount = 0;
  let goalsReached = 0;
  let totalDaysMarked = 0;

  for (const challenge of FAMILY_CHALLENGES) {
    const days = progress[challenge.id] ?? Array(7).fill(false);
    const completed = days.filter(Boolean).length;
    totalDaysMarked += completed;
    const reached = completed >= challenge.goalDays;
    if (reached) goalsReached += 1;
    else if (completed > 0) activeCount += 1;
  }

  return {
    activeCount,
    goalsReached,
    totalDaysMarked,
    totalDaySlots: FAMILY_CHALLENGES.length * 7,
  };
}

export function useQuizStats() {
  const stats = useSyncExternalStore(
    quizStatsStore.subscribe,
    quizStatsStore.getSnapshot,
    quizStatsStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  return { stats, loaded };
}

export function useChallengeProgress() {
  const progress = useSyncExternalStore(
    challengeProgressStore.subscribe,
    challengeProgressStore.getSnapshot,
    challengeProgressStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  const setProgress = useCallback((next: ChallengeProgress) => {
    saveChallengeProgress(next);
    challengeProgressStore.updateCache(next);
  }, []);

  return { progress, setProgress, loaded };
}
