"use client";

import { Layers } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import useGetStageFunnel from "../hooks/useGetStageFunnel";

function formatDuration(ms: number) {
  const days = ms / (1000 * 60 * 60 * 24);
  if (days < 1) return "<1 day";
  return `${days.toFixed(1)}d`;
}

export function StageFunnelWidget({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading } = useGetStageFunnel(workspaceId);

  const stages = data?.stages ?? [];
  const maxCount = Math.max(1, ...stages.map((s) => s.currentLeadCount));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-primary" />
          <CardTitle className="text-base">Pipeline funnel</CardTitle>
        </div>
        <CardDescription>
          {data?.pipelineName ? `Open leads by stage — ${data.pipelineName}` : "Open leads by stage"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : stages.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No pipeline data yet.</p>
        ) : (
          <div className="space-y-2.5">
            {stages.map((stage) => (
              <div key={stage.stageId} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground truncate">{stage.stageName}</span>
                  <span className="text-muted-foreground shrink-0 ml-2">
                    {stage.currentLeadCount} lead{stage.currentLeadCount === 1 ? "" : "s"}
                    {stage.avgTimeSpentMs != null && (
                      <> · avg {formatDuration(stage.avgTimeSpentMs)}</>
                    )}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.max(4, (stage.currentLeadCount / maxCount) * 100)}%`,
                      backgroundColor: stage.color || "var(--chart-1)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
