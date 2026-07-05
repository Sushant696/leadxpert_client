"use client";

import { AlertTriangle } from "lucide-react";

import useGetAtRiskValue from "../hooks/useGetAtRiskValue";

// Aggregated across all of a workspace's leads, which may mix currencies in
// theory — NPR (the platform default, see Currency enum) is used as the
// display currency for these summed stat tiles.
const DISPLAY_CURRENCY = "NPR";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function AtRiskValueCard({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading } = useGetAtRiskValue(workspaceId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading at-risk leads…</p>;
  }
  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <div className="flex items-center gap-1.5 text-xs text-destructive mb-1">
            <AlertTriangle size={12} />
            Rotten leads
          </div>
          <p className="text-2xl font-bold text-destructive">{data.count}</p>
        </div>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <div className="flex items-center gap-1.5 text-xs text-destructive mb-1">
            <AlertTriangle size={12} />
            Value at risk
          </div>
          <p className="text-2xl font-bold text-destructive">
            {formatCurrency(data.value, DISPLAY_CURRENCY)}
          </p>
        </div>
      </div>

      {data.byStage.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left font-medium py-1.5">Stage</th>
                <th className="text-right font-medium py-1.5">Leads</th>
                <th className="text-right font-medium py-1.5">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.byStage.map((row) => (
                <tr key={row.stageId} className="border-b border-border/50 last:border-0">
                  <td className="py-1.5 font-medium text-foreground">
                    {row.stageName ?? "Unknown stage"}
                  </td>
                  <td className="py-1.5 text-right text-foreground">{row.count}</td>
                  <td className="py-1.5 text-right text-foreground">
                    {formatCurrency(row.value, DISPLAY_CURRENCY)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
