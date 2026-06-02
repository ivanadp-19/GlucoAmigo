"use client";

import { useMemo, useState } from "react";
import { GlucoseForm } from "@/components/glucose/GlucoseForm";
import { GlucoseChart } from "@/components/glucose/GlucoseChart";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { useGlucoseRecords } from "@/lib/glucose-storage";
import {
  buildGlucoseChartSeries,
  EMOTIONAL_STATES,
  formatRecordDate,
  getGlucoseStatus,
  getGlucoseStatusHint,
  LAST_GLUCOSE,
  WEEKLY_GLUCOSE,
} from "@/lib/mock-data";

const STATUS_CARD = {
  success: "border-primary/30 bg-primary-soft text-primary-dark",
  warning: "border-accent/40 bg-accent-soft text-text",
  danger: "border-danger/30 bg-danger-soft text-danger",
};

export function GlucoseScreen() {
  const { records, latestRecord, loaded, addRecord, clearRecords } =
    useGlucoseRecords();
  const [confirmClear, setConfirmClear] = useState(false);

  const hasUserRecords = records.length > 0;
  const chartData = useMemo(
    () => buildGlucoseChartSeries(records),
    [records],
  );

  const displayValue = latestRecord?.value ?? LAST_GLUCOSE.value;
  const displayMoment = latestRecord?.moment;
  const status = getGlucoseStatus(displayValue, displayMoment);
  const statusHint = latestRecord
    ? getGlucoseStatusHint(displayValue, displayMoment)
    : LAST_GLUCOSE.message;

  const mockLatest = WEEKLY_GLUCOSE[WEEKLY_GLUCOSE.length - 1];

  function handleClearRecords() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearRecords();
    setConfirmClear(false);
  }

  return (
    <div className="space-y-5 pb-2 pt-2">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-text">Glucosa</h1>
        <p className="text-sm text-muted">
          Registra y revisa tus niveles de glucosa.
        </p>
      </header>

      <section
        className={`rounded-[var(--radius-card)] border-2 p-5 shadow-[var(--shadow-card)] ${STATUS_CARD[status.color]}`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
          {latestRecord ? "Tu última glucosa" : "Última glucosa (ejemplo)"}
        </p>
        <p className="mt-1 text-4xl font-extrabold">{displayValue} mg/dL</p>
        <p className="mt-1 text-sm font-bold">{status.label}</p>
        {latestRecord && (
          <p className="mt-1 text-xs opacity-80">
            {latestRecord.moment} · {formatRecordDate(latestRecord.date)}
          </p>
        )}
        {!latestRecord && loaded && (
          <p className="mt-1 text-xs opacity-80">
            Ejemplo del domingo: {mockLatest.value} mg/dL
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed opacity-90">{statusHint}</p>
      </section>

      <GlucoseForm onSubmitRecord={addRecord} />
      <GlucoseChart chartData={chartData} hasUserRecords={hasUserRecords} />

      {loaded && hasUserRecords && (
        <section className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-text">
                Registros recientes
              </h2>
              <p className="mt-0.5 text-[11px] text-muted">
                Tus lecturas también aparecen en la gráfica junto al ejemplo
                semanal.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearRecords}
              onBlur={() => setConfirmClear(false)}
              className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold transition ${
                confirmClear
                  ? "border-danger bg-danger-soft text-danger"
                  : "border-border bg-background text-muted hover:border-danger/40"
              }`}
            >
              {confirmClear ? "¿Borrar todo?" : "Borrar registros"}
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {records.slice(0, 5).map((record) => {
              const recordStatus = getGlucoseStatus(
                record.value,
                record.moment,
              );
              const emotionEmoji = EMOTIONAL_STATES.find(
                (e) => e.value === record.emotion,
              )?.emoji;
              return (
                <li
                  key={record.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-base font-bold text-text">
                      {record.value} mg/dL
                      {emotionEmoji && (
                        <span className="ml-1.5 text-sm">{emotionEmoji}</span>
                      )}
                    </p>
                    <p className="truncate text-[11px] text-muted">
                      {record.moment} · {formatRecordDate(record.date)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 max-w-[7.5rem] text-right rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${
                      recordStatus.color === "success"
                        ? "bg-primary-soft text-primary-dark"
                        : recordStatus.color === "warning"
                          ? "bg-accent-soft text-text"
                          : "bg-danger-soft text-danger"
                    }`}
                  >
                    {recordStatus.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <Disclaimer />
    </div>
  );
}
