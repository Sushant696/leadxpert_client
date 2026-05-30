'use client'

import SubSidebar from '@/components/navigation_dashboard/sub-sidebar/sidebar';
import React from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full bg-background ">
      <SubSidebar />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
