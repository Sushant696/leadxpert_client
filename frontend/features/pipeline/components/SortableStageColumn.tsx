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
  const { ref, isDragging, isDropTarget } = useSortable({
    id: stage._id,
    index,
    data: {
      type: "Stage",
      stage,
    },
  });
  // `leads` is already the pre-bucketed slice for this stage (bucketed once in
  // the board), so no per-render filtering is needed here.
  return (
    <div
      ref={ref}
      className={`shrink-0 w-80 h-full min-h-0 flex flex-col gap-2 transition-opacity ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <StageColumn
        stage={stage}
        workspaceId={workspaceId}
        pipelineId={pipelineId}
        leads={leads}
        isLoadingLeads={isLoadingLeads}
        isDropTarget={isDropTarget}
      />
    </div>
  );
}
