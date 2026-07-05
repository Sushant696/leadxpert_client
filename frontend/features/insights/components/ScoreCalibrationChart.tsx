"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useGetScoreCalibration from "../hooks/useGetScoreCalibration";
import { ScoreCalibrationTier } from "../insights-types";

const tierLabel: Record<string, string> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
  UNSCORED: "Unscored",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ScoreCalibrationTier }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground mb-1">{tierLabel[label] ?? label}</p>
      <p className="text-muted-foreground">
        Converted: <span className="font-medium text-foreground">{row.converted}</span>
      </p>
      <p className="text-muted-foreground">
        Lost: <span className="font-medium text-foreground">{row.lost}</span>
      </p>
      <p className="text-muted-foreground">
        Open: <span className="font-medium text-foreground">{row.open}</span>
      </p>
      <p className="text-muted-foreground mt-1 pt-1 border-t border-border">
        Conversion rate:{" "}
        <span className="font-medium text-foreground">{row.conversionRate}%</span>
      </p>
    </div>
  );
}

export function ScoreCalibrationChart({ workspaceId }: { workspaceId: string }) {
  const { data = [], isLoading } = useGetScoreCalibration(workspaceId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading calibration data…</p>;
  }

  const chartData = data.map((row) => ({ ...row, tierLabel: tierLabel[row.tier] ?? row.tier }));

  return (
    <div className="space-y-4">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="tierLabel"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
              formatter={(value) => <span className="text-muted-foreground">{value}</span>}
            />
            <Bar
              dataKey="converted"
              name="Converted"
              stackId="outcome"
              fill="var(--chart-outcome-converted)"
              maxBarSize={24}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="lost"
              name="Lost"
              stackId="outcome"
              fill="var(--chart-outcome-lost)"
              maxBarSize={24}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="open"
              name="Open"
              stackId="outcome"
              fill="var(--chart-outcome-neutral)"
              maxBarSize={24}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table view — same data, exact numbers */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left font-medium py-1.5">Tier</th>
              <th className="text-right font-medium py-1.5">Total</th>
              <th className="text-right font-medium py-1.5">Converted</th>
              <th className="text-right font-medium py-1.5">Lost</th>
              <th className="text-right font-medium py-1.5">Open</th>
              <th className="text-right font-medium py-1.5">Conv. rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.tier} className="border-b border-border/50 last:border-0">
                <td className="py-1.5 font-medium text-foreground">{tierLabel[row.tier] ?? row.tier}</td>
                <td className="py-1.5 text-right text-foreground">{row.total}</td>
                <td className="py-1.5 text-right text-foreground">{row.converted}</td>
                <td className="py-1.5 text-right text-foreground">{row.lost}</td>
                <td className="py-1.5 text-right text-foreground">{row.open}</td>
                <td className="py-1.5 text-right font-medium text-foreground">
                  {row.conversionRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
