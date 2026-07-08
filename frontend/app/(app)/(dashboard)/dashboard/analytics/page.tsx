"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlert } from "lucide-react";

import useWorkspaceStore from "@/store/workspace-store";
import { RESOURCE_BASED_ROLES } from "@/types/user";
import {
  PipelineFilter,
  ALL_PIPELINES,
} from "@/features/insights/components/insights-page/PipelineFilter";
import { ScoringHealthCard } from "@/features/insights/components/insights-page/ScoringHealthCard";
import { BestSourcesCard } from "@/features/insights/components/insights-page/BestSourcesCard";
import { SaleDriversCard } from "@/features/insights/components/insights-page/SaleDriversCard";
import { MoneyAtRiskCard } from "@/features/insights/components/insights-page/MoneyAtRiskCard";
import { SecondLookCard } from "@/features/insights/components/insights-page/SecondLookCard";
import { DealsFallApartCard } from "@/features/insights/components/insights-page/DealsFallApartCard";

// Route this page lives at — the selected pipeline is kept in this route's URL
// query so the view is shareable and survives a refresh.
const ROUTE = "/dashboard/analytics";

function AnalyticsContent() {
  const workspace = useWorkspaceStore((state) => state.workspace);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!workspace) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-full text-center p-6">
        <p className="text-sm text-muted-foreground">
          Select a workspace to view insights.
        </p>
      </div>
    );
  }

  if (workspace.role !== RESOURCE_BASED_ROLES.SUPER_ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-full text-center p-6">
        <div className="p-3 bg-destructive/10 rounded-full text-destructive">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Super admin only</h2>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Insights are restricted to the workspace owner. Ask your
            workspace&apos;s super admin for access.
          </p>
        </div>
      </div>
    );
  }

  const workspaceId = workspace.id;
  // Absent param == the workspace-wide "All pipelines" view.
  const pipelineId = searchParams.get("pipelineId") || ALL_PIPELINES;

  const handlePipelineChange = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === ALL_PIPELINES) {
      params.delete("pipelineId");
    } else {
      params.set("pipelineId", next);
    }
    const query = params.toString();
    router.replace(query ? `${ROUTE}?${query}` : ROUTE, { scroll: false });
  };

  return (
    <div className="space-y-6 mx-auto pb-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Insights</h1>
          <p className="text-sm text-muted-foreground">
            Where your leads are winning, stalling, and slipping away across{" "}
            {workspace.name}.
          </p>
        </div>
        <PipelineFilter
          workspaceId={workspaceId}
          value={pipelineId}
          onChange={handlePipelineChange}
        />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoringHealthCard workspaceId={workspaceId} pipelineId={pipelineId} />
        <BestSourcesCard workspaceId={workspaceId} pipelineId={pipelineId} />
        <SaleDriversCard workspaceId={workspaceId} />
        <MoneyAtRiskCard workspaceId={workspaceId} pipelineId={pipelineId} />
        <SecondLookCard workspaceId={workspaceId} pipelineId={pipelineId} />
        <DealsFallApartCard workspaceId={workspaceId} pipelineId={pipelineId} />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm text-muted-foreground">Loading insights…</div>
      }
    >
      <AnalyticsContent />
    </Suspense>
  );
}
