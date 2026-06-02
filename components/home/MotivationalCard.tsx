import {
  getPhraseCategoryLabel,
  type MotivationalPhrase,
} from "@/lib/mock-data";

type MotivationalCardProps = {
  phrase: MotivationalPhrase;
};

const CATEGORY_EMOJI: Record<MotivationalPhrase["category"], string> = {
  general: "🌱",
  hardDays: "💙",
  selfEsteem: "💚",
  healthyHabits: "🥗",
  adherence: "💊",
  family: "🤍",
};

export function MotivationalCard({ phrase }: MotivationalCardProps) {
  const emoji = CATEGORY_EMOJI[phrase.category];

  return (
    <section
      className="animate-fade-in overflow-hidden rounded-[var(--radius-card)] border-2 border-accent/40 bg-gradient-to-br from-accent-soft via-surface to-primary-soft p-4 shadow-[var(--shadow-card)]"
      aria-label="Frase motivacional del día"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-xl shadow-sm"
          aria-hidden
        >
          {emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
            {getPhraseCategoryLabel(phrase.category)}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-text">
            &ldquo;{phrase.text}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
