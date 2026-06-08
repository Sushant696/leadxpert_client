import { Building2 } from "lucide-react";
import getInitials from "@/utils/getInitials";
import useGetUserWorkspaces from "../hooks/useGetUserWorkspaces";
import { cn } from "@/lib/utils";

function WorkspacesListing() {
  const { data, isLoading, isError } = useGetUserWorkspaces();

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

  if (!data?.success || !data?.data?.usersWorkspaces || data.data.usersWorkspaces.length === 0) {
    return (
      <div className="mt-3 px-3 py-4 text-center">
        <Building2 className="w-6 h-6 mx-auto text-muted-foreground/30 mb-1.5" />
        <p className="text-xs text-muted-foreground">No workspaces</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 overflow-y-auto p-1">
      {data.data.usersWorkspaces.map((workspace, index) => {
        const isActive = index === 0; // Replace with actual active workspace logic

        return (
          <button
            key={workspace.slug}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-primary"
            )}
          >
            {/* Workspace Initial */}
            <div
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
              )}
            >
              {getInitials(workspace.name)}
            </div>

            {/* Workspace Name */}
            <span className={cn(
              "text-sm truncate",
              isActive ? "font-bold" : "font-medium"
            )}>
              {workspace.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default WorkspacesListing;
