"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import useGetSourcePerformance from "../hooks/useGetSourcePerformance";
import { SourcePerformanceRow } from "../insights-types";

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: SourcePerformanceRow & { label: string } }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground">{row.label}</p>
      <p className="text-muted-foreground">
        Leads: <span className="font-medium text-foreground">{row.total}</span> · Converted:{" "}
        <span className="font-medium text-foreground">{row.converted}</span>
      </p>
      <p className="text-muted-foreground">
        Avg value: <span className="font-medium text-foreground">{row.avgValue.toLocaleString()}</span>
      </p>
      <p className="text-muted-foreground">
        Avg ML score: <span className="font-medium text-foreground">{row.avgMlScore}</span>
      </p>
    </div>
  );
}

export function SourcePerformanceChart({ workspaceId }: { workspaceId: string }) {
  const { data = [], isLoading } = useGetSourcePerformance(workspaceId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading source performance…</p>;
  }
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground italic">No leads with a source yet.</p>;
  }

  const chartData = [...data]
    .sort((a, b) => a.conversionRate - b.conversionRate)
    .map((row) => ({ ...row, label: toTitleCase(row.source) }));

  const height = Math.max(200, chartData.length * 32);

  return (
    <div className="h-full w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 32, left: 8, bottom: 4 }}>
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)" }} />
          <Bar
            dataKey="conversionRate"
            name="Conversion rate"
            fill="var(--chart-1)"
            maxBarSize={18}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
