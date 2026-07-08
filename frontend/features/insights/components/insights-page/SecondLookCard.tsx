"use client";

import { Flag } from "lucide-react";
import { format } from "date-fns";

import useGetPriorityMismatch from "../../hooks/useGetPriorityMismatch";
import {
  AMBER,
  formatCurrency,
  toTitleCase,
} from "../../insights-format";
import { InsightCard } from "./InsightCard";

const MAX_ROWS = 10;

function lastContactLabel(value: string | null): string {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return format(date, "MMM d, yyyy");
}

export function SecondLookCard({
  workspaceId,
  pipelineId,
}: {
  workspaceId: string;
  pipelineId: string;
}) {
  const { data = [], isLoading, isError } = useGetPriorityMismatch(
    workspaceId,
    pipelineId,
  );

  // Highest-value disagreements first, capped to a readable list.
  const rows = [...data].sort((a, b) => b.value - a.value).slice(0, MAX_ROWS);

  return (
    <InsightCard
      title="Leads worth a second look"
      description="Open leads where the system's rating disagrees with your team's — worth a gut check."
      isLoading={isLoading}
      isError={isError}
      isEmpty={rows.length === 0}
      emptyMessage="Your team and the system agree on every open lead here."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left font-medium py-1.5">Lead</th>
              <th className="text-left font-medium py-1.5">Your rating</th>
              <th className="text-left font-medium py-1.5">System says</th>
              <th className="text-right font-medium py-1.5">Value</th>
              <th className="text-right font-medium py-1.5">Last contact</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.leadId}
                className="border-b border-border/50 last:border-0"
              >
                <td className="py-2 pr-2">
                  <div className="flex items-center gap-1.5">
                    <Flag size={12} style={{ color: AMBER }} className="shrink-0" />
                    <span className="font-medium text-foreground truncate max-w-[140px]">
                      {row.title}
                    </span>
                  </div>
                  {row.contactName ? (
                    <span className="text-muted-foreground pl-[18px]">
                      {row.contactName}
                    </span>
                  ) : null}
                </td>
                <td className="py-2 text-foreground">
                  {toTitleCase(row.humanPriority)}
                </td>
                <td className="py-2 text-foreground">
                  {toTitleCase(row.mlPriority)}
                </td>
                <td className="py-2 text-right text-foreground">
                  {formatCurrency(row.value)}
                </td>
                <td className="py-2 text-right text-muted-foreground whitespace-nowrap">
                  {lastContactLabel(row.lastContactedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InsightCard>
  );
}
