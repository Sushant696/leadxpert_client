import { useQuery } from "@tanstack/react-query";
import { getSinglePipelineAction } from "../action/pipeline-action";

const useGetSinglePipeline = (workspaceId: string, pipelineId: string) => {
  return useQuery({
    queryKey: ["pipeline", workspaceId, pipelineId],
    queryFn: () => getSinglePipelineAction(workspaceId, pipelineId),
    enabled: !!workspaceId && !!pipelineId,
  });
};

export default useGetSinglePipeline;
