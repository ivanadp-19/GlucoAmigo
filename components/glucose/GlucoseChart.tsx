"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DotProps } from "recharts";
import {
  computeWeeklyGlucoseStats,
  getGlucoseStatus,
  GLUCOSE_GOALS,
  GLUCOSE_STATUS_COLORS,
  STATUS_MESSAGES,
  type GlucoseChartPoint,
  type GlucoseStatusLabel,
} from "@/lib/mock-data";

const STATUS_BADGE: Record<
  GlucoseStatusLabel,
  { bg: string; text: string; dot: string }
> = {
  "Dentro de objetivo": {
    bg: "bg-primary-soft",
    text: "text-primary-dark",
    dot: "bg-primary",
  },
  "Cerca del objetivo": {
    bg: "bg-accent-soft",
    text: "text-text",
    dot: "bg-accent",
  },
  "Fuera de objetivo": {
    bg: "bg-danger-soft",
    text: "text-danger",
    dot: "bg-danger",
  },
};

type ChartRow = GlucoseChartPoint & { status: GlucoseStatusLabel };

function StatusDot(
  props: DotProps & { payload?: { value: number; moment?: ChartRow["moment"] } },
) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null || !payload) return null;
  const { color } = getGlucoseStatus(payload.value, payload.moment);
  return (
    <circle
      cx={cx}
      cy={cy}
      r={payload.moment ? 6 : 5}
      fill={GLUCOSE_STATUS_COLORS[color]}
      stroke="#fff"
      strokeWidth={2}
    />
  );
}

type GlucoseChartProps = {
  chartData: GlucoseChartPoint[];
  hasUserRecords: boolean;
};

export function GlucoseChart({ chartData, hasUserRecords }: GlucoseChartProps) {
  const chartRows = useMemo<ChartRow[]>(
    () =>
      chartData.map((point) => ({
        ...point,
        status: getGlucoseStatus(point.value, point.moment).label,
      })),
    [chartData],
  );

  const stats = useMemo(
    () => computeWeeklyGlucoseStats(chartData),
    [chartData],
  );

  const summaryLine = useMemo(() => {
    if (stats.percent >= 70) {
      return "Tus niveles se han mantenido cerca del objetivo la mayor parte del tiempo mostrado.";
    }
    if (stats.percent >= 40) {
      return "Hay lecturas cerca del objetivo. Seguir registrando ayuda a ver patrones.";
    }
    return "Varias lecturas están fuera del rango habitual. Sigue registrando y comparte con tu equipo de salud.";
  }, [stats.percent]);

  return (
    <div className="space-y-4">
      <section className="rounded-[var(--radius-card)] border-2 border-border bg-surface p-4 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-bold text-text">Últimos 7 días</h2>
        <p className="mt-0.5 text-[11px] text-muted">
          {hasUserRecords
            ? "Línea de ejemplo + tus lecturas recientes · Ayunas 80–130 · 2 h post 180"
            : "Datos de ejemplo · Zona verde: ayunas 80–130 · Línea naranja: post 180"}
        </p>
        <div className="mt-2 h-56 w-full min-w-0 sm:h-60">
          <ResponsiveContainer width="100%" height={224} minHeight={200}>
            <LineChart
              data={chartRows}
              margin={{ top: 12, right: 4, left: -12, bottom: 0 }}
            >
              <ReferenceArea
                y1={GLUCOSE_GOALS.fasting.min}
                y2={GLUCOSE_GOALS.fasting.max}
                fill={GLUCOSE_STATUS_COLORS.success}
                fillOpacity={0.14}
              />
              <ReferenceArea
                y1={GLUCOSE_GOALS.fasting.max}
                y2={GLUCOSE_GOALS.postprandial.max}
                fill={GLUCOSE_STATUS_COLORS.warning}
                fillOpacity={0.08}
              />
              <ReferenceLine
                y={GLUCOSE_GOALS.fasting.min}
                stroke="#9ca3af"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <ReferenceLine
                y={GLUCOSE_GOALS.fasting.max}
                stroke={GLUCOSE_STATUS_COLORS.success}
                strokeDasharray="6 4"
                strokeWidth={1.5}
                label={{
                  value: "130",
                  position: "insideTopRight",
                  fill: "#46a302",
                  fontSize: 10,
                }}
              />
              <ReferenceLine
                y={GLUCOSE_GOALS.postprandial.max}
                stroke={GLUCOSE_STATUS_COLORS.warning}
                strokeDasharray="6 4"
                strokeWidth={1.5}
                label={{
                  value: "180",
                  position: "insideTopRight",
                  fill: "#ff9600",
                  fontSize: 10,
                }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                interval={0}
                angle={hasUserRecords && chartRows.length > 7 ? -25 : 0}
                textAnchor={
                  hasUserRecords && chartRows.length > 7 ? "end" : "middle"
                }
                height={hasUserRecords && chartRows.length > 7 ? 48 : 30}
              />
              <YAxis
                domain={[70, 200]}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                tickFormatter={(v) => `${v}`}
                width={36}
              />
              <Tooltip
                formatter={(value, _name, item) => {
                  const row = item?.payload as ChartRow | undefined;
                  const status = getGlucoseStatus(
                    Number(value),
                    row?.moment,
                  ).label;
                  const momentPart = row?.moment ? ` · ${row.moment}` : "";
                  const sourcePart = row?.isUserRecord ? " · Tu registro" : "";
                  return [
                    `${value ?? ""} mg/dL · ${status}${momentPart}${sourcePart}`,
                    "Glucosa",
                  ];
                }}
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  borderRadius: "12px",
                  border: "2px solid #e5e7eb",
                  fontSize: "12px",
                  maxWidth: "240px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1cb0f6"
                strokeWidth={2.5}
                dot={<StatusDot />}
                activeDot={{ r: 7, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(STATUS_BADGE) as GlucoseStatusLabel[]).map((label) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_BADGE[label].bg} ${STATUS_BADGE[label].text}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${STATUS_BADGE[label].dot}`}
              />
              {label}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted">{summaryLine}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">
          {STATUS_MESSAGES["Fuera de objetivo"].hint}
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Promedio" value={`${stats.avg}`} unit="mg/dL" />
        <StatCard label="Más alta" value={`${stats.high}`} unit="mg/dL" />
        <StatCard label="Más baja" value={`${stats.low}`} unit="mg/dL" />
        <StatCard
          label="En objetivo"
          value={`${stats.percent}`}
          unit="%"
          hint={`${stats.inRangeCount} de ${stats.total} lecturas con objetivo definido`}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: string;
  unit: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border-2 border-border bg-surface px-4 py-3 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-semibold text-muted">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-text">
        {value}
        <span className="ml-1 text-xs font-medium text-muted">{unit}</span>
      </p>
      {hint && (
        <p className="mt-0.5 text-[10px] font-medium text-muted">{hint}</p>
      )}
    </div>
  );
}
