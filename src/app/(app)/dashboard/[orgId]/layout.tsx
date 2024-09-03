import SideBar from './_PageSections/SideBar';
import Header from './_PageSections/Header';
import { LayoutProps } from '@/lib/types/types';
import { GetUser } from '@/lib/API/Database/user/queries';
import routes from '@/lib/config/routes';
import { redirect } from 'next/navigation';
import { GetSession } from '@/lib/API/Services/auth/session';
import { GetRoleByUserIdAndOrgId } from '@/lib/API/Database/roles/queries';
import { AbilityProvider } from './_PageSections/AbilityProvider';
import { RolesE } from '@/lib/types/enums';

export default async function DashboardLayout({ children, params }: LayoutProps) {
  const session = await GetSession();
  if (!session) redirect(routes.redirects.auth.requireAuth);

  const user = await GetUser();
  const user_id = user?.id;
  const org_id = params.orgId;
  const role = await GetRoleByUserIdAndOrgId({ org_id, user_id });

  const display_name = user?.display_name;
  const email = user?.email;
  const avatar_url = user?.image || '';

  return (
    <main className="grid md:grid-cols-[auto_1fr]">
      <AbilityProvider role={RolesE[role.role.toUpperCase()]} id={user?.id}>
        <SideBar />
        <div>
          <Header
            email={email}
            display_name={display_name}
            avatar_url={avatar_url}
            org_name={role?.org_name}
            role={role?.role}
          />
          <div className="m-6">{children}</div>
        </div>
      </AbilityProvider>
    </main>
  );
}
