import { useQuery } from "@tanstack/react-query";
import { getDriverRankingAction } from "../action/insights-action";

// Driver ranking is derived from the static trained-model file, so it is the
// same regardless of the selected pipeline. pipelineId is accepted only to
// keep the call sites uniform; it is not part of the query key.
const useGetDriverRanking = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "driver-ranking", workspaceId],
    queryFn: () => getDriverRankingAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetDriverRanking;
