"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

// Route-level error boundary for the lead detail page. Next.js renders this
// whenever the page (or a child) throws during render/data-fetching, passing
// the thrown error and a `reset()` to retry the segment.
export default function LeadDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Surface for logging/monitoring; digest correlates with server logs.
    console.error("Lead detail page error:", error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle size={22} />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">
          Couldn&apos;t load this lead
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Something went wrong while loading the lead details. You can try again
          or head back to your leads.
        </p>
        {error.digest && (
          <p className="pt-1 text-xs text-muted-foreground/70">
            Reference: {error.digest}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={14} /> Go back
        </Button>
        <Button size="sm" onClick={() => reset()}>
          <RotateCcw size={14} /> Try again
        </Button>
      </div>
    </div>
  );
}
