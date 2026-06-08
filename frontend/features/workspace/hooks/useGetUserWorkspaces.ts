import { useQuery } from "@tanstack/react-query"
import { getUserWorkspacesAction } from "../workspace-action"

const useGetUserWorkspaces = () => {
  return useQuery(
    {
      queryKey: ["workspaces"],
      queryFn: getUserWorkspacesAction
    }
  )
}

export default useGetUserWorkspaces
