import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dealApi } from "../api/deal-api";
import { CreateDealPayload } from "../types/deal-types";

export function useCreateDeal(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDealPayload) =>
      dealApi.createDeal(workspaceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals", workspaceId],
      });
    },
  });
}
