'use client'

import React from 'react';
import SubSidebar from '@/components/navigation_dashboard/sub-sidebar/sidebar';
import { NAV_ITEMS_WORKSPACE_SETTINGS } from '@/components/navigation_dashboard/sub-sidebar/items';
import useWorkspaceStore from '@/store/workspace-store';
import WorkspaceSettingsGuard from '@/components/guards/WorkspaceSettingsGuard';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-full w-full bg-background ">
      <SubSidebar navItems={NAV_ITEMS_WORKSPACE_SETTINGS} />
      <WorkspaceSettingsGuard>
        {children}
      </WorkspaceSettingsGuard>
    </div>
  );
}
