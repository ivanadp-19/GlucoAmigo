"use client";

type LocalStorageStore<T> = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  invalidate: () => void;
  updateCache: (value: T) => void;
};

export function createLocalStorageStore<T>(
  load: () => T,
  serverDefault: T,
): LocalStorageStore<T> {
  let cache: T | null = null;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      if (cache === null) {
        cache = load();
      }
      return cache;
    },
    getServerSnapshot() {
      return serverDefault;
    },
    invalidate() {
      cache = null;
      listeners.forEach((listener) => listener());
    },
    updateCache(value) {
      cache = value;
      listeners.forEach((listener) => listener());
    },
  };
}

export function createClientReadyStore(): {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => boolean;
  getServerSnapshot: () => boolean;
} {
  return {
    subscribe: () => () => {},
    getSnapshot: () => true,
    getServerSnapshot: () => false,
  };
}
