"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetScoreCalibration from "../../hooks/useGetScoreCalibration";
import { GREEN_RAMP, formatRate } from "../../insights-format";
import { InsightCard } from "./InsightCard";

// Minimum resolved (won/lost) leads before per-tier rates are worth drawing.
const MIN_RESOLVED = 5;

// Light → dark green by tier confidence.
const TIER_ORDER = ["LOW", "MEDIUM", "HIGH"] as const;
const TIER_LABEL: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

interface Row {
  tier: string;
  label: string;
  rate: number;
  resolved: number;
  converted: number;
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
      <p className="font-semibold text-foreground mb-1">
        {row.label} confidence
      </p>
      <p className="text-muted-foreground">
        Won:{" "}
        <span className="font-medium text-foreground">
          {row.converted} of {row.resolved}
        </span>
      </p>
      <p className="text-muted-foreground">
        Win rate:{" "}
        <span className="font-medium text-foreground">
          {formatRate(row.rate)}
        </span>
      </p>
    </div>
  );
}

export function ScoringHealthCard({
  workspaceId,
  pipelineId,
}: {
  workspaceId: string;
  pipelineId: string;
}) {
  const { data = [], isLoading, isError } = useGetScoreCalibration(
    workspaceId,
    pipelineId,
  );

  const byTier = new Map(data.map((r) => [r.tier, r]));
  const totalResolved = TIER_ORDER.reduce(
    (sum, tier) => sum + (byTier.get(tier)?.resolvedTotal ?? 0),
    0,
  );

  const rows: Row[] = TIER_ORDER.map((tier, i) => {
    const r = byTier.get(tier);
    return {
      tier,
      label: TIER_LABEL[tier],
      rate: r?.resolvedConversionRate ?? 0,
      resolved: r?.resolvedTotal ?? 0,
      converted: r?.resolvedConverted ?? 0,
      color: GREEN_RAMP[i],
    };
  });

  return (
    <InsightCard
      title="Is our scoring working?"
      description="Win rate for leads the system rated Low, Medium and High. Higher-rated leads should win more often."
      isLoading={isLoading}
      isError={isError}
      isEmpty={totalResolved < MIN_RESOLVED}
      emptyMessage="Not enough closed leads yet for this pipeline to tell."
    >
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="rate" maxBarSize={64} radius={[4, 4, 0, 0]}>
              {rows.map((row) => (
                <Cell key={row.tier} fill={row.color} />
              ))}
              <LabelList
                dataKey="rate"
                position="top"
                formatter={(value) => formatRate(Number(value))}
                className="fill-foreground"
                style={{ fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </InsightCard>
  );
}
