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

import useGetLossStageBreakdown from "../../hooks/useGetLossStageBreakdown";
import {
  AMBER_RAMP,
  formatCount,
  formatCurrency,
} from "../../insights-format";
import { InsightCard } from "./InsightCard";

const MAX_STAGES = 8;

interface Row {
  stageName: string;
  count: number;
  value: number;
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
      <p className="font-semibold text-foreground mb-1">{row.stageName}</p>
      <p className="text-muted-foreground">
        Lost:{" "}
        <span className="font-medium text-foreground">
          {formatCount(row.count)} {row.count === 1 ? "deal" : "deals"}
        </span>
      </p>
      <p className="text-muted-foreground">
        Value lost:{" "}
        <span className="font-medium text-foreground">
          {formatCurrency(row.value)}
        </span>
      </p>
    </div>
  );
}

export function DealsFallApartCard({
  workspaceId,
  pipelineId,
}: {
  workspaceId: string;
  pipelineId: string;
}) {
  const { data, isLoading, isError } = useGetLossStageBreakdown(
    workspaceId,
    pipelineId,
  );

  const stages = data?.stages ?? [];
  const rows: Row[] = stages.slice(0, MAX_STAGES).map((s, i) => ({
    stageName: s.stageName,
    count: s.count,
    value: s.value,
    // Amber ramp, darkest for the biggest loss.
    color: AMBER_RAMP[Math.min(i, AMBER_RAMP.length - 1)],
  }));

  const height = Math.max(200, rows.length * 40);

  return (
    <InsightCard
      title="Where deals fall apart"
      description="The stage leads were in right before they were marked lost — where deals slip away."
      isLoading={isLoading}
      isError={isError}
      isEmpty={rows.length === 0}
      emptyMessage="No lost deals with enough history to pinpoint a stage yet."
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
              allowDecimals={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="stageName"
              width={120}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="count" name="Deals lost" maxBarSize={22} radius={[0, 4, 4, 0]}>
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
