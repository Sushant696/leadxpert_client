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
import { SortableStageColumn } from "@/features/pipeline/components/SortableStageColumn";
import { StarterTemplate } from "@/features/pipeline/templateConstants";
import useBulkCreatePipelineStage from "@/features/pipeline/hooks/useBulkCreatePipelineStage";
import useReorderPipelineStages from "@/features/pipeline/hooks/useReorderPipelineStages";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { PipelineStageRef } from "@/features/pipeline/types/pipeline-types";
import useGetLeads from "@/features/lead/hooks/useGetLeads";
import { CreateLeadModal } from "@/features/lead/components/CreateLeadModal";

function PipelineDashboard() {
  const { pipeline: pipelineId } = useParams<{ pipeline: string }>();
  const { workspace } = useWorkspaceStore();
  const [isPipelineSettingsOpen, setPipelineSettingsOpen] = useState(false);
  const [isCreateStageOpen, setIsCreateStageOpen] = useState(false);
  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false);
  const [isApplyingTemplate, setIsApplyingTemplate] = useState(false);
  const bulkCreateStageMutation = useBulkCreatePipelineStage(
    workspace?.id ?? "",
    pipelineId,
  );
  const reorderMutation = useReorderPipelineStages(
    workspace?.id ?? "",
    pipelineId,
  );
  const [optimisticStages, setOptimisticStages] = useState<
    PipelineStageRef[] | null
  >(null);

  const { data: pipeline, isLoading } = useGetSinglePipeline(
    workspace?.id ?? "",
    pipelineId,
  );

  const { data: allLeads = [], isLoading: isLoadingLeads } = useGetLeads(
    workspace?.id ?? "",
    pipelineId,
  );

  if (isLoading) return <PipelineSkeleton />;

  if (!pipeline) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Pipeline not found.
      </div>
    );
  }

  const handleApplyTemplate = async (template: StarterTemplate) => {
    await bulkCreateStageMutation.mutateAsync(template.id);
    setIsApplyingTemplate(true);
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
            <Button
              onClick={() => setIsCreateLeadOpen(true)}
              size="sm"
              className="text-xs gap-1.5"
            >
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
        <DragDropProvider
          onDragEnd={(event) => {
            const stages = optimisticStages ?? pipeline.stages;
            const stageIds = stages.map((s) => s._id);
            const reorderedIds = move(stageIds, event) as string[];

            const orderChanged = stageIds.some(
              (id, i) => id !== reorderedIds[i],
            );

            if (orderChanged) {
              const stageMap = new Map(stages.map((s) => [s._id, s]));
              const reordered = reorderedIds.map((id) => stageMap.get(id)!);

              setOptimisticStages(reordered);
              reorderMutation.mutate(
                { stageIds: reorderedIds },
                {
                  onSettled: () => setOptimisticStages(null),
                },
              );
            }
          }}
        >
          <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <div className="flex gap-4 p-6 h-full">
              {(optimisticStages ?? pipeline.stages).map((stage, index) => (
                <SortableStageColumn
                  key={stage._id}
                  stage={stage}
                  workspaceId={workspace?.id ?? ""}
                  pipelineId={pipelineId}
                  index={index}
                  leads={allLeads}
                  isLoadingLeads={isLoadingLeads}
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
        </DragDropProvider>
      ) : (
        <EmptyPipelineState
          pipelineName={pipeline.name}
          mutation={bulkCreateStageMutation}
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
      <CreateLeadModal
        isOpen={isCreateLeadOpen}
        onClose={() => setIsCreateLeadOpen(false)}
        workspaceId={workspace?.id ?? ""}
        pipelineId={pipelineId}
      />
    </div>
  );
}

export default PipelineDashboard;
