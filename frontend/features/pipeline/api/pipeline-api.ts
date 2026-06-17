import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import { CreatePipelinePayload, UpdatePipelinePayload } from "../types/pipeline-types";

const pipelineApi = {
  createPipeline: async (workspaceId: string, data: CreatePipelinePayload) => {
    return await apiWrapper.post(apiURLs.PIPELINE.create(workspaceId), data);
  },

  getPipelines: async (workspaceId: string) => {
    return await apiWrapper.get(apiURLs.PIPELINE.getAll(workspaceId));
  },

  getSinglePipeline: async (workspaceId: string, pipelineId: string) => {
    return await apiWrapper.get(apiURLs.PIPELINE.getById(workspaceId, pipelineId));
  },

  updatePipeline: async (
    workspaceId: string,
    pipelineId: string,
    data: UpdatePipelinePayload,
  ) => {
    return await apiWrapper.patch(
      apiURLs.PIPELINE.updateById(workspaceId, pipelineId),
      data,
    );
  },

  deletePipeline: async (workspaceId: string, pipelineId: string) => {
    return await apiWrapper.delete(
      apiURLs.PIPELINE.deleteById(workspaceId, pipelineId),
    );
  },
};

export { pipelineApi };
