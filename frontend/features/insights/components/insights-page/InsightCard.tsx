"use client";

import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  description?: string;
  /** True while the card's query has no data yet (initial load or a pipeline
   * switch that hit a cold cache) — shows a per-card skeleton, keeping the
   * page chrome interactive. */
  isLoading?: boolean;
  isError?: boolean;
  /** True when the query resolved but there isn't enough data to draw a
   * meaningful chart for this pipeline. */
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

export function InsightCard({
  title,
  description,
  isLoading,
  isError,
  isEmpty,
  emptyMessage = "Not enough data yet for this pipeline.",
  children,
}: InsightCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CardSkeleton />
        ) : isError ? (
          <p className="text-sm text-muted-foreground italic py-8 text-center">
            Couldn&apos;t load this yet. Try again in a moment.
          </p>
        ) : isEmpty ? (
          <p className="text-sm text-muted-foreground italic py-8 text-center">
            {emptyMessage}
          </p>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

function CardSkeleton() {
  return (
    <div className="space-y-3 animate-pulse py-2" aria-hidden>
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="flex items-end gap-3 h-40">
        <div className="w-full rounded bg-muted" style={{ height: "60%" }} />
        <div className="w-full rounded bg-muted" style={{ height: "85%" }} />
        <div className="w-full rounded bg-muted" style={{ height: "45%" }} />
      </div>
      <div className="h-3 w-1/2 rounded bg-muted" />
    </div>
  );
}
