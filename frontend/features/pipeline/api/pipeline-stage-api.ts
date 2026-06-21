import {
  CreatePipelineStagePayload,
  CreatePipelineStageResponse,
  UpdatePipelineStagePayload,
  UpdatePipelineStageResponse,
  ReorderPipelineStagesPayload,
  ReorderPipelineStagesResponse,
  DeletePipelineStageResponse,
} from "../types/pipeline-stage.types";
import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";

const pipelineStageApi = {
  createPipelineStage: async (
    workspaceId: string,
    pipelineId: string,
    pipelineStageData: CreatePipelineStagePayload,
  ): Promise<CreatePipelineStageResponse> => {
    return await apiWrapper.post(
      apiURLs.PIPELINE_STAGE.create(workspaceId, pipelineId),
      pipelineStageData,
    );
  },
  bulkCreatePipelineStages: async (
    workspaceId: string,
    pipelineId: string,
    id: string,
  ): Promise<CreatePipelineStageResponse> => {
    return await apiWrapper.post(
      apiURLs.PIPELINE_STAGE.bulkCreate(workspaceId, pipelineId),
      { id },
    );
  },

  updatePipelineStage: async (
    workspaceId: string,
    pipelineId: string,
    stageId: string,
    data: UpdatePipelineStagePayload,
  ): Promise<UpdatePipelineStageResponse> => {
    return await apiWrapper.patch(
      apiURLs.PIPELINE_STAGE.update(workspaceId, pipelineId, stageId),
      data,
    );
  },

  reorderPipelineStages: async (
    workspaceId: string,
    pipelineId: string,
    data: ReorderPipelineStagesPayload,
  ): Promise<ReorderPipelineStagesResponse> => {
    return await apiWrapper.patch(
      apiURLs.PIPELINE_STAGE.reorder(workspaceId, pipelineId),
      data,
    );
  },

  deletePipelineStage: async (
    workspaceId: string,
    pipelineId: string,
    stageId: string,
  ): Promise<DeletePipelineStageResponse> => {
    return await apiWrapper.delete(
      apiURLs.PIPELINE_STAGE.delete(workspaceId, pipelineId, stageId),
    );
  },
};

export default pipelineStageApi;
