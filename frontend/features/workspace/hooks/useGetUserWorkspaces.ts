import { useQuery } from "@tanstack/react-query";
import { getUserWorkspacesAction } from "../action/workspace-action";

const useGetUserWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getUserWorkspacesAction,
  });
};

export default useGetUserWorkspaces;
