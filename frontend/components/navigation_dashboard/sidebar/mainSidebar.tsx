"use client";

import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Link, ChevronDown, Plus, Settings, ChevronRight } from 'lucide-react';

import NavItem from './navItem';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NAV_ITEMS } from './items';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import WorkspaceJoinModal from '@/features/workspace/components/WorkspaceJoinModal';
import WorkspaceCreateModal from '@/features/workspace/components/CreateWorkspaceModal';
import WorkspacesListing from '@/features/workspace/components/workspacesList';
import useWorkspaceStore from '@/store/workspace-store';
import useGetUserWorkspaces from '@/features/workspace/hooks/useGetUserWorkspaces';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState<boolean>(false);
  const [isJoinWorkspaceOpen, setIsJoinWorkspaceOpen] = useState(false);
  const { activeWorkspaceSlug } = useWorkspaceStore();
  const { data: workspaces } = useGetUserWorkspaces();

  const currentWorkspace = workspaces?.data?.fullWorkspaces?.find(
    (w: any) => w.workspace.slug === activeWorkspaceSlug
  );

  const userRole = currentWorkspace?.role;
  const canManage = userRole === "SUPER_ADMIN" || userRole === "ADMIN";

  return (
    <aside className="w-64 border-r bg-surface p-4 sticky top-0 shadow-sm h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <Image src="/logoiconblack.png" alt="leadXpert logo" width={40} height={40} className='w-10' />
        <div>
          <h1 className="font-bold text-sm leading-tight text-primary">leadXpert</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">CRM Engine</p>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="mb-2">
        <button className="w-full border border-border bg-background/50 rounded-xl p-2.5 flex justify-between items-center text-sm font-medium hover:bg-muted transition-all group">
          <span className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-[10px] text-white font-bold">M</div>
            <span className="text-primary/80 group-hover:text-primary">Mesh Studio</span>
          </span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
      </div>

      <Separator className="my-4 opacity-50" />

      {/* Navigation Items */}
      <nav className="space-y-1 pr-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            icon={<item.icon size={18} />}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
            isAi={item.isAi}
          />
        ))}
      </nav>

      <Separator className="my-4 opacity-50" />

      {/* Workspaces Header */}
      <div className='flex items-center justify-between'>
        <h6 className='text-sm text-muted-foreground'>Workspaces</h6>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="p-1 rounded-md hover:bg-muted hover:text-primary">
              <Plus size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            className="w-48 p-1"
          >
            <button
              onClick={() => setIsCreateWorkspaceOpen(true)}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-muted"
            >
              <Plus size={16} className='text-primary' />
              Create workspace
            </button>

            <button
              onClick={() => setIsJoinWorkspaceOpen(true)}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-muted"
            >
              <Link size={16} className='text-primary' />
              Join workspace
            </button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Workspace Listing - Fixed height with scroll */}
      <WorkspacesListing />

      {/* Spacer to push settings to bottom */}
      <div className="flex-1" />

      {/* Workspace Settings - Always at bottom */}
      {currentWorkspace && (
        <>
          <Separator className="my-3 opacity-50" />
          <button
            onClick={() => router.push('/settings/workspace')}
            disabled={!canManage}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
              canManage
                ? "text-muted-foreground hover:bg-muted hover:text-primary cursor-pointer"
                : "text-muted-foreground/50 cursor-not-allowed"
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
      )}

      {/* Modals */}
      <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
        <WorkspaceCreateModal setIsCreateWorkspaceOpen={setIsCreateWorkspaceOpen} />
      </Dialog>

      <Dialog open={isJoinWorkspaceOpen} onOpenChange={setIsJoinWorkspaceOpen}>
        <WorkspaceJoinModal setIsJoinWorkspaceOpen={setIsJoinWorkspaceOpen} />
      </Dialog>
    </aside>
  );
};

export default Sidebar;
