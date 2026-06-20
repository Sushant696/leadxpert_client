import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import {
  CreatePipelinePayload,
  UpdatePipelinePayload,
  CreatePipelineResponse,
  UpdatePipelineResponse,
  GetPipelinesResponse,
  GetSinglePipelineResponse,
  DeletePipelineResponse,
} from "../types/pipeline-types";

const pipelineApi = {
  createPipeline: async (
    workspaceId: string,
    data: CreatePipelinePayload,
  ): Promise<CreatePipelineResponse> => {
    return await apiWrapper.post(apiURLs.PIPELINE.create(workspaceId), data);
  },

  getPipelines: async (workspaceId: string): Promise<GetPipelinesResponse> => {
    return await apiWrapper.get(apiURLs.PIPELINE.getAll(workspaceId));
  },

  getSinglePipeline: async (
    workspaceId: string,
    pipelineId: string,
  ): Promise<GetSinglePipelineResponse> => {
    return await apiWrapper.get(
      apiURLs.PIPELINE.getById(workspaceId, pipelineId),
    );
  },

  updatePipeline: async (
    workspaceId: string,
    pipelineId: string,
    data: UpdatePipelinePayload,
  ): Promise<UpdatePipelineResponse> => {
    return await apiWrapper.patch(
      apiURLs.PIPELINE.updateById(workspaceId, pipelineId),
      data,
    );
  },

  deletePipeline: async (
    workspaceId: string,
    pipelineId: string,
  ): Promise<DeletePipelineResponse> => {
    return await apiWrapper.delete(
      apiURLs.PIPELINE.deleteById(workspaceId, pipelineId),
    );
  },
};

export { pipelineApi };
