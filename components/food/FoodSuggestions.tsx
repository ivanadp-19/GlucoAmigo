"use client";

import { useState } from "react";
import { FOOD_SUGGESTIONS } from "@/lib/mock-data";
import {
  suggestionKey,
  useSuggestionPreferences,
  type SuggestionCategory,
} from "@/lib/food-storage";

export function FoodSuggestions() {
  const [category, setCategory] = useState<SuggestionCategory>("quick");
  const { getPreference, togglePreference, loaded } = useSuggestionPreferences();
  const data = FOOD_SUGGESTIONS[category];

  return (
    <section className="space-y-3" aria-labelledby="food-suggestions-heading">
      <h2 id="food-suggestions-heading" className="text-sm font-bold text-text">
        ¿Qué puedo comer si…?
      </h2>
      <p className="text-xs text-muted">
        Marca las ideas que te gustan o las que usarás hoy.
      </p>

      <div className="flex gap-2" role="tablist" aria-label="Tipo de sugerencia">
        <button
          type="button"
          role="tab"
          aria-selected={category === "quick"}
          onClick={() => setCategory("quick")}
          className={`pressable flex-1 rounded-xl border-2 px-3 py-2.5 text-xs font-bold transition ${
            category === "quick"
              ? "border-primary bg-primary-soft text-primary-dark"
              : "border-border bg-surface text-muted"
          }`}
        >
          ⏱️ Poco tiempo
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={category === "budget"}
          onClick={() => setCategory("budget")}
          className={`pressable flex-1 rounded-xl border-2 px-3 py-2.5 text-xs font-bold transition ${
            category === "budget"
              ? "border-secondary bg-secondary-soft text-secondary"
              : "border-border bg-surface text-muted"
          }`}
        >
          💰 Económico
        </button>
      </div>

      <ul className="space-y-2">
        {data.items.map((item, index) => {
          const key = suggestionKey(category, item);
          const pref = loaded ? getPreference(key) : { liked: false, useToday: false };

          return (
            <li
              key={item}
              className="animate-fade-in rounded-xl border border-border bg-surface px-3 py-3 shadow-[var(--shadow-card)]"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-primary-dark"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 text-sm leading-snug text-text">
                  {item}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 pl-10">
                <button
                  type="button"
                  aria-pressed={pref.liked}
                  disabled={!loaded}
                  onClick={() => togglePreference(key, "liked")}
                  className={`pressable rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                    pref.liked
                      ? "border-primary bg-primary-soft text-primary-dark"
                      : "border-border bg-background text-muted"
                  }`}
                >
                  {pref.liked ? "✓ " : ""}Me gusta
                </button>
                <button
                  type="button"
                  aria-pressed={pref.useToday}
                  disabled={!loaded}
                  onClick={() => togglePreference(key, "useToday")}
                  className={`pressable rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                    pref.useToday
                      ? "border-secondary bg-secondary-soft text-secondary"
                      : "border-border bg-background text-muted"
                  }`}
                >
                  {pref.useToday ? "✓ " : ""}La usaré hoy
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
