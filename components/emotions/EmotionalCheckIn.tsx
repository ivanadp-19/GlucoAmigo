"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AMDNL_SUPPORT,
  DIFFICULT_EMOTION_SUPPORT,
  EMOTION_HIGHLIGHT_PHRASES,
  EMOTION_MESSAGES,
  EMOTIONAL_STATES,
  isDifficultEmotion,
  isPositiveEmotion,
  type EmotionalState,
} from "@/lib/mock-data";
import { useEmotionEntries } from "@/lib/emotion-storage";
import { ConfettiSuccess } from "@/components/ui/ConfettiSuccess";

function formatEmotionDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function emotionEmoji(state: EmotionalState): string {
  return EMOTIONAL_STATES.find((s) => s.value === state)?.emoji ?? "😐";
}

export function EmotionalCheckIn() {
  const [selected, setSelected] = useState<EmotionalState | null>(null);
  const [selectionKey, setSelectionKey] = useState(0);
  const [note, setNote] = useState("");
  const [noteTouched, setNoteTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<EmotionalState | null>(
    null,
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const { addEntry, todayEntry, entries, loaded } = useEmotionEntries();

  const activeSelection =
    selected ?? (loaded && todayEntry ? todayEntry.state : null);
  const activeNote = noteTouched
    ? note
    : note || (loaded && todayEntry?.note ? todayEntry.note : "");

  const highlightPhrase = useMemo(() => {
    const dayIndex = new Date().getDate() % EMOTION_HIGHLIGHT_PHRASES.length;
    return EMOTION_HIGHLIGHT_PHRASES[dayIndex];
  }, []);

  const feedbackState = lastSubmitted ?? activeSelection;
  const message = feedbackState ? EMOTION_MESSAGES[feedbackState] : null;
  const showDifficultSupport =
    submitted && feedbackState && isDifficultEmotion(feedbackState);
  const showPositiveFeedback =
    submitted && feedbackState && isPositiveEmotion(feedbackState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeSelection) return;
    addEntry(activeSelection, activeNote);
    setLastSubmitted(activeSelection);
    setSubmitted(true);
    setSelected(activeSelection);
    if (activeSelection === "Muy bien") {
      setShowConfetti(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <header className="space-y-2">
          <Link
            href="/"
            className="inline-block text-xs font-semibold text-primary transition hover:underline"
          >
            ← Inicio
          </Link>
          <h1 className="text-2xl font-extrabold text-text">
            ¿Cómo te sientes hoy?
          </h1>
          <p className="text-sm text-muted">
            Tu bienestar emocional también es importante.
          </p>
        </header>

        <blockquote className="rounded-xl border border-accent/40 bg-accent-soft/80 px-4 py-3 text-sm font-medium leading-relaxed text-text">
          “{highlightPhrase}”
        </blockquote>

        {loaded && todayEntry && (
          <div
            className="rounded-xl border border-border bg-surface px-4 py-3 shadow-[var(--shadow-card)]"
            aria-live="polite"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
              Tu registro de hoy
            </p>
            <div className="mt-2 flex items-start gap-3">
              <span className="text-2xl" aria-hidden>
                {emotionEmoji(todayEntry.state)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-text">{todayEntry.state}</p>
                {todayEntry.note && (
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {todayEntry.note}
                  </p>
                )}
                <time
                  className="mt-1 block text-[10px] text-muted"
                  dateTime={todayEntry.date}
                >
                  {formatEmotionDate(todayEntry.date)}
                </time>
              </div>
            </div>
            {!submitted && (
              <p className="mt-2 text-[11px] text-muted">
                Puedes actualizar cómo te sientes si algo cambió.
              </p>
            )}
          </div>
        )}

        <fieldset>
          <legend className="sr-only">Selecciona cómo te sientes hoy</legend>
          <div className="grid grid-cols-5 gap-1.5 rounded-[var(--radius-card)] border-2 border-border bg-surface p-3 shadow-[var(--shadow-card)]">
            {EMOTIONAL_STATES.map(({ value, emoji }) => {
              const isActive = activeSelection === value;
              const difficult = isDifficultEmotion(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setSelected(value);
                    setSelectionKey((k) => k + 1);
                    setSubmitted(false);
                    setLastSubmitted(null);
                  }}
                  aria-pressed={isActive}
                  className={`pressable flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2.5 transition ${
                    isActive
                      ? difficult
                        ? "bg-danger-soft ring-2 ring-danger/40"
                        : isPositiveEmotion(value)
                          ? "bg-primary-soft ring-2 ring-primary/50"
                          : "bg-secondary-soft ring-2 ring-secondary"
                      : "hover:bg-background"
                  }`}
                >
                  <span
                    key={isActive ? `${value}-${selectionKey}` : value}
                    className={`inline-block text-2xl sm:text-3xl ${isActive ? "animate-emotion-pop" : ""}`}
                    aria-hidden
                  >
                    {emoji}
                  </span>
                  <span
                    className={`w-full text-center text-[8px] font-semibold leading-tight sm:text-[9px] ${
                      isActive ? "text-text" : "text-muted"
                    }`}
                  >
                    {value}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="text-xs font-semibold text-muted">
            ¿Quieres escribir cómo te sientes hoy?
          </span>
          <textarea
            value={activeNote}
            onChange={(e) => {
              setNoteTouched(true);
              setNote(e.target.value);
            }}
            rows={3}
            placeholder="Opcional — escribe aquí si lo deseas…"
            className="mt-2 w-full resize-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-secondary"
          />
        </label>

        {submitted && message && (
          <div
            className={`animate-fade-in space-y-3 rounded-xl border-2 px-4 py-3 ${
              showDifficultSupport
                ? "border-danger/25 bg-danger-soft/40"
                : showPositiveFeedback
                  ? "border-primary/30 bg-primary-soft/60"
                  : "border-secondary/30 bg-secondary-soft/50"
            }`}
            role="status"
          >
            <p className="text-sm font-bold text-text">
              {showDifficultSupport
                ? "Gracias por contarnos"
                : showPositiveFeedback
                  ? "Qué bueno verte así"
                  : "Gracias por compartir"}
            </p>
            <p className="text-sm leading-relaxed text-text">{message}</p>
            {showDifficultSupport && (
              <ul className="space-y-2 border-t border-danger/15 pt-3">
                {DIFFICULT_EMOTION_SUPPORT.map((phrase) => (
                  <li
                    key={phrase}
                    className="text-xs leading-relaxed text-text"
                  >
                    {phrase}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!activeSelection}
          className="pressable w-full rounded-[var(--radius-button)] bg-secondary px-5 py-4 text-sm font-bold text-white shadow-[0_4px_0_0_#1899d6] transition disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {todayEntry ? "Actualizar emoción" : "Registrar emoción"}
        </button>
      </form>

      <section
        className="rounded-xl border border-border bg-background px-4 py-3"
        aria-labelledby="phrases-heading"
      >
        <h2 id="phrases-heading" className="text-xs font-bold text-text">
          Frases de apoyo
        </h2>
        <p className="mt-1 text-[11px] text-muted">
          Para cuando el día se siente pesado — no son reglas, son recordatorios
          amables.
        </p>
        <ul className="mt-2 space-y-2">
          {DIFFICULT_EMOTION_SUPPORT.map((phrase) => (
            <li key={phrase} className="text-xs leading-relaxed text-muted">
              “{phrase}”
            </li>
          ))}
        </ul>
      </section>

      <SupportSection />

      {entries.length > 0 && (
        <section className="rounded-xl border border-border bg-surface px-4 py-3">
          <h2 className="text-xs font-bold text-text">Tus registros recientes</h2>
          <ul className="mt-2 space-y-2">
            {entries.slice(0, 5).map((entry) => (
              <li
                key={entry.id}
                className="flex items-start justify-between gap-2 border-b border-border/60 pb-2 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <span className="mr-1.5" aria-hidden>
                    {emotionEmoji(entry.state)}
                  </span>
                  <span className="text-xs font-medium text-text">
                    {entry.state}
                  </span>
                  {entry.note && (
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-muted">
                      {entry.note}
                    </p>
                  )}
                </div>
                <time
                  className="shrink-0 text-[10px] text-muted"
                  dateTime={entry.date}
                >
                  {formatEmotionDate(entry.date)}
                </time>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ConfettiSuccess
        show={showConfetti}
        message="Qué bueno verte así hoy"
        onDone={() => setShowConfetti(false)}
      />
    </>
  );
}

function SupportSection() {
  return (
    <section
      className="space-y-3 rounded-[var(--radius-card)] border-2 border-border bg-surface p-4 shadow-[var(--shadow-card)]"
      aria-labelledby="support-heading"
    >
      <h2 id="support-heading" className="text-sm font-bold text-text">
        Información de referencia
      </h2>
      <p className="text-xs leading-relaxed text-muted">
        Datos públicos de una organización de apoyo. GlucoAmigo no es un
        servicio médico ni gestiona citas, grupos ni contacto con AMDNL.
      </p>

      <div className="rounded-xl bg-background px-3 py-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
          Organización de referencia
        </p>
        <h3 className="mt-1 text-xs font-bold text-primary-dark">
          {AMDNL_SUPPORT.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {AMDNL_SUPPORT.description}
        </p>
        <ul className="mt-3 space-y-1.5">
          {AMDNL_SUPPORT.offerings.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-xs leading-snug text-text"
            >
              <span className="text-secondary" aria-hidden>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
        <address className="mt-3 space-y-1 text-xs not-italic text-muted">
          <p>{AMDNL_SUPPORT.address}</p>
          <p>
            Tel:{" "}
            {AMDNL_SUPPORT.phones.map((p, i) => (
              <span key={p}>
                {i > 0 && " / "}
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="text-secondary"
                >
                  {p}
                </a>
              </span>
            ))}
          </p>
          <p>
            {AMDNL_SUPPORT.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="mr-2 text-secondary underline-offset-2 hover:underline"
              >
                {email}
              </a>
            ))}
          </p>
        </address>
      </div>
    </section>
  );
}
