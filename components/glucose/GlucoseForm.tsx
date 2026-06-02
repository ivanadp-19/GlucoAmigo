"use client";

import { useMemo, useState } from "react";
import {
  EMOTIONAL_STATES,
  getGlucoseStatus,
  MEASUREMENT_MOMENTS,
  getGlucoseStatusHint,
  type EmotionalState,
  type GlucoseRecord,
  type MeasurementMoment,
} from "@/lib/mock-data";
import { ConfettiSuccess } from "@/components/ui/ConfettiSuccess";

const STATUS_PREVIEW = {
  success: "border-primary/40 bg-primary-soft text-primary-dark",
  warning: "border-accent/40 bg-accent-soft text-text",
  danger: "border-danger/30 bg-danger-soft text-danger",
};

type GlucoseFormProps = {
  onSaved?: () => void;
  onSubmitRecord: (record: Omit<GlucoseRecord, "id" | "date">) => void;
};

function validateGlucoseInput(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Ingresa tu nivel de glucosa en mg/dL.";
  }
  const num = Number(trimmed);
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return "Usa solo números válidos.";
  }
  if (num <= 0) {
    return "El valor debe ser mayor a 0.";
  }
  if (num < 40 || num > 600) {
    return "Ingresa un valor entre 40 y 600 mg/dL.";
  }
  return null;
}

export function GlucoseForm({ onSaved, onSubmitRecord }: GlucoseFormProps) {
  const [value, setValue] = useState("");
  const [moment, setMoment] = useState<MeasurementMoment>("En ayunas");
  const [emotion, setEmotion] = useState<EmotionalState | "">("");
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successKey, setSuccessKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const preview = useMemo(() => {
    const validationError = validateGlucoseInput(value);
    if (validationError || !value.trim()) return null;
    const num = Number(value);
    const status = getGlucoseStatus(num, moment);
    return {
      ...status,
      hint: getGlucoseStatusHint(num, moment),
    };
  }, [value, moment]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateGlucoseInput(value);
    if (validationError) {
      setError(validationError);
      setErrorKey((k) => k + 1);
      setSuccess(false);
      return;
    }
    const num = Number(value.trim());
    setError("");
    onSubmitRecord({
      value: num,
      moment,
      emotion: emotion || undefined,
    });
    setSuccess(true);
    setSuccessKey((k) => k + 1);
    setShowConfetti(true);
    setValue("");
    setEmotion("");
    onSaved?.();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-5 shadow-[var(--shadow-card)]"
      >
        <h2 className="text-sm font-bold text-text">Nuevo registro</h2>
        <p className="mt-1 text-xs text-muted">
          Ayunas: 80–130 mg/dL · 2 h después de comer: menor a 180 mg/dL
        </p>

        <label className="mt-4 block">
          <span className="text-xs font-semibold text-muted">
            Nivel de glucosa (mg/dL)
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={600}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSuccess(false);
              if (error) setError("");
            }}
            placeholder="Ej. 126"
            className="mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-lg font-bold text-text outline-none focus:border-primary"
            aria-invalid={Boolean(error)}
          />
        </label>

        {preview && (
          <div
            className={`animate-fade-in mt-3 rounded-xl border-2 px-4 py-3 ${STATUS_PREVIEW[preview.color]}`}
          >
            <p className="text-sm font-bold">{preview.label}</p>
            <p className="mt-1 text-xs leading-relaxed opacity-90">
              {preview.hint}
            </p>
          </div>
        )}

        <label className="mt-4 block">
          <span className="text-xs font-semibold text-muted">Momento</span>
          <select
            value={moment}
            onChange={(e) => {
              setMoment(e.target.value as MeasurementMoment);
              setSuccess(false);
            }}
            className="mt-1 w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-medium text-text outline-none focus:border-primary"
          >
            {MEASUREMENT_MOMENTS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="mt-4">
          <legend className="text-xs font-semibold text-muted">
            Estado emocional (opcional)
          </legend>
          <div className="mt-2 flex justify-between gap-1">
            {EMOTIONAL_STATES.map(({ value: v, emoji }) => (
              <button
                key={v}
                type="button"
                onClick={() => setEmotion(emotion === v ? "" : v)}
                className={`flex-1 rounded-xl py-2 text-xl transition ${
                  emotion === v
                    ? "bg-primary-soft ring-2 ring-primary"
                    : "bg-background hover:bg-primary-soft/50"
                }`}
                aria-label={v}
                title={v}
              >
                {emoji}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <p
            key={errorKey}
            className="animate-shake mt-3 text-sm font-medium text-danger"
            role="alert"
          >
            {error}
          </p>
        )}

        {success && (
          <div
            key={successKey}
            className="animate-success-pop mt-3 flex items-center gap-2.5 rounded-xl bg-primary-soft px-4 py-3"
            role="status"
          >
            <span className="shrink-0 text-base leading-none text-primary" aria-hidden>✓</span>
            <p className="text-sm font-medium text-primary-dark">
              Registro guardado. Cada dato te ayuda a cuidar mejor tu salud.
            </p>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-[var(--radius-button)] bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302] transition active:translate-y-0.5 active:shadow-none"
        >
          Guardar registro
        </button>
      </form>

      <ConfettiSuccess
        show={showConfetti}
        message="¡Registro guardado!"
        onDone={() => setShowConfetti(false)}
      />
    </>
  );
}
