import { useQuery } from "@tanstack/react-query";
import { getLeadDetailAction } from "../action/lead-action";

// Fetches a single lead for the detail page using only workspaceId + leadId
// (the detail route carries no pipeline id). Returns the lead with its
// pipelineId populated, so downstream actions (edit, convert, SSE) can derive it.
const useGetLeadDetail = (workspaceId: string, leadId: string) => {
  return useQuery({
    queryKey: ["lead-detail", leadId],
    queryFn: () => getLeadDetailAction(workspaceId, leadId),
    enabled: !!workspaceId && !!leadId,
  });
};

export default useGetLeadDetail;
