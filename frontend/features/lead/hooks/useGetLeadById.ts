import { useQuery } from "@tanstack/react-query";
import { getLeadByIdAction } from "../action/lead-action";

const useGetLeadById = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  return useQuery({
    queryKey: ["lead", leadId],
    queryFn: () => getLeadByIdAction(workspaceId, pipelineId, leadId),
    enabled: !!workspaceId && !!pipelineId && !!leadId,
  });
};

export default useGetLeadById;
