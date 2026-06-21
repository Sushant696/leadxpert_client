"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import { PipelineStageRef } from "../types/pipeline-types";
import { StageColumn } from "./StageColumn";

interface SortableStageColumnProps {
  stage: PipelineStageRef;
  workspaceId: string;
  pipelineId: string;
  index: number;
}

export function SortableStageColumn({
  stage,
  workspaceId,
  pipelineId,
  index,
}: SortableStageColumnProps) {
  const { ref, isDragging } = useSortable({
    id: stage._id,
    index,
  });

  return (
    <div
      ref={ref}
      className={`shrink-0 transition-opacity ${isDragging ? "opacity-50" : ""}`}
    >
      <StageColumn
        stage={stage}
        workspaceId={workspaceId}
        pipelineId={pipelineId}
      />
    </div>
  );
}
