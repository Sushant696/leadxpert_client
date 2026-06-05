"use client";

import {
  LayoutDashboardIcon,
  Users,
  Plus
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import NavItem from '@/components/navigation_dashboard/sidebar/navItem';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboardIcon, href: '/admin' },
  { label: 'Users', icon: Users, href: '/admin/users' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 h-screen border-r bg-surface flex flex-col p-4 sticky top-0 shadow-sm">
      {/* 1. Header & Logo */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <img src="/logoiconblack.png" alt="leadXpert logo" className='w-10' />
        <div>
          <h1 className="font-bold text-sm leading-tight text-primary">leadXpert</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">CRM Engine</p>
        </div>
      </div>

      <Separator className="my-4 opacity-50" />

      {/* 3. Navigation List */}
      <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1">
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

      {/* 4. Bottom Section */}
      <div className="pt-4 border-t border-border space-y-4">
        {/* Storage Card - Using your new semantic colors */}
        <div className="bg-background border border-border p-4 rounded-2xl">
          <div className="flex justify-between text-[11px] font-bold mb-2">
            <span className="text-muted-foreground">Cloud Storage</span>
            <span className="text-secondary">90%</span>
          </div>
          <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-warning h-full rounded-full transition-all duration-1000"
              style={{ width: '90%' }}
            ></div>
          </div>
          <button className="w-full mt-3 bg-surface border border-border text-primary text-[11px] py-2 rounded-xl font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all flex items-center justify-center gap-1">
            Upgrade Plan <Plus size={12} />
          </button>
        </div>
        {/* User Profile */}
      </div>
    </aside>
  );
};
export default AdminSidebar
