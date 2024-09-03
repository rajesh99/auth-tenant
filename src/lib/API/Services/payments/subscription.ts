'use server';
import stripe from '@/lib/API/Services/init/payments';
import routes from '@/lib/config/routes';
import Stripe from 'stripe';

import configuration from '@/lib/config/site';

interface createProtalProps {
  payments_id: string;
}

export const GetBillingUrl = async ({ payments_id }: createProtalProps): Promise<string> => {
  const customer = payments_id;

  const origin = configuration.url;

  const portalSession: Stripe.BillingPortal.Session = await stripe.billingPortal.sessions.create({
    customer,
    return_url: `${origin}${routes.redirects.user.toUserDashboard}`
  });

  return portalSession.url;
};

export const RetrieveSubscription = async (
  subscription_id: string
): Promise<Stripe.Subscription> => {
  const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(
    subscription_id as string
  );

  return subscription;
};
