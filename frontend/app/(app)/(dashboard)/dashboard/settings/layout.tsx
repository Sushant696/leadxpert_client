'use client'

import React from 'react';
import SubSidebar from '@/components/navigation_dashboard/sub-sidebar/sidebar';
import { NAV_ITEMS_USER_SETTINGS } from '@/components/navigation_dashboard/sub-sidebar/items';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full bg-background ">
      <SubSidebar navItems={NAV_ITEMS_USER_SETTINGS} />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
