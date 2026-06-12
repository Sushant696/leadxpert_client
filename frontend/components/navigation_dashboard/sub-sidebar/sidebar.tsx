'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './items';

interface SubSidebarProps {
  navItems: NavItem[];
}

export default function SubSidebar({ navItems }: SubSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col shrink-0">
      <div className="px-6 py-3 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className={`
        flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group
        ${pathname === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-primary'}
      `}
          >
            <span className={`${pathname === item.href ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>
              {<item.icon size={18} />}
            </span>
            <span className={`text-sm ${pathname === item.href ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
