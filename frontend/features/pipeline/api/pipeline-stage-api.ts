import { apiWrapper } from "@/lib/api/api-wrapper";
import { apiURLs } from "@/utils/apiUrls";
import { CreatePipelineStagePayload } from "../types/pipeline-stage.types";

const pipelineStageApi = {
  createPipelineStage: async (workspaceId: string, pipelineId: string, pipelineStageData: CreatePipelineStagePayload) => {
    return await apiWrapper.post(apiURLs.PIPELINE_STAGE.create(workspaceId, pipelineId), pipelineStageData);
  },
}

export default pipelineStageApi;
