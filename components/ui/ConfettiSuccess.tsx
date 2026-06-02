"use client";

import { useEffect, useMemo } from "react";

type ConfettiSuccessProps = {
  show: boolean;
  message?: string;
  onDone?: () => void;
};

const COLORS = ["#58cc02", "#1cb0f6", "#ffc800", "#ff9600", "#ff4b4b"];

export function ConfettiSuccess({
  show,
  message = "¡Excelente!",
  onDone,
}: ConfettiSuccessProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        delay: `${(i % 7) * 0.08}s`,
        duration: `${1.4 + (i % 5) * 0.15}s`,
        color: COLORS[i % COLORS.length],
        size: i % 3 === 0 ? "h-2.5 w-1.5" : "h-2 w-2",
      })),
    [],
  );

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onDone?.();
    }, 2200);
    return () => clearTimeout(timer);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {pieces.map((piece) => (
          <span
            key={piece.id}
            className={`confetti-piece absolute block rounded-sm ${piece.size}`}
            style={{
              left: piece.left,
              top: "-12px",
              backgroundColor: piece.color,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
            }}
          />
        ))}
      </div>
      <div className="animate-bounce-in relative rounded-[var(--radius-card)] border-2 border-primary/20 bg-surface px-8 py-6 text-center shadow-lg">
        <p className="text-3xl">✓</p>
        <p className="mt-2 text-lg font-bold text-text">{message}</p>
      </div>
    </div>
  );
}
