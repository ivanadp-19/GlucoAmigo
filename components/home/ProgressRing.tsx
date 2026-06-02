type ProgressRingProps = {
  streak: number;
  max?: number;
};

const STREAK_LABELS = ["", "¡Buen inicio!", "¡Vas sumando!", "¡Racha activa!", "¡Increíble!", "¡Sigue así!", "¡Semana completa!", "¡Campeón!"];

export function ProgressRing({ streak, max = 7 }: ProgressRingProps) {
  const progress = Math.min(streak / max, 1);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference * (1 - progress);
  const cheerLabel = STREAK_LABELS[Math.min(streak, STREAK_LABELS.length - 1)] ?? "¡Sigue así!";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-[88px] w-[88px] items-center justify-center">
        <svg
          className="-rotate-90"
          width="88"
          height="88"
          viewBox="0 0 88 88"
          aria-hidden
        >
          <circle
            cx="44"
            cy="44"
            r="34"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="7"
          />
          <circle
            cx="44"
            cy="44"
            r="34"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="animate-streak-pop text-2xl leading-none" aria-hidden>
            🔥
          </span>
          <span className="text-lg font-extrabold leading-tight text-text">
            {streak}
          </span>
        </div>
      </div>

      <div className="flex gap-1" aria-label={`${streak} días de racha de ${max}`}>
        {Array.from({ length: max }, (_, i) => {
          const filled = i < streak;
          return (
            <span
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all ${
                filled
                  ? "animate-streak-pop bg-accent text-[10px] shadow-[0_2px_0_0_#e6b400]"
                  : "bg-border/60 text-muted/40"
              }`}
              aria-hidden
            >
              {filled ? "⭐" : "·"}
            </span>
          );
        })}
      </div>

      <p className="text-center text-xs font-semibold text-text">{cheerLabel}</p>
    </div>
  );
}
