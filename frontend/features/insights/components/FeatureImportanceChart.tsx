"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import useGetFeatureImportance from "../hooks/useGetFeatureImportance";

const featureLabel: Record<string, string> = {
  lead_source: "Lead source",
  activity_count: "Activity count",
  is_rotten: "Is stale (rotten)",
  stage_probability: "Stage win probability",
  stage_index: "Pipeline stage position",
  days_since_last_contact: "Days since last contact",
  task_count: "Task count",
  days_in_pipeline: "Days in pipeline",
  note_count: "Note count",
  lead_value: "Lead value",
  time_in_current_stage: "Time in current stage",
  human_priority: "Rep-set priority",
  has_upcoming_task: "Has upcoming task",
  business_vertical: "Business vertical",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { label: string; importance: number } }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground">{row.label}</p>
      <p className="text-muted-foreground">
        Importance: <span className="font-medium text-foreground">{(row.importance * 100).toFixed(1)}%</span>
      </p>
    </div>
  );
}

export function FeatureImportanceChart({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading } = useGetFeatureImportance(workspaceId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading feature importance…</p>;
  }
  if (!data) return null;

  const chartData = [...data.features]
    .sort((a, b) => a.importance - b.importance)
    .map((f) => ({ ...f, label: featureLabel[f.feature] ?? f.feature }));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>
          Model: <span className="font-medium text-foreground">{data.model}</span>
        </span>
        <span>
          Accuracy: <span className="font-medium text-foreground">{(data.metrics.accuracy * 100).toFixed(1)}%</span>
        </span>
        <span>
          F1: <span className="font-medium text-foreground">{(data.metrics.f1 * 100).toFixed(1)}%</span>
        </span>
        <span>
          AUC-ROC: <span className="font-medium text-foreground">{(data.metrics.aucRoc * 100).toFixed(1)}%</span>
        </span>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
          >
            <CartesianGrid horizontal={false} stroke="var(--border)" />
            <XAxis
              type="number"
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={150}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey="importance" maxBarSize={18} radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.feature}
                  fill="var(--chart-1)"
                  fillOpacity={0.5 + entry.importance * 1.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
