'use server';
import stripe from '@/lib/API/Services/init/payments';

import Stripe from 'stripe';
import { GetUser } from '@/lib/API/Database/user/queries';
import configuration from '@/lib/config/site';
import routes from '@/lib/config/routes';
import { GetOrg } from '@/lib/API/Database/org/queries';

interface createCheckoutProps {
  price_id: string;
  org_id: string;
}

export const createCheckoutSession = async ({ price_id, org_id }: createCheckoutProps) => {
  const { redirects } = routes;

  const price = price_id;
  const user = await GetUser();
  const org = await GetOrg({ id: org_id });

  if (user.id !== org.owner_user_id) {
    throw 'Unauthorized Operation';
  }

  const customer_email = user.email;
  const origin = configuration.url;

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${origin}${redirects.user.toUserDashboard}`,
    cancel_url: `${origin}${redirects.user.toUserDashboard}`,
    metadata: {
      org_id
    },
    customer_email
    //subscription_data: {
    //  trial_period_days: 14
    //}
  });

  return session.url;
};
