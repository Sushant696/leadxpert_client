import { useQuery } from "@tanstack/react-query";

import { getAllWorkspaceMembersAction } from "../action/members-action";

function useGetAllMembers(workspaceId?: string) {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      if (!workspaceId) throw new Error("No workspace ID")
      return getAllWorkspaceMembersAction(workspaceId)
    },
    enabled: !!workspaceId,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
}

export { useGetAllMembers };
