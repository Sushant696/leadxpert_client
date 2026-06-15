'use client';

import { AlertTriangle } from 'lucide-react';
import { usePathname } from 'next/navigation';

import useWorkspaceStore from '@/store/workspace-store';
import { canAccessRoute } from '@/constants/permissionRoutes';

interface WorkspaceSettingsGuardProps {
  children: React.ReactNode;
}

function WorkspaceSettingsGuard({ children }: WorkspaceSettingsGuardProps) {
  const pathname = usePathname();
  const { workspace } = useWorkspaceStore();

  const hasAccess = canAccessRoute(pathname, workspace?.role);

  if (!hasAccess) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background p-8">
        <div className="text-center max-w-md">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10">
            <AlertTriangle className="w-8 h-8 text-error" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Access Restricted
          </h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Only workspace admins can modify these settings.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Your current role: <span className="font-semibold text-foreground">{workspace?.role || 'Unknown'}</span></p>
            <p className="text-xs">Contact your workspace owner if you need access.</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
export default WorkspaceSettingsGuard;
