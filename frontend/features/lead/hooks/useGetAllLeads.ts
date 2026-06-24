import { useQuery } from "@tanstack/react-query";
import { leadApi } from "../api/lead-api";
import { GetLeadsOptions } from "../types/lead-types";

export function useGetAllLeads(
  workspaceId: string,
  options?: GetLeadsOptions,
) {
  return useQuery({
    queryKey: ["leads", workspaceId, options],
    queryFn: async () => {
      const response = await leadApi.getAllLeads(workspaceId, options);
      return response?.data?.leads ?? [];
    },
    enabled: !!workspaceId,
  });
}
