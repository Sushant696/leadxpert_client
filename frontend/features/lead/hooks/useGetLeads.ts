import { useQuery } from "@tanstack/react-query";
import { getLeadsAction } from "../action/lead-action";
import { GetLeadsOptions } from "../types/lead-types";

const useGetLeads = (
  workspaceId: string,
  pipelineId: string,
  options?: GetLeadsOptions,
) => {
  return useQuery({
    queryKey: ["leads", workspaceId, pipelineId, options],
    queryFn: () => getLeadsAction(workspaceId, pipelineId, options),
    enabled: !!workspaceId && !!pipelineId,
  });
};

export default useGetLeads;
