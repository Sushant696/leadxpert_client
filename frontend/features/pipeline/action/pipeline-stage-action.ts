"use server";
import pipelineStageApi from "../api/pipeline-stage-api";
import {
  CreatePipelineStagePayload,
  UpdatePipelineStagePayload,
  ReorderPipelineStagesPayload,
} from "../types/pipeline-stage.types";

export async function createPipelineStageAction(
  workspaceId: string,
  pipelineId: string,
  data: CreatePipelineStagePayload,
) {
  const response = await pipelineStageApi.createPipelineStage(
    workspaceId,
    pipelineId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to create pipeline stage");
  }
  return response.data;
}

export async function bulkCreatePipelineStageAction(
  workspaceId: string,
  pipelineId: string,
  id: string,
) {
  const response = await pipelineStageApi.bulkCreatePipelineStages(
    workspaceId,
    pipelineId,
    id,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to bulk create pipeline stage");
  }
  return response.data;
}

export async function updatePipelineStageAction(
  workspaceId: string,
  pipelineId: string,
  stageId: string,
  data: UpdatePipelineStagePayload,
) {
  const response = await pipelineStageApi.updatePipelineStage(
    workspaceId,
    pipelineId,
    stageId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to update pipeline stage");
  }
  return response.data;
}

export async function reorderPipelineStagesAction(
  workspaceId: string,
  pipelineId: string,
  data: ReorderPipelineStagesPayload,
) {
  const response = await pipelineStageApi.reorderPipelineStages(
    workspaceId,
    pipelineId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to reorder pipeline stages");
  }
  return response.data;
}

export async function deletePipelineStageAction(
  workspaceId: string,
  pipelineId: string,
  stageId: string,
) {
  const response = await pipelineStageApi.deletePipelineStage(
    workspaceId,
    pipelineId,
    stageId,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to delete pipeline stage");
  }
  return {
    success: true,
    message: response.message,
  };
}
