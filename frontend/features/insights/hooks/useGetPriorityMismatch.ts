import { useQuery } from "@tanstack/react-query";
import { getPriorityMismatchAction } from "../action/insights-action";

const useGetPriorityMismatch = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "priority-mismatch", workspaceId],
    queryFn: () => getPriorityMismatchAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetPriorityMismatch;
