import { showToast } from "@/components/showToast";
import { useMutation } from "@tanstack/react-query";
import { getInviteLinkAction } from "../action/invite-action";

export function useGetInvitationLink() {
  return useMutation({
    mutationKey: ["getInvitationLink"],
    mutationFn: getInviteLinkAction,
    onSuccess: () => {
      showToast.success("Invitation link created successfully");
    },
    onError: (error: Error) => {
      showToast.error(error.message);
    },
  });
}
