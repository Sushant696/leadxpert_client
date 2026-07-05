import { useQuery } from "@tanstack/react-query";
import { getFeatureImportanceAction } from "../action/insights-action";

const useGetFeatureImportance = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "feature-importance", workspaceId],
    queryFn: () => getFeatureImportanceAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetFeatureImportance;
