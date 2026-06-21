import { useSortable } from "@dnd-kit/react/sortable";
import { PipelineStageRef } from "../types/pipeline-types";
import { StageColumn } from "./StageColumn";
import { Lead } from "@/features/lead/types/lead-types";

interface SortableStageColumnProps {
  stage: PipelineStageRef;
  workspaceId: string;
  pipelineId: string;
  index: number;
  leads: Lead[];
  isLoadingLeads: boolean;
}

export function SortableStageColumn({
  stage,
  workspaceId,
  pipelineId,
  index,
  leads,
  isLoadingLeads,
}: SortableStageColumnProps) {
  const { ref, isDragging } = useSortable({
    id: stage._id,
    index,
  });
  const stageLeads = leads.filter((lead) => lead.stageId._id === stage._id);
  return (
    <div
      ref={ref}
      className={`shrink-0 transition-opacity ${isDragging ? "opacity-50" : ""}`}
    >
      <StageColumn
        stage={stage}
        workspaceId={workspaceId}
        pipelineId={pipelineId}
        leads={stageLeads}
        isLoadingLeads={isLoadingLeads}
      />
    </div>
  );
}

