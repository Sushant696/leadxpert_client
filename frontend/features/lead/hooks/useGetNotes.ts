import { useQuery } from "@tanstack/react-query";
import { getNotesByEntityAction } from "../action/note-action";

const useGetNotes = (
  workspaceId: string,
  entityType: string,
  entityId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["notes", workspaceId, entityType, entityId],
    queryFn: () => getNotesByEntityAction(workspaceId, entityType, entityId),
    enabled: !!workspaceId && !!entityId && enabled,
  });
};

export default useGetNotes;
