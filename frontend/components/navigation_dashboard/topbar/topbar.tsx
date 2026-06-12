'use client'

import {
  Search,
  Bell,
  Plus,
  User,
  Settings,
  LogOut,
  ChevronDown,
  UserPlus,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagicStar } from 'iconsax-reactjs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getInitials from '@/utils/getInitials';
import useAuthStore from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Dialog } from "@/components/ui/dialog";
import NewPopover from '@/components/NewPopover';
import { RESOURCE_BASED_ROLES } from '@/types/user';
import useWorkspaceStore from '@/store/workspace-store';
import { useLogout } from '@/features/auth/hooks/useLogout';
import InviteMemberModal from '@/features/workspace/components/inviteUserModal';

export default function TopBar() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();
  const router = useRouter();
  const { workspace, clearWorkspace } = useWorkspaceStore();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const currentWorkspace = workspace;

  const userRole = currentWorkspace?.role;
  const canManage = userRole === RESOURCE_BASED_ROLES.SUPER_ADMIN || userRole === RESOURCE_BASED_ROLES.ADMIN;

  const handleLogout = async () => {
    clearWorkspace();
    await logoutMutation.mutateAsync();
  }

  return (
    <>
      <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-10">

        <div className='flex items-center gap-6'>
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full bg-muted/30 border border-input rounded-xl py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
          </div>
          <NewPopover />
        </div>

        <div className="flex items-center gap-4">
          {canManage && currentWorkspace && (
            <Button
              variant="outline"
              onClick={() => setIsInviteOpen(true)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2 rounded-xl text-sm font-medium transition-colors bg-muted"
              title="Invite team members"
            >
              <UserPlus size={18} className='text-primary' />
              <span className="hidden lg:inline">Invite</span>
            </Button>
          )}

          <Button className='bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90  rounded-xl'>
            <MagicStar size={18} className='' variant='Bulk' />
            Assistant
          </Button>
          <div className="h-8 w-px bg-border mx-2"></div>
          {/* Notification Bell */}
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive border-2 border-background rounded-full"></span>
          </button>


          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 outline-none group">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {getInitials(user?.name || '')}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold leading-none text-foreground capitalize">{user?.name}</p>
              </div>
              <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 mt-2 rounded-xl border-border bg-popover text-popover-foreground shadow-lg">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem onClick={() => router.push("/dashboard/settings/user-profile")} className="flex items-center gap-2 cursor-pointer py-2 focus:bg-muted focus:text-foreground">
                <User size={16} /> <span className="text-sm">View Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push("/dashboard/settings/account-status")}
                className="flex items-center gap-2 cursor-pointer py-2 focus:bg-muted focus:text-foreground">
                <Settings size={16} /> <span className="text-sm">Account Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer py-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOut size={16} /> <span className="text-sm font-medium">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <InviteMemberModal
          workspaceSlug={currentWorkspace?.slug || ''}
          workspaceId={currentWorkspace?.id || ''}
        />
      </Dialog>
    </>
  );
}
