"use server";
import { pipelineApi } from "../api/pipeline-api";
import {
  CreatePipelinePayload,
  UpdatePipelinePayload,
  PipelineSummary,
} from "../types/pipeline-types";

export async function createPipelineAction(
  workspaceId: string,
  data: CreatePipelinePayload,
) {
  const response = await pipelineApi.createPipeline(workspaceId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to create pipeline");
  }
  return response.data;
}

export async function getPipelinesAction(workspaceId: string) {
  const response = await pipelineApi.getPipelines(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch pipelines");
  }
  const pipelines: PipelineSummary[] = response.data.pipelines;
  return pipelines;
}

export async function getSinglePipelineAction(
  workspaceId: string,
  pipelineId: string,
) {
  const response = await pipelineApi.getSinglePipeline(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch pipeline");
  }
  return response.data.pipeline
}

export async function updatePipelineAction(
  workspaceId: string,
  pipelineId: string,
  data: UpdatePipelinePayload,
) {
  const response = await pipelineApi.updatePipeline(workspaceId, pipelineId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to update pipeline");
  }
  return {
    success: true,
    message: response.message,
    data: response.data
  };
}

export async function deletePipelineAction(
  workspaceId: string,
  pipelineId: string,
) {
  const response = await pipelineApi.deletePipeline(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to delete pipeline");
  }
  return {
    success: true,
    message: response.message,
  };
}
