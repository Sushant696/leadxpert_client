"use client";

import { Archive, Plus, Settings2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useWorkspaceStore from "@/store/workspace-store";
import useGetSinglePipeline from "@/features/pipeline/hooks/useGetSinglePipeline";
import { PipelineSkeleton } from "@/features/pipeline/components/pipelineSkeleton";
import PipelineSettingsModal from "@/features/pipeline/components/settings/PipelineSettingModal";
import CreatePipelineStageModal from "@/features/pipeline/components/CreatePipelineStageModal";
import EmptyPipelineState from "@/features/pipeline/components/EmptyPipelineState";
import statsCards from "@/features/pipeline/pipelineConstants";
import { StatCard } from "@/features/pipeline/components/StatCard";
import { StageColumn } from "@/features/pipeline/components/StageColumn";
import { StarterTemplate } from "@/features/pipeline/templateConstants";
import { showToast } from "@/components/showToast";

function PipelineDashboard() {
  const { pipeline: pipelineId } = useParams<{ pipeline: string }>();
  const { workspace } = useWorkspaceStore();
  const [isPipelineSettingsOpen, setPipelineSettingsOpen] = useState(false);
  const [isCreateStageOpen, setIsCreateStageOpen] = useState(false);
  const [isApplyingTemplate, setIsApplyingTemplate] = useState(false);

  const { data: pipeline, isLoading } = useGetSinglePipeline(
    workspace?.id ?? "",
    pipelineId,
  );
  console.log("Pipeline data:", pipeline, "Loading state:", isLoading);
  if (isLoading) return <PipelineSkeleton />;

  if (!pipeline) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Pipeline not found.
      </div>
    );
  }

  const handleApplyTemplate = async (template: StarterTemplate) => {
    // TODO: Implement bulk stage creation API
    setIsApplyingTemplate(true);

    // Simulate API call - will replace later with actual api
    setTimeout(() => {
      setIsApplyingTemplate(false);
      showToast.info(
        `Template "${template.label}" will create ${template.stages.length} stages. Bulk creation API coming soon!`,
      );
    }, 1000);
  };

  const handleCreateManually = () => {
    setIsCreateStageOpen(true);
  };

  const { stats } = pipeline;
  const hasStages = pipeline.stages.length > 0;

  const formatValue = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: pipeline.currency,
      maximumFractionDigits: 0,
    }).format(val);

  const statCards = statsCards(stats, formatValue);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 px-6 pt-2 pb-4 border-b border-border bg-surface">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                backgroundColor: pipeline.color + "22",
                border: `2px solid ${pipeline.color}`,
              }}
            >
              {pipeline.icon ?? pipeline.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-primary leading-tight">
                  {pipeline.name}
                </h1>
                {pipeline.isArchived && (
                  <Badge variant="secondary" className="text-[10px] gap-1">
                    <Archive size={10} /> Archived
                  </Badge>
                )}
              </div>

              {pipeline.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {pipeline.description}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <Badge variant="outline" className="text-[10px]">
                  {pipeline.currency}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {pipeline.vertical.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {pipeline.stages.length} stage
                  {pipeline.stages.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => setPipelineSettingsOpen(true)}
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
            >
              <Settings2 size={13} /> Settings
            </Button>
            <Button size="sm" className="text-xs gap-1.5">
              <Plus size={13} /> Add Lead
            </Button>
          </div>
        </div>
      </div>

      {hasStages && (
        <div className="shrink-0 px-6 py-4 border-b border-border">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {statCards.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {hasStages ? (
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 p-6 h-full">
            {pipeline.stages.map((stage) => (
              <StageColumn
                key={stage._id}
                stage={stage}
                workspaceId={workspace?.id ?? ""}
                pipelineId={pipelineId}
              />
            ))}

            <div className="shrink-0 w-72 pt-0.5">
              <button
                onClick={() => setIsCreateStageOpen(true)}
                className="w-full h-11 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <Plus size={14} /> Add Stage
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyPipelineState
          pipelineName={pipeline.name}
          onSelectTemplate={handleApplyTemplate}
          onCreateManually={handleCreateManually}
          isLoading={isApplyingTemplate}
        />
      )}
      {isPipelineSettingsOpen && (
        <PipelineSettingsModal
          isOpen={isPipelineSettingsOpen}
          setIsOpen={setPipelineSettingsOpen}
          pipeline={pipeline}
          workspaceId={workspace?.id}
        />
      )}
      <CreatePipelineStageModal
        isOpen={isCreateStageOpen}
        setIsOpen={setIsCreateStageOpen}
        workspaceId={workspace?.id ?? ""}
        pipelineId={pipelineId}
      />
    </div>
  );
}

export default PipelineDashboard;
