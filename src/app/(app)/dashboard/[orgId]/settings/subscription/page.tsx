import { GetSubscriptionById } from '@/lib/API/Database/subscription/queries';
import SubscriptionComp from '../_PageSections/Subscription';

import { redirect } from 'next/navigation';
import routes from '@/lib/config/routes';
import { GetOrg } from '@/lib/API/Database/org/queries';
import { Subscription } from '@prisma/client';

export default async function SubscriptionPage({ params }) {
  const org = await GetOrg({ id: params.orgId });
  const subscription_id = org?.subscription_id;

  let subscription: Subscription;

  if (!subscription_id) {
    const basePath = routes.redirects.dashboard.dashboardBase;
    const pathLink = routes.redirects.dashboard.settings.toAddSub;
    redirect(`${basePath}/${params.orgId}/${pathLink}`);
  } else {
    subscription = await GetSubscriptionById({ id: subscription_id });
  }

  return (
    <div>
      <SubscriptionComp subscription={subscription} />
    </div>
  );
}
