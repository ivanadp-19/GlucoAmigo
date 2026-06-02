"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { EmotionEntry, EmotionalState } from "@/lib/mock-data";
import {
  createClientReadyStore,
  createLocalStorageStore,
} from "@/lib/create-local-storage-store";

const STORAGE_KEY = "glucoamigo-emotions";

export function loadEmotionEntries(): EmotionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EmotionEntry[];
  } catch {
    return [];
  }
}

export function saveEmotionEntries(entries: EmotionEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

const entriesStore = createLocalStorageStore(loadEmotionEntries, []);
const clientReadyStore = createClientReadyStore();

export function useEmotionEntries() {
  const entries = useSyncExternalStore(
    entriesStore.subscribe,
    entriesStore.getSnapshot,
    entriesStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  const addEntry = useCallback((state: EmotionalState, note?: string) => {
    const entry: EmotionEntry = {
      id: crypto.randomUUID(),
      state,
      note: note?.trim() || undefined,
      date: new Date().toISOString(),
    };
    const next = [entry, ...entriesStore.getSnapshot()].slice(0, 30);
    saveEmotionEntries(next);
    entriesStore.updateCache(next);
    return entry;
  }, []);

  const todayEntry = entries.find((e) => {
    const d = new Date(e.date);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  });

  return { entries, addEntry, todayEntry, loaded };
}
