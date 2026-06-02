import { GLUCOSE_GOALS, HEALTH_GOALS } from "@/lib/mock-data";

export function GoalsSection() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-extrabold text-text">Mis objetivos</h2>
        <p className="mt-0.5 text-xs text-muted">
          Referencias útiles — tu médico o nutriólogo pueden ajustarlas.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {HEALTH_GOALS.map((goal) => (
          <div
            key={goal.title}
            className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-3 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-start gap-2">
              <span className="text-xl" aria-hidden>
                {goal.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-text">{goal.title}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-text/80">
                  {goal.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <details className="rounded-[var(--radius-card)] border-2 border-border bg-primary-soft/40">
        <summary className="cursor-pointer px-4 py-3 text-xs font-bold text-text">
          ¿Por qué importan estos números?
        </summary>
        <ul className="space-y-1.5 border-t border-border/60 px-4 pb-3 pt-2 text-xs leading-relaxed text-muted">
          <li>• Registrar glucosa ayuda a identificar patrones.</li>
          <li>
            • Ayunas {GLUCOSE_GOALS.fasting.min}–{GLUCOSE_GOALS.fasting.max}{" "}
            mg/dL y postcomida &lt; {GLUCOSE_GOALS.postprandial.max} mg/dL son
            metas frecuentes.
          </li>
          <li>
            • Alimentación, actividad, descanso y tratamiento trabajan juntos.
          </li>
          <li>
            • No todos los objetivos aplican igual para todas las personas.
          </li>
        </ul>
      </details>
    </section>
  );
}
