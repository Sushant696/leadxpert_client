import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getActiveInvitesAction, revokeInviteAction } from '../action/invite-action';

export function useGetActiveInvites(workspaceId: string) {
  return useQuery({
    queryKey: ['invites', workspaceId],
    queryFn: () => getActiveInvitesAction(workspaceId),
    enabled: !!workspaceId,
  });
}

export function useRevokeInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, inviteId }: { workspaceId: string; inviteId: string }) =>
      revokeInviteAction(workspaceId, inviteId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['invites', variables.workspaceId],
      });
    },
  });
}
