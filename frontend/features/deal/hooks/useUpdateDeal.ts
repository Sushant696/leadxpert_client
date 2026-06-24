import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dealApi } from "../api/deal-api";
import { UpdateDealPayload } from "../types/deal-types";

export function useUpdateDeal(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dealId, data }: { dealId: string; data: UpdateDealPayload }) =>
      dealApi.updateDeal(workspaceId, dealId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals", workspaceId],
      });
    },
  });
}
