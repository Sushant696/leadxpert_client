"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { Lead } from "../types/lead-types";

interface ScoreTrendChartProps {
  lead: Lead;
  // Height of the plot area. Taller when the chart is shown full-width (lots of
  // history), shorter in the compact side-by-side layout (little history).
  chartHeightClassName?: string;
}

interface TrendPoint {
  scoredAt: string;
  // Sequential position of this rescore (0-based). Used as the X value so
  // points are spaced evenly per event rather than by real elapsed time —
  // bursts of same-second rescores don't clump and idle gaps don't stretch.
  // Being unique per point also keeps the tooltip mapped to the right score
  // (a shared date category would collapse same-day points onto the first).
  idx: number;
  score: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: TrendPoint }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground">
        {new Date(point.scoredAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <p className="text-muted-foreground mt-0.5">
        Score: <span className="font-medium text-foreground">{point.score}</span>
      </p>
    </div>
  );
}

export function ScoreTrendChart({
  lead,
  chartHeightClassName = "h-40",
}: ScoreTrendChartProps) {
  const history = lead.scoreHistory ?? [];

  const chartData: TrendPoint[] = history
    .map((entry) => ({
      scoredAt: entry.scoredAt,
      score: Math.round(entry.score),
    }))
    .sort(
      (a, b) => new Date(a.scoredAt).getTime() - new Date(b.scoredAt).getTime(),
    )
    // Assign the evenly-spaced X position only after sorting chronologically.
    .map((point, idx) => ({ ...point, idx }));

  // Map an x value (rescore index) back to its date for the axis ticks.
  const formatDateTick = (idx: number) => {
    const point = chartData[idx];
    if (!point) return "";
    return new Date(point.scoredAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <TrendingUp size={14} className="text-primary" />
        Score Trend
      </h3>

      {/* Need at least two points to draw a line — otherwise show a placeholder
          rather than an empty/broken chart. */}
      {chartData.length < 2 ? (
        <p className="text-xs text-muted-foreground">
          Not enough data yet. The trend appears once this lead has been scored
          at least twice.
        </p>
      ) : (
        <div className={cn("w-full", chartHeightClassName)}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="idx"
                type="category"
                tickFormatter={formatDateTick}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                // Fixed 0–100 (the schema's score range) so the trend direction
                // reads honestly rather than being exaggerated by auto-scaling.
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 2.5, fill: "var(--primary)" }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
