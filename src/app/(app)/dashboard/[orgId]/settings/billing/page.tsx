import ManageSubscription from '../_PageSections/Billing';
import { redirect } from 'next/navigation';
import routes from '@/lib/config/routes';

import { GetOrg } from '@/lib/API/Database/org/queries';

export default async function Billing({ params }) {
  const org = await GetOrg({ id: params.orgId });
  const subscription = org?.subscription_id;

  const basePath = routes.redirects.dashboard.dashboardBase;
  const pathLink = routes.redirects.dashboard.settings.requireSub;
  if (!subscription) redirect(`${basePath}${params.orgId}${pathLink}`);

  return (
    <div>
      <ManageSubscription payments_id={org?.customer_id} />
    </div>
  );
}
