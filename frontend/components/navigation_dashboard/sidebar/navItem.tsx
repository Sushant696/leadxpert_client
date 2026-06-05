import Link from 'next/link';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  isAi?: boolean;
}

const NavItem = ({ icon, label, href, active, isAi }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group
        ${active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-primary'}
      `}
    >
      <span className={`${active ? 'text-primary' : 'group-hover:text-primary'} transition-colors`}>
        {icon}
      </span>
      <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>

      {isAi && (
        <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter 
          ${active ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary'}`}>
          AI
        </span>
      )}
    </Link>
  );
};

export default NavItem;
