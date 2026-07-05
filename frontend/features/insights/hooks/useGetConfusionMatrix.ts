import { useQuery } from "@tanstack/react-query";
import { getConfusionMatrixAction } from "../action/insights-action";

const useGetConfusionMatrix = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "confusion-matrix", workspaceId],
    queryFn: () => getConfusionMatrixAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetConfusionMatrix;
