import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MlPriority } from "../types/lead-types";

interface ScoreBadgeProps {
  mlScore: number;
  mlPriority: MlPriority | null;
  /** Append the numeric score after the priority label (e.g. "High · 73"). */
  showScore?: boolean;
  className?: string;
}

// Shared tier styling so ScoreBadge and ScoreDetailPanel stay visually in sync.
export const scoreTierConfig: Record<
  MlPriority,
  { dot: string; badge: string; bar: string; label: string }
> = {
  HIGH: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    bar: "bg-emerald-500",
    label: "High",
  },
  MEDIUM: {
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border-amber-200",
    bar: "bg-amber-500",
    label: "Medium",
  },
  LOW: {
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-600 border-red-200",
    bar: "bg-red-500",
    label: "Low",
  },
};

export function ScoreBadge({
  mlScore,
  mlPriority,
  showScore = true,
  className,
}: ScoreBadgeProps) {
  // Not yet scored: backend leaves mlPriority null / mlScore 0 until first score.
  if (!mlPriority || mlScore === 0) {
    return (
      <Badge
        variant="outline"
        className={cn(
          "text-xs text-muted-foreground animate-pulse",
          className,
        )}
      >
        Scoring…
      </Badge>
    );
  }

  const tier = scoreTierConfig[mlPriority];

  return (
    <Badge variant="outline" className={cn("text-xs", tier.badge, className)}>
      <span className={cn("size-1.5 rounded-full shrink-0", tier.dot)} />
      {tier.label}
      {showScore && (
        <span className="opacity-70">· {Math.round(mlScore)}</span>
      )}
    </Badge>
  );
}
