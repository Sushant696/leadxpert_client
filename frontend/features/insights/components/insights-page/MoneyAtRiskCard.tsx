"use client";

import { AlertTriangle } from "lucide-react";

import useGetAtRiskValue from "../../hooks/useGetAtRiskValue";
import { AMBER, formatCount, formatCurrency } from "../../insights-format";
import { InsightCard } from "./InsightCard";

export function MoneyAtRiskCard({
  workspaceId,
  pipelineId,
}: {
  workspaceId: string;
  pipelineId: string;
}) {
  const { data, isLoading, isError } = useGetAtRiskValue(workspaceId, pipelineId);

  const isEmpty = !!data && data.count === 0;

  return (
    <InsightCard
      title="Money at risk"
      description="Open leads going stale — value that could slip away without follow-up."
      isLoading={isLoading}
      isError={isError}
      isEmpty={isEmpty}
      emptyMessage="Nothing going stale right now — every open lead has recent activity."
    >
      {data ? (
        <div className="space-y-4">
          <div
            className="rounded-lg border p-4"
            style={{
              borderColor: `${AMBER}55`,
              backgroundColor: `${AMBER}12`,
            }}
          >
            <div
              className="flex items-center gap-1.5 text-xs mb-1"
              style={{ color: AMBER }}
            >
              <AlertTriangle size={13} />
              Value at risk
            </div>
            <p className="text-3xl font-bold" style={{ color: AMBER }}>
              {formatCurrency(data.value)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              across {formatCount(data.count)}{" "}
              {data.count === 1 ? "lead" : "leads"}
            </p>
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
                    <tr
                      key={row.stageId}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-1.5 font-medium text-foreground">
                        {row.stageName ?? "Unknown stage"}
                      </td>
                      <td className="py-1.5 text-right text-foreground">
                        {formatCount(row.count)}
                      </td>
                      <td className="py-1.5 text-right text-foreground">
                        {formatCurrency(row.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </InsightCard>
  );
}
