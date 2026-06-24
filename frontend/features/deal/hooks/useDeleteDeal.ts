import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dealApi } from "../api/deal-api";

export function useDeleteDeal(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dealId: string) =>
      dealApi.deleteDeal(workspaceId, dealId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals", workspaceId],
      });
    },
  });
}
