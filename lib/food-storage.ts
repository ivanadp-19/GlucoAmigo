"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { PlateOption } from "@/lib/mock-data";
import {
  createClientReadyStore,
  createLocalStorageStore,
} from "@/lib/create-local-storage-store";

const PLATE_KEY = "glucoamigo-daily-plate";
const SUGGESTIONS_KEY = "glucoamigo-food-suggestions";

export type SavedDailyPlate = {
  protein: PlateOption;
  base: PlateOption;
  veggies: PlateOption[];
  savedAt: string;
};

export type SuggestionCategory = "quick" | "budget";

export type SuggestionPreference = {
  liked: boolean;
  useToday: boolean;
};

export type SuggestionPreferences = Record<string, SuggestionPreference>;

export function suggestionKey(category: SuggestionCategory, item: string): string {
  return `${category}::${item}`;
}

export function formatPlateSummary(plate: Pick<SavedDailyPlate, "protein" | "base" | "veggies">): string {
  const veggieNames = plate.veggies.map((v) => v.name).join(", ");
  return `${plate.protein.name} + ${plate.base.name} + ${veggieNames}`;
}

export function loadSavedPlate(): SavedDailyPlate | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PLATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedDailyPlate;
    if (
      !parsed?.protein?.id ||
      !parsed?.base?.id ||
      !Array.isArray(parsed.veggies) ||
      parsed.veggies.length < 2
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveSavedPlate(plate: Omit<SavedDailyPlate, "savedAt">): SavedDailyPlate {
  const saved: SavedDailyPlate = {
    ...plate,
    savedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(PLATE_KEY, JSON.stringify(saved));
  }
  savedPlateStore.updateCache(saved);
  return saved;
}

export function getDefaultSuggestionPreferences(): SuggestionPreferences {
  return {};
}

export function loadSuggestionPreferences(): SuggestionPreferences {
  if (typeof window === "undefined") return getDefaultSuggestionPreferences();
  try {
    const raw = localStorage.getItem(SUGGESTIONS_KEY);
    if (!raw) return getDefaultSuggestionPreferences();
    return JSON.parse(raw) as SuggestionPreferences;
  } catch {
    return getDefaultSuggestionPreferences();
  }
}

export function saveSuggestionPreferences(prefs: SuggestionPreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(prefs));
  suggestionPrefsStore.updateCache(prefs);
}

const savedPlateStore = createLocalStorageStore<SavedDailyPlate | null>(
  loadSavedPlate,
  null,
);
const suggestionPrefsStore = createLocalStorageStore(
  loadSuggestionPreferences,
  getDefaultSuggestionPreferences(),
);
const clientReadyStore = createClientReadyStore();

export function useSavedDailyPlate() {
  const savedPlate = useSyncExternalStore(
    savedPlateStore.subscribe,
    savedPlateStore.getSnapshot,
    savedPlateStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  const savePlate = useCallback(
    (plate: Omit<SavedDailyPlate, "savedAt">) => saveSavedPlate(plate),
    [],
  );

  return { savedPlate, savePlate, loaded };
}

export function useSuggestionPreferences() {
  const preferences = useSyncExternalStore(
    suggestionPrefsStore.subscribe,
    suggestionPrefsStore.getSnapshot,
    suggestionPrefsStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  const togglePreference = useCallback(
    (
      key: string,
      field: keyof SuggestionPreference,
    ) => {
      const current = suggestionPrefsStore.getSnapshot()[key] ?? {
        liked: false,
        useToday: false,
      };
      const next: SuggestionPreferences = {
        ...suggestionPrefsStore.getSnapshot(),
        [key]: {
          ...current,
          [field]: !current[field],
        },
      };
      saveSuggestionPreferences(next);
    },
    [],
  );

  const getPreference = useCallback(
    (key: string): SuggestionPreference => {
      return (
        preferences[key] ?? {
          liked: false,
          useToday: false,
        }
      );
    },
    [preferences],
  );

  return { preferences, togglePreference, getPreference, loaded };
}
