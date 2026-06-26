import { useQuery } from "@tanstack/react-query";
import { dealApi } from "../api/deal-api";
import { GetDealsFilters } from "../types/deal-types";

export function useGetAllDeals(
  workspaceId: string,
  filters?: GetDealsFilters,
) {
  return useQuery({
    queryKey: ["deals", workspaceId, filters],
    queryFn: async () => {
      const response = await dealApi.getDealsByWorkspaceId(workspaceId, filters);
      return response?.data?.deals ?? [];
    },
    enabled: !!workspaceId,
  });
}
