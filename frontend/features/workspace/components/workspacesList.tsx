"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import getInitials from "@/utils/getInitials";
import useGetUserWorkspaces from "../hooks/useGetUserWorkspaces";
import useWorkspaceStore from "@/store/workspace-store";

function WorkspacesListing() {
  const { data, isLoading, isError } = useGetUserWorkspaces();
  const { workspace, setWorkspace, isActiveWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (
      data &&
      data.length > 0 &&
      !workspace
    ) {
      const firstWorkspace = data[0];
      setWorkspace({
        id: firstWorkspace.id,
        name: firstWorkspace.name,
        role: firstWorkspace.role,
        slug: firstWorkspace.slug,
      });
    }
  }, [data, workspace, setWorkspace]);

  if (isLoading) {
    return (
      <div className="space-y-1.5 mt-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 bg-muted animate-pulse rounded-lg" />
            <div className="flex-1">
              <div className="h-3 bg-muted animate-pulse rounded w-20 mb-1" />
              <div className="h-2 bg-muted animate-pulse rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-3 px-3 py-2 text-xs text-destructive">
        Error loading workspaces
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-3 px-3 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Create or join workspace to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 h-74 overflow-y-auto p-1">
      {data.map((ws) => {
        const isActive = isActiveWorkspace(ws.slug);

        return (
          <button
            key={ws.slug}
            onClick={() => setWorkspace(ws)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-primary",
            )}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary",
              )}
            >
              {getInitials(ws.name)}
            </div>

            <span
              className={cn(
                "text-sm truncate",
                isActive ? "font-bold" : "font-medium",
              )}
            >
              {ws.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default WorkspacesListing;
