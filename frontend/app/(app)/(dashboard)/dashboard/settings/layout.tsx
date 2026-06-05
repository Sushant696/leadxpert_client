'use client'

import React from 'react';
import SubSidebar from '@/components/navigation_dashboard/sub-sidebar/sidebar';

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
