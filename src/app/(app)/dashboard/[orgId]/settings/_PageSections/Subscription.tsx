'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import configuration from '@/lib/config/dashboard';
import { PlanI } from '@/lib/types/types';
import routes from '@/lib/config/routes';
import { ErrorText } from '@/components/ErrorText';
import { Subscription } from '@prisma/client';

interface SubscriptionExistsProps {
  subscription: Subscription;
}

const SubscriptionExists = ({ subscription }: SubscriptionExistsProps) => {
  const { price_id, period_ends_at, status } = subscription;

  const router = useRouter();
  const pathname = usePathname();
  const { products } = configuration;
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPlan, setPlan] = useState<PlanI>({ name: '' });

  const matchSubscription = () => {
    const match: PlanI = products
      .map((product) => product.plans.find((x: PlanI) => x.price_id === price_id))
      .find((item) => !!item);

    if (!match) {
      setErrorMessage('Subscription Type Not Valid, Please Contact Support');
      return;
    }

    setPlan(match);
  };

  useEffect(() => {
    matchSubscription();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goToPortal = async () => {
    const org_id = pathname.split('/')[2];
    const path = routes.redirects.dashboard.settings.toBilling;
    const basePath = routes.redirects.dashboard.dashboardBase;
    router.push(`${basePath}${org_id}${path}`);
  };

  return (
    <div className="mt-6">
      <Card className="bg-background-light dark:bg-background-dark">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Click button below to go to the billing page to manage your Subscription and Billing
          </CardDescription>
          <ErrorText errorMessage={errorMessage} />
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-xl">
            Current Plan: <span className="font-bold">{currentPlan?.name}</span>
          </h2>
          <div>
            Status: <span className="font-bold">{status}</span>
          </div>
          <div>
            Billing:{' '}
            <span className="font-bold">
              ${currentPlan?.price}/{currentPlan?.interval}
            </span>
          </div>
          <div>
            Billing Period Ends:{' '}
            <span className="font-bold">{new Date(period_ends_at).toLocaleDateString()}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={goToPortal} className="mt-4">
            Go to Billing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionExists;
