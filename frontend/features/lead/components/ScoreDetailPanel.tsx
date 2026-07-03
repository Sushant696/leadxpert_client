import { formatDistanceToNow } from "date-fns";
import { Sparkles, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lead, ScoreFeatures } from "../types/lead-types";
import useScoreLead from "../hooks/useScoreLead";
import { ScoreBadge, scoreTierConfig } from "./ScoreBadge";

interface ScoreDetailPanelProps {
  lead: Lead;
}

// The 5 most explanatory features (mirrors the model's top importances), each
// with a human-readable label and a formatter for its raw value.
const FEATURE_ROWS: {
  key: keyof ScoreFeatures;
  label: string;
  format: (value: number | string) => string;
}[] = [
  {
    key: "stage_probability",
    label: "Stage Win Likelihood",
    format: (v) => `${Math.round(Number(v))}%`,
  },
  {
    key: "is_rotten",
    label: "Lead is Stale",
    format: (v) => (Number(v) ? "Yes" : "No"),
  },
  {
    key: "lead_source",
    label: "Lead Source",
    format: (v) =>
      String(v)
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    key: "activity_count",
    label: "Total Interactions",
    format: (v) => String(Math.round(Number(v))),
  },
  {
    key: "stage_index",
    label: "Pipeline Position",
    format: (v) => String(Math.round(Number(v))),
  },
];

export function ScoreDetailPanel({ lead }: ScoreDetailPanelProps) {
  // workspaceId/pipelineId live on the lead doc; used to invalidate the right
  // queries after a re-score.
  const scoreMutation = useScoreLead(
    lead.workspaceId,
    lead.pipelineId,
    lead._id,
  );

  const isScored = !!lead.mlPriority && lead.mlScore > 0;
  const tier = lead.mlPriority ? scoreTierConfig[lead.mlPriority] : null;
  const score = Math.round(lead.mlScore ?? 0);
  const features = lead.scoreFeatures;

  return (
    <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
          <Sparkles size={14} />
          Lead Score
        </h3>
        <ScoreBadge mlScore={lead.mlScore} mlPriority={lead.mlPriority ?? null} />
      </div>

      {isScored ? (
        <>
          {/* Big score + progress bar coloured by tier */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold text-foreground leading-none">
                {score}
              </span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  tier?.bar ?? "bg-primary",
                )}
                style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{score}%</span>{" "}
              conversion probability
            </p>
          </div>

          {/* Top features */}
          {features && (
            <div className="space-y-2 border-t border-border pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Top Factors
              </p>
              <dl className="space-y-1.5">
                {FEATURE_ROWS.map(({ key, label, format }) => {
                  const value = features[key];
                  if (value === undefined || value === null) return null;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between text-xs"
                    >
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium text-foreground">
                        {format(value)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}
        </>
      ) : (
        <p className="text-xs text-muted-foreground">
          This lead hasn&apos;t been scored yet. Run a score to estimate its
          conversion likelihood.
        </p>
      )}

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-[11px] text-muted-foreground">
          {lead.lastScoredAt
            ? `Scored ${formatDistanceToNow(new Date(lead.lastScoredAt), {
                addSuffix: true,
              })}`
            : "Never scored"}
        </span>
        <Button
          variant="outline"
          size="xs"
          onClick={() => scoreMutation.mutate()}
          disabled={scoreMutation.isPending}
        >
          <RefreshCw
            size={12}
            className={cn(scoreMutation.isPending && "animate-spin")}
          />
          {scoreMutation.isPending ? "Scoring…" : "Re-score"}
        </Button>
      </div>
    </div>
  );
}
