'use client';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { NavItem } from '@/lib/types/types';
import routes from '@/lib/config/routes';
interface SettingsNavProps {
  items: NavItem[];
}

interface SidebarNavItemProps {
  item: NavItem;
}

const NavItemComp = ({ item }: SidebarNavItemProps) => {
  const pathname = usePathname();
  const href = `${routes.redirects.dashboard.dashboardBase}${pathname.split('/')[2]}${item.link}`;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        href !== pathname
          ? 'hover:text-primary hover:underline underline-offset-8 decoration-2 decoration-blue-500'
          : 'text-primary underline underline-offset-8 decoration-2 decoration-blue-500'
      }`}
    >
      {item.title}
    </Link>
  );
};

export function SettingsNav({ items }: SettingsNavProps) {
  return (
    <nav className="flex items-center space-x-6 mb-8">
      {items.map((item) => (
        <NavItemComp item={item} key={item.title} />
      ))}
    </nav>
  );
}
