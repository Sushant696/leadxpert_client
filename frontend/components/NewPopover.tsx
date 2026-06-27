"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Briefcase, GitBranch, Link } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import WorkspaceCreateModal from "@/features/workspace/components/CreateWorkspaceModal";
import WorkspaceJoinModal from "@/features/workspace/components/WorkspaceJoinModal";
import CreatePipelineModal from "@/features/pipeline/components/createPipelineModal";
import useWorkspaceStore from "@/store/workspace-store";

function NewPopover() {
  const { workspace } = useWorkspaceStore()
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [isJoinWorkspaceOpen, setIsJoinWorkspaceOpen] = useState(false);
  const [isCreatePipelineOpen, setIsCreatePipelineOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleAction = (action: () => void) => {
    action();
    setPopoverOpen(false);
  };

  const menuItems = [
    ...(workspace?.id
      ? [
          {
            label: "New Pipeline",
            icon: GitBranch,
            color: "accent" as const,
            action: () => setIsCreatePipelineOpen(true),
          },
          {
            type: "separator" as const,
          },
        ]
      : []),
    {
      label: "Create Workspace",
      icon: Briefcase,
      color: "secondary",
      action: () => setIsCreateWorkspaceOpen(true),
    },
    {
      label: "Join Workspace",
      icon: Link,
      color: "info",
      action: () => setIsJoinWorkspaceOpen(true),
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary group-hover:bg-primary/20";
      case "accent":
        return "bg-accent/10 text-accent group-hover:bg-accent/20";
      case "secondary":
        return "bg-secondary/10 text-secondary group-hover:bg-secondary/20";
      case "info":
        return "bg-info/10 text-info group-hover:bg-info/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span>New</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-1" align="end">
          <div className="space-y-0.5">
            {menuItems.map((item, index) => {
              if (item.type === "separator") {
                return <div key={index} className="h-px bg-border my-1" />;
              }

              const Icon = item.icon!;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(item.action!)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${getColorClasses(item.color!)}`}
                  >
                    <Icon size={15} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {/* Modals */}
      <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
        <WorkspaceCreateModal setIsCreateWorkspaceOpen={setIsCreateWorkspaceOpen} />
      </Dialog>

      <Dialog open={isJoinWorkspaceOpen} onOpenChange={setIsJoinWorkspaceOpen}>
        <WorkspaceJoinModal setIsJoinWorkspaceOpen={setIsJoinWorkspaceOpen} />
      </Dialog>

      {workspace?.id && (
        <Dialog open={isCreatePipelineOpen} onOpenChange={setIsCreatePipelineOpen}>
          <CreatePipelineModal workspaceId={workspace.id} setIsCreatePipelineOpen={setIsCreatePipelineOpen} />
        </Dialog>
      )}
    </>
  );
}

export default NewPopover;
