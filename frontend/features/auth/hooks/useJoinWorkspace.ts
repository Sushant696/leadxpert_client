import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/showToast";
import { joinWorkspaceAction } from "../auth-action";
import useAuthStore from "@/store/auth-store";
import useWorkspaceStore from "@/store/workspace-store";

export function useJoinWorkspace(token: string, onSuccessCallback?: () => void) {
  const router = useRouter()
  const { setInviteToken } = useAuthStore()
  const { setWorkspace } = useWorkspaceStore()

  return useMutation({
    mutationKey: ['join-workspace'],
    mutationFn: () => joinWorkspaceAction(token),
    onSuccess: (data) => {
      // Unauthorized, redirected to login with token set in store 
      if (data.status === 401) {
        showToast.error(data.message || "Please login to continue")
        setInviteToken({ token })
        router.push("/login")
        return
      }

      // Invalid or expired token
      if (data.status === 404 || data.status === 410) {
        showToast.error(data.message || "Invalid or expired invitation link")
        setInviteToken({ token: "" })
        if (onSuccessCallback) onSuccessCallback()
        return
      }

      // Already a member
      if (data.status === 409) {
        showToast.info(data.message || "You are already a member of this workspace")
        setInviteToken({ token: "" })
        router.push("/dashboard")
        if (onSuccessCallback) onSuccessCallback()
        return
      }

      // Other errors
      if (!data.success) {
        showToast.error(data.message || "Failed to join workspace")
        setInviteToken({ token: "" })
        if (onSuccessCallback) onSuccessCallback()
        return
      }

      if (data?.data?.workspace) {
        setWorkspace(data.data.workspace);
      }
      setInviteToken({ token: "" })
      showToast.success("Successfully joined the workspace!")
      router.push("/dashboard")
      if (onSuccessCallback) onSuccessCallback()
    },
    onError: (error: Error) => {
      router.push("/login")
      showToast.error(error.message || "An unexpected error occurred")
      setInviteToken({ token: "" })
      if (onSuccessCallback) onSuccessCallback()
    },
  })
}
