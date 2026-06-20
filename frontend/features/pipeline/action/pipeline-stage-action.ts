import pipelineStageApi from "../api/pipeline-stage-api";
import {
  CreatePipelineStagePayload,
} from "../types/pipeline-stage.types";

export async function createPipelineStageAction(
  workspaceId: string,
  pipelineId: string,
  createPipelineStageData: CreatePipelineStagePayload,
) {
  const response = await pipelineStageApi.createPipelineStage(
    workspaceId,
    pipelineId,
    createPipelineStageData,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to create pipeline stage");
  }
  return response.data;
}
