"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Kanban, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PipelineErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function PipelineError({ error, reset }: PipelineErrorProps) {
  useEffect(() => {
    console.error("[Pipeline Error]", error);
  }, [error]);

  const isNotFound =
    error.message?.toLowerCase().includes("not found") ||
    error.message?.toLowerCase().includes("pipeline");

  return (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
          {isNotFound ? (
            <Kanban className="h-8 w-8 text-destructive" />
          ) : (
            <AlertCircle className="h-8 w-8 text-destructive" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 max-w-sm">
        <h2 className="text-xl font-semibold text-foreground">
          {isNotFound ? "Pipeline Not Found" : "Failed to Load Pipeline"}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {isNotFound
            ? "This pipeline may have been deleted or you might not have access to it."
            : "An unexpected error occurred while loading this pipeline. Try refreshing or go back to your dashboard."}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 font-mono pt-1">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard" className="gap-2 flex items-center">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PipelineError;
