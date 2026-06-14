"use client";

import { ChevronDown, Check } from "lucide-react";

import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getInitials from "@/utils/getInitials";
import { RESOURCE_BASED_ROLES } from "@/types/user";
import useWorkspaceStore from "@/store/workspace-store";
import useGetUserWorkspaces from "@/features/workspace/hooks/useGetUserWorkspaces";

function WorkspaceDropdown() {
  const { data, isLoading } = useGetUserWorkspaces();
  const { workspace, setWorkspace, isActiveWorkspace } = useWorkspaceStore();

  if (isLoading || !data) {
    return (
      <div className="w-full border border-border bg-background/50 rounded-xl p-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-muted animate-pulse rounded-lg" />
          <div className="flex-1">
            <div className="h-3 bg-muted animate-pulse rounded w-20" />
          </div>
        </div>
      </div>
    );
  }

  const ownedWorkspaces = data.filter((ws) => ws.role === RESOURCE_BASED_ROLES.SUPER_ADMIN);
  const joinedWorkspaces = data.filter((ws) => ws.role !== RESOURCE_BASED_ROLES.SUPER_ADMIN);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full border border-border bg-background/50 rounded-xl p-2.5 flex justify-between items-center text-sm font-medium hover:bg-muted transition-all group">
          <span className="flex items-center gap-2">
            {workspace?.profilePicture ? (
              <img
                className="w-10 h-10 rounded-lg border border-border object-cover"
                src={workspace.profilePicture}
                alt={workspace.name}
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
                {getInitials(workspace?.name || "?")}
              </div>
            )}

            <span className="text-lg text-primary/80 group-hover:text-primary truncate max-w-[140px] capitalize">
              {workspace?.name || "Select workspace"}
            </span>
          </span>
          <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        {ownedWorkspaces.length > 0 && (
          <div>
            <div className="px-2 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Your Workspaces
              </span>
            </div>
            {ownedWorkspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.slug}
                onClick={() => setWorkspace(ws)}
                className="flex items-center gap-2 cursor-pointer focus:bg-muted focus:text-foreground"
              >
                {ws.profilePicture ? (
                  <img
                    className="w-6 h-6 rounded-lg border border-border object-cover"
                    src={ws.profilePicture}
                    alt={ws.name}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-[10px]">
                    {getInitials(ws.name)}
                  </div>
                )}

                <span className="flex-1 truncate capitalize">{ws.name}</span>
                {isActiveWorkspace(ws.slug) && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}

        {joinedWorkspaces.length > 0 && (
          <>
            {ownedWorkspaces.length > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Joined Workspaces
              </span>
            </div>
            {joinedWorkspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.slug}
                onClick={() => setWorkspace(ws)}
                className="flex items-center gap-2 cursor-pointer focus:bg-muted focus:text-foreground"
              >
                {ws.profilePicture ? (
                  <img
                    className="w-6 h-6 rounded-lg border border-border object-cover"
                    src={ws.profilePicture}
                    alt={ws.name}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-bold text-[10px]">
                    {getInitials(ws.name)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="truncate capitalize">{ws.name}</div>
                  <div className="text-[10px] text-muted-foreground capitalize">
                    {ws.role.toLowerCase().replace('_', ' ')}
                  </div>
                </div>
                {isActiveWorkspace(ws.slug) && (
                  <Check size={14} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceDropdown;
