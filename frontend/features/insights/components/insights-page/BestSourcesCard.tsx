"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetSourcePerformance from "../../hooks/useGetSourcePerformance";
import {
  NEUTRAL,
  GREEN_RAMP,
  formatCurrency,
  formatRate,
  toTitleCase,
} from "../../insights-format";
import { InsightCard } from "./InsightCard";

const MAX_SOURCES = 8;
// A source needs at least this many leads before its win rate is trustworthy.
const MIN_LEADS = 3;

interface Row {
  label: string;
  conversionRate: number;
  total: number;
  converted: number;
  avgValue: number;
  color: string;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Row }[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground mb-1">{row.label}</p>
      <p className="text-muted-foreground">
        Win rate:{" "}
        <span className="font-medium text-foreground">
          {formatRate(row.conversionRate)}
        </span>
      </p>
      <p className="text-muted-foreground">
        Leads:{" "}
        <span className="font-medium text-foreground">
          {row.converted} won of {row.total}
        </span>
      </p>
      <p className="text-muted-foreground">
        Avg deal size:{" "}
        <span className="font-medium text-foreground">
          {formatCurrency(row.avgValue)}
        </span>
      </p>
    </div>
  );
}

export function BestSourcesCard({
  workspaceId,
  pipelineId,
}: {
  workspaceId: string;
  pipelineId: string;
}) {
  const { data = [], isLoading, isError } = useGetSourcePerformance(
    workspaceId,
    pipelineId,
  );

  // Only rank sources with enough leads to be meaningful; already sorted by
  // win rate descending server-side.
  const eligible = data.filter((r) => r.total >= MIN_LEADS).slice(0, MAX_SOURCES);

  const rows: Row[] = eligible.map((r, i) => ({
    label: toTitleCase(r.source),
    conversionRate: r.conversionRate,
    total: r.total,
    converted: r.converted,
    avgValue: r.avgValue,
    // Top performer green, everyone else neutral gray.
    color: i === 0 ? GREEN_RAMP[2] : NEUTRAL,
  }));

  const height = Math.max(200, rows.length * 40);

  return (
    <InsightCard
      title="Best sources to invest in"
      description="Which lead sources actually convert. The top performer is highlighted."
      isLoading={isLoading}
      isError={isError}
      isEmpty={rows.length === 0}
      emptyMessage="Not enough leads with a known source yet for this pipeline."
    >
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
          >
            <CartesianGrid horizontal={false} stroke="var(--border)" />
            <XAxis
              type="number"
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={110}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="conversionRate" maxBarSize={22} radius={[0, 4, 4, 0]}>
              {rows.map((row, i) => (
                <Cell key={i} fill={row.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </InsightCard>
  );
}
