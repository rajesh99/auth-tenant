import { Separator } from '@/components/ui/Separator';
import { SettingsNav } from './_PageSections/SettingsNav';
import SettingsHeader from './_PageSections/SettingsHeader';
import routes from '@/lib/config/routes';
import { LayoutProps } from '@/lib/types/types';
import { GetUser } from '@/lib/API/Database/user/queries';
import { GetRoleByUserIdAndOrgId } from '@/lib/API/Database/roles/queries';
import { RolesE } from '@/lib/types/enums';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default async function SettingsLayout({ children, params }: LayoutProps) {
  const user = await GetUser();
  const user_id = user?.id;
  const org_id = params.orgId;
  const role = await GetRoleByUserIdAndOrgId({ org_id, user_id });

  return (
    <div className="md:max-w-2xl">
      {RolesE[role.role.toUpperCase()] === RolesE.OWNER ? (
        <div>
          <SettingsHeader />
          <Separator className="my-6" />
          <SettingsNav items={routes.routes_dashboard_subroutes.settings} />
          <div>{children}</div>
        </div>
      ) : (
        <Card className="bg-background-light dark:bg-background-dark">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Unauthorized Access</CardTitle>
            <CardDescription>Only Owner can modify Organization Settings</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
