import { showToast } from "@/components/showToast";
import { useMutation } from "@tanstack/react-query";
import { sendInviteByEmailAction } from "../action/invite-action";

export function useSendInviteByEmail() {
  return useMutation({
    mutationKey: ["sendInviteByEmail"],
    mutationFn: ({
      workspaceId,
      email,
    }: {
      workspaceId: string;
      email: string;
    }) => sendInviteByEmailAction(workspaceId, email),
    onSuccess: () => {
      showToast.success("Invitation email sent successfully");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
