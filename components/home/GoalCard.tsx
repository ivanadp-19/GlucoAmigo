import { GLUCOSE_GOALS } from "@/lib/mock-data";

export function GoalCard() {
  return (
    <section className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-soft text-base" aria-hidden>
          🎯
        </span>
        <h2 className="text-sm font-bold text-text">Mis objetivos de glucosa</h2>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Rangos orientativos según tu plan de cuidado.
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-primary-soft px-3 py-2.5">
          <div className="min-w-0">
            <span className="text-xs font-semibold text-primary-dark">En ayunas</span>
            <p className="truncate text-[11px] text-muted">Antes de comer</p>
          </div>
          <span className="shrink-0 rounded-lg bg-surface px-2.5 py-1 text-xs font-bold text-primary-dark">
            {GLUCOSE_GOALS.fasting.min}–{GLUCOSE_GOALS.fasting.max}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-xl bg-secondary-soft px-3 py-2.5">
          <div className="min-w-0">
            <span className="text-xs font-semibold text-secondary">Postprandial</span>
            <p className="truncate text-[11px] text-muted">2 h después de comer</p>
          </div>
          <span className="shrink-0 rounded-lg bg-surface px-2.5 py-1 text-xs font-bold text-secondary">
            &lt; {GLUCOSE_GOALS.postprandial.max}
          </span>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-muted">mg/dL</p>
    </section>
  );
}
