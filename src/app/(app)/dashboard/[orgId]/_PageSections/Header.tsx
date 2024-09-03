'use client';

import { UserNav } from './UserNav';
import TeamSwitcher from './TeamSwitcher';
import routes from '@/lib/config/routes';
import { MobileNav } from '@/components/MobileNav';

interface HeaderProps {
  display_name: string;
  email: string;
  avatar_url: string;
  org_name: string;
  role: string;
}

const Header = ({ display_name, email, avatar_url, org_name, role }: HeaderProps) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-8">
          <MobileNav items={routes.routes_dashboard} />
        </div>
        <div className="max-[410px]:hidden">
          <TeamSwitcher />
        </div>

        <div className="hidden md:inline-block text-lg ml-3 capitalize">
          {org_name}: {role}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav avatar_url={avatar_url} display_name={display_name} email={email} />
        </div>
      </div>
    </div>
  );
};

export default Header;
