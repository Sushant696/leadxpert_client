import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { createNoteAction } from "../action/note-action";
import { CreateNotePayload } from "../types/note-types";

const useCreateNote = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-note", workspaceId],
    mutationFn: (data: CreateNotePayload) =>
      createNoteAction(workspaceId, data),
    onSuccess: (_data, variables) => {
      showToast.success("Note added");
      queryClient.invalidateQueries({
        queryKey: ["notes", workspaceId, variables.entityType, variables.entityId],
      });
      // Invalidate leads to refresh noteCount on the card
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
};

export default useCreateNote;
