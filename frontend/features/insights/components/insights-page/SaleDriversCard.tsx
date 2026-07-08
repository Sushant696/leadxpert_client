"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import useGetDriverRanking from "../../hooks/useGetDriverRanking";
import { grayToTeal } from "../../insights-format";
import { InsightCard } from "./InsightCard";

export function SaleDriversCard({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading, isError } = useGetDriverRanking(workspaceId);

  const drivers = data?.drivers ?? [];
  const rows = drivers.map((d) => ({
    ...d,
    color: grayToTeal(d.weight / 100),
  }));

  const height = Math.max(200, rows.length * 40);

  return (
    <InsightCard
      title="What actually drives a sale"
      description="The signals that most separate leads that win from leads that don't."
      isLoading={isLoading}
      isError={isError}
      isEmpty={rows.length === 0}
    >
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="label"
              width={170}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="weight" maxBarSize={22} radius={[0, 4, 4, 0]}>
              {rows.map((row, i) => (
                <Cell key={i} fill={row.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Relative influence — the longer the bar, the more it moves the outcome.
      </p>
    </InsightCard>
  );
}
