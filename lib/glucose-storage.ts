"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { GlucoseRecord } from "@/lib/mock-data";
import {
  createClientReadyStore,
  createLocalStorageStore,
} from "@/lib/create-local-storage-store";

const STORAGE_KEY = "glucoamigo-records";

export function loadRecords(): GlucoseRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GlucoseRecord[];
  } catch {
    return [];
  }
}

export function saveRecords(records: GlucoseRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

const recordsStore = createLocalStorageStore(loadRecords, []);
const clientReadyStore = createClientReadyStore();

export function useGlucoseRecords() {
  const records = useSyncExternalStore(
    recordsStore.subscribe,
    recordsStore.getSnapshot,
    recordsStore.getServerSnapshot,
  );

  const loaded = useSyncExternalStore(
    clientReadyStore.subscribe,
    clientReadyStore.getSnapshot,
    clientReadyStore.getServerSnapshot,
  );

  const addRecord = useCallback(
    (record: Omit<GlucoseRecord, "id" | "date">) => {
      const newRecord: GlucoseRecord = {
        ...record,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      const next = [newRecord, ...recordsStore.getSnapshot()];
      saveRecords(next);
      recordsStore.updateCache(next);
      return newRecord;
    },
    [],
  );

  const refresh = useCallback(() => {
    recordsStore.invalidate();
  }, []);

  const clearRecords = useCallback(() => {
    saveRecords([]);
    recordsStore.updateCache([]);
  }, []);

  const latestRecord = records[0] ?? null;

  return {
    records,
    addRecord,
    clearRecords,
    latestRecord,
    loaded,
    refresh,
  };
}
