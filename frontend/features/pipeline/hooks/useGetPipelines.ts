import { useQuery } from "@tanstack/react-query";
import { getPipelinesAction } from "../action/pipeline-action";

const useGetPipelines = (workspaceId: string) => {
  return useQuery({
    queryKey: ["pipelines", workspaceId],
    queryFn: () => getPipelinesAction(workspaceId),
    enabled: !!workspaceId,
  });
};

export default useGetPipelines;
