"use client";

import { useCallback, useState } from "react";
import {
  PLATE_BUILDER_STEPS,
  type PlateOption,
} from "@/lib/mock-data";
import {
  formatPlateSummary,
  useSavedDailyPlate,
  type SavedDailyPlate,
} from "@/lib/food-storage";

const MIN_VEGGIES = 2;
const MAX_VEGGIES = 3;

type Selections = {
  protein: PlateOption | null;
  base: PlateOption | null;
  veggies: PlateOption[];
};

const INITIAL: Selections = {
  protein: null,
  base: null,
  veggies: [],
};

function selectionsFromSaved(plate: SavedDailyPlate): Selections {
  return {
    protein: plate.protein,
    base: plate.base,
    veggies: plate.veggies.slice(0, MAX_VEGGIES),
  };
}

function formatSavedDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("es-MX", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function PlateBuilder() {
  const { savedPlate, savePlate, loaded } = useSavedDailyPlate();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Selections>(INITIAL);
  const [justSaved, setJustSaved] = useState(false);

  const current = PLATE_BUILDER_STEPS[step - 1];
  const isVeggieStep = current.key === "veggies";
  const selectedSingle =
    current.key === "veggies"
      ? null
      : selections[current.key as "protein" | "base"];
  const selectedVeggies = selections.veggies;

  const veggiesComplete =
    selectedVeggies.length >= MIN_VEGGIES &&
    selectedVeggies.length <= MAX_VEGGIES;
  const complete =
    Boolean(selections.protein && selections.base && veggiesComplete);

  const canAdvance =
    current.key === "veggies"
      ? selectedVeggies.length >= MIN_VEGGIES
      : Boolean(selectedSingle);

  function selectSingleOption(option: PlateOption) {
    const key = current.key as "protein" | "base";
    setSelections((prev) => ({
      ...prev,
      [key]: prev[key]?.id === option.id ? null : option,
    }));
    setJustSaved(false);
  }

  function toggleVeggie(option: PlateOption) {
    setSelections((prev) => {
      const exists = prev.veggies.some((v) => v.id === option.id);
      if (exists) {
        return {
          ...prev,
          veggies: prev.veggies.filter((v) => v.id !== option.id),
        };
      }
      if (prev.veggies.length >= MAX_VEGGIES) {
        return prev;
      }
      return {
        ...prev,
        veggies: [...prev.veggies, option],
      };
    });
    setJustSaved(false);
  }

  function goNext() {
    if (step < 3 && canAdvance) setStep((s) => s + 1);
  }

  function goBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  const handleSavePlate = useCallback(() => {
    if (!selections.protein || !selections.base || !veggiesComplete) return;
    savePlate({
      protein: selections.protein,
      base: selections.base,
      veggies: selections.veggies,
    });
    setJustSaved(true);
  }, [selections, savePlate, veggiesComplete]);

  const loadSavedIntoBuilder = useCallback(() => {
    if (!savedPlate) return;
    setSelections(selectionsFromSaved(savedPlate));
    setStep(3);
    setJustSaved(false);
  }, [savedPlate]);

  const resetBuilder = useCallback(() => {
    setSelections(INITIAL);
    setStep(1);
    setJustSaved(false);
  }, []);

  return (
    <section className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-text">Arma tu plato saludable</h2>
          <p className="mt-1 text-xs text-muted">
            Paso {step} de 3 · {current.prompt}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-bold text-text">
          🍽️ {current.title}
        </span>
      </div>

      {loaded && savedPlate && (
        <div className="mt-4 rounded-xl border border-border bg-background px-3 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
            Último plato guardado
            {savedPlate.savedAt ? ` · ${formatSavedDate(savedPlate.savedAt)}` : ""}
          </p>
          <p className="mt-1 text-sm font-semibold text-text">
            {formatPlateSummary(savedPlate)}
          </p>
          <button
            type="button"
            onClick={loadSavedIntoBuilder}
            className="pressable mt-2 text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Cargar en el armador
          </button>
        </div>
      )}

      <div
        className="mt-4 flex gap-1.5"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={3}
        aria-label={`Paso ${step} de 3`}
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              n <= step ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      {isVeggieStep && (
        <p className="mt-3 text-xs text-muted">
          Elige entre {MIN_VEGGIES} y {MAX_VEGGIES} opciones (
          {selectedVeggies.length}/{MAX_VEGGIES} seleccionadas).
        </p>
      )}

      <div className="mt-4 grid gap-2">
        {current.options.map((opt) => {
          const active = isVeggieStep
            ? selectedVeggies.some((v) => v.id === opt.id)
            : selectedSingle?.id === opt.id;
          const veggieDisabled =
            isVeggieStep &&
            !active &&
            selectedVeggies.length >= MAX_VEGGIES;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() =>
                isVeggieStep ? toggleVeggie(opt) : selectSingleOption(opt)
              }
              disabled={veggieDisabled}
              aria-pressed={active}
              className={`pressable flex w-full items-center justify-between gap-3 rounded-xl border-2 px-3 py-3 text-left transition ${
                active
                  ? "border-primary bg-primary-soft"
                  : veggieDisabled
                    ? "cursor-not-allowed border-border bg-background opacity-50"
                    : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-text">
                  {opt.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {opt.portion}
                </span>
              </span>
              {active && (
                <span className="shrink-0 text-primary" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {step < 3 && (
        <div className="mt-4 flex gap-2">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="pressable flex-1 rounded-[var(--radius-button)] border-2 border-border bg-surface px-4 py-3 text-sm font-bold text-muted"
            >
              Atrás
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            className="pressable flex-1 rounded-[var(--radius-button)] bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            Siguiente
          </button>
        </div>
      )}
      {step === 3 && (
        <button
          type="button"
          onClick={goBack}
          className="pressable mt-4 w-full rounded-[var(--radius-button)] border-2 border-border bg-surface px-4 py-3 text-sm font-bold text-muted"
        >
          Atrás
        </button>
      )}

      {complete && (
        <div className="animate-fade-in mt-4 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary-soft to-secondary-soft px-4 py-4 text-center">
          <p className="text-sm font-bold leading-snug text-primary-dark">
            Tu plato de hoy:{" "}
            {formatPlateSummary({
              protein: selections.protein!,
              base: selections.base!,
              veggies: selections.veggies,
            })}
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            {selections.protein!.portion} + {selections.base!.portion} +{" "}
            {selections.veggies.map((v) => v.portion).join(" + ")}
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleSavePlate}
              disabled={!loaded}
              className="pressable rounded-[var(--radius-button)] bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302] disabled:opacity-50 disabled:shadow-none"
            >
              {justSaved ? "✓ Plato guardado" : "Guardar plato de hoy"}
            </button>
            <button
              type="button"
              onClick={resetBuilder}
              className="pressable rounded-[var(--radius-button)] border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold text-muted"
            >
              Armar otro plato
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
