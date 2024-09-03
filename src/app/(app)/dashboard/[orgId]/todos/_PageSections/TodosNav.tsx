'use client';
import Link from 'next/link';
import { NavItem } from '@/lib/types/types';
import { usePathname } from 'next/navigation';
import routes from '@/lib/config/routes';
interface TodosNavProps {
  items: NavItem[];
}

interface NavItemProps {
  item: NavItem;
}

const NavItemComp = ({ item }: NavItemProps) => {
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

export function TodosNav({ items }: TodosNavProps) {
  return (
    <nav className="flex items-center space-x-6 mb-6">
      {items.map((item) => (
        <NavItemComp item={item} key={item.title} />
      ))}
    </nav>
  );
}
