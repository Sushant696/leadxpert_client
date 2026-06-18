"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, ChevronRight, Plus } from 'lucide-react';

import useGetPipelines from '@/features/pipeline/hooks/useGetPipelines';

import NavItem from './navItem';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from './items';
import getInitials from '@/utils/getInitials';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RESOURCE_BASED_ROLES } from '@/types/user';
import { Separator } from '@/components/ui/separator';
import useWorkspaceStore from '@/store/workspace-store';
import WorkspaceDropdown from '@/features/workspace/components/WorkspacesDropDown';
import WorkspaceJoinModal from '@/features/workspace/components/WorkspaceJoinModal';
import WorkspaceCreateModal from '@/features/workspace/components/CreateWorkspaceModal';
import CreatePipelineModal from '@/features/pipeline/components/createPipelineModal';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState<boolean>(false);
  const [isJoinWorkspaceOpen, setIsJoinWorkspaceOpen] = useState(false);
  const [isCreatePipelineOpen, setIsCreatePipelineOpen] = useState(false);
  const { workspace } = useWorkspaceStore();

  const currentWorkspace = workspace;
  const userRole = currentWorkspace?.role;
  const canManage = userRole === RESOURCE_BASED_ROLES.SUPER_ADMIN || userRole === RESOURCE_BASED_ROLES.ADMIN;

  const { data: pipelines, isLoading: isPipelinesLoading } = useGetPipelines(
    currentWorkspace?.id ?? ""
  );

  return (
    <aside className="w-64 border-r bg-surface p-4 sticky top-0 shadow-sm h-screen flex flex-col">
      <div className="flex items-center gap-3 mb-6 px-2">
        <Image src="/logoiconblack.png" alt="leadXpert logo" width={40} height={40} className='w-10' />
        <div>
          <h1 className="font-bold text-sm leading-tight text-primary">leadXpert</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">CRM Engine</p>
        </div>
      </div>

      <div className="mb-2">
        <WorkspaceDropdown />
      </div>

      <Separator className="my-4 opacity-50" />

      <nav className="space-y-1 pr-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            icon={<item.icon size={18} />}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </nav>

      <Separator className="my-4 opacity-50" />

      <div className='flex items-center justify-between'>
        <h6 className='text-sm text-muted-foreground'>Pipelines</h6>
        {canManage && (
          <Button
            variant={"ghost"}
            className="p-1 rounded-md hover:bg-muted hover:text-primary"
            onClick={() => setIsCreatePipelineOpen(true)}
          >
            <Plus size={16} />
          </Button>
        )}
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto p-1 mt-2">
        {currentWorkspace ? (
          <>
            {isPipelinesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl animate-pulse">
                  <div className="w-6 h-6 rounded-lg bg-muted shrink-0" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
              ))
            ) : pipelines && pipelines.length > 0 ? (
              pipelines.map((pipeline) => {
                const isActive = pathname === `/dashboard/pipeline/${pipeline._id}`;
                return (
                  <Link
                    key={pipeline._id}
                    href={`/dashboard/pipeline/${pipeline._id}`}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                    >
                      {pipeline.icon ??
                        <span className='bg-primary w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white'>
                          {getInitials(pipeline.name)}
                        </span>
                      }
                    </div>
                    <span className={cn("text-sm truncate", isActive ? "font-bold" : "font-medium")}>
                      {pipeline.name}
                    </span>
                  </Link>
                );
              })
            ) : (
              <div className="mt-3 px-3 py-4 text-center">
                <p className="text-xs text-muted-foreground">No pipelines yet</p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-3 px-3 py-4 text-center">
            <p className="text-xs text-muted-foreground">
              Select a workspace to view pipelines
            </p>
          </div>
        )}
      </div>

      {currentWorkspace && (
        <>
          <Separator className="my-3 opacity-50" />
          <button
            onClick={() => {
              canManage ?
                router.push('/dashboard/workspace/general')
                :
                router.push('/dashboard/workspace/members')
            }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group text-muted-foreground hover:bg-muted hover:text-primary cursor-pointer"
            )}
            title={!canManage ? "Only admins can access workspace settings" : "Workspace settings"}
          >
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span>Workspace Settings</span>
            </div>
            {canManage && (
              <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
        </>
      )
      }

      {/* Modals */}
      <Dialog open={isCreatePipelineOpen} onOpenChange={setIsCreatePipelineOpen}>
        <CreatePipelineModal
          workspaceId={currentWorkspace?.id ?? ""}
          setIsCreatePipelineOpen={setIsCreatePipelineOpen}
        />
      </Dialog>

      <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
        <WorkspaceCreateModal setIsCreateWorkspaceOpen={setIsCreateWorkspaceOpen} />
      </Dialog>

      <Dialog open={isJoinWorkspaceOpen} onOpenChange={setIsJoinWorkspaceOpen}>
        <WorkspaceJoinModal setIsJoinWorkspaceOpen={setIsJoinWorkspaceOpen} />
      </Dialog>
    </aside >
  );
};

export default Sidebar;
