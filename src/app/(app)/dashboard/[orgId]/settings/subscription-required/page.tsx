'use client';

import { useRouter, usePathname } from 'next/navigation';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import routes from '@/lib/config/routes';

const SubscriptionRequired = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirectToSubscription = async () => {
    const org_id = pathname.split('/')[2];
    const path = routes.redirects.dashboard.settings.toAddSub;
    const basePath = routes.redirects.dashboard.dashboardBase;
    router.push(`${basePath}${org_id}${path}`);
  };

  return (
    <div className="mt-6">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>No Subscription Found</CardTitle>
          <CardDescription>
            Click below to redirect to the Subscription Page to add a Subscription to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={redirectToSubscription} className="mt-4">
            Go to Subscription
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionRequired;
