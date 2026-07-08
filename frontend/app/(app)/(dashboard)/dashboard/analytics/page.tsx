"use client";

import { ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import useWorkspaceStore from "@/store/workspace-store";
import { RESOURCE_BASED_ROLES } from "@/types/user";
import { ScoreCalibrationChart } from "@/features/insights/components/ScoreCalibrationChart";
import { ConfusionMatrixCard } from "@/features/insights/components/ConfusionMatrixCard";
import { PriorityMismatchTable } from "@/features/insights/components/PriorityMismatchTable";
import { AtRiskValueCard } from "@/features/insights/components/AtRiskValueCard";
import { FeatureImportanceChart } from "@/features/insights/components/FeatureImportanceChart";
import { SourcePerformanceChart } from "@/features/insights/components/SourcePerformanceChart";

function Page() {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const isSuperAdmin = workspace?.role === RESOURCE_BASED_ROLES.SUPER_ADMIN;

  if (!workspace) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-full text-center p-6">
        <p className="text-sm text-muted-foreground">Select a workspace to view insights.</p>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-full text-center p-6">
        <div className="p-3 bg-destructive/10 rounded-full text-destructive">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Super admin only</h2>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            ML insights are restricted to the workspace owner. Ask your workspace&apos;s
            super admin for access.
          </p>
        </div>
      </div>
    );
  }

  const workspaceId = workspace.id;

  return (
    <div className="space-y-6 mx-auto pb-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Insights</h1>
        <p className="text-sm text-muted-foreground">
          How well the lead-scoring model predicts real outcomes for {workspace.name}, and where
          it&apos;s pointing your sales effort.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Score-tier conversion calibration</CardTitle>
            <CardDescription>
              Actual converted / lost / open outcomes for leads in each ML priority tier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScoreCalibrationChart workspaceId={workspaceId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Confusion matrix</CardTitle>
            <CardDescription>
              HIGH priority treated as &quot;predicted to convert,&quot; scored against resolved leads only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConfusionMatrixCard workspaceId={workspaceId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">ML vs. rep priority mismatch</CardTitle>
            <CardDescription>
              Open leads where the model and the assigned rep disagree on priority.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PriorityMismatchTable workspaceId={workspaceId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">At-risk pipeline value</CardTitle>
            <CardDescription>Open leads flagged stale (rotten), by stage.</CardDescription>
          </CardHeader>
          <CardContent>
            <AtRiskValueCard workspaceId={workspaceId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Feature importance</CardTitle>
            <CardDescription>
              What the model weighs most heavily when scoring a lead (from training evaluation).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeatureImportanceChart workspaceId={workspaceId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Lead source performance</CardTitle>
            <CardDescription>
              Conversion rate by source — lead_source is the model&apos;s single strongest signal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SourcePerformanceChart workspaceId={workspaceId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
