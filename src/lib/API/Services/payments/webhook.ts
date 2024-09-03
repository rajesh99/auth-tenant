import Stripe from 'stripe';
import { RetrieveSubscription } from './subscription';
import prisma, { Prisma } from '../init/prisma';

enum WebhookEventsE {
  CheckoutSessionCompleted = 'checkout.session.completed',
  CustomerSubscriptionUpdated = 'customer.subscription.updated'
}

const WebhookEvents = {
  customer_subscription_updated: WebhookEventsE.CustomerSubscriptionUpdated,
  checkout_session_completed: WebhookEventsE.CheckoutSessionCompleted
};

export const WebhookEventHandler = async (event: Stripe.Event) => {
  // Handle the event
  switch (event.type) {
    case WebhookEvents.checkout_session_completed: {
      //@ts-expect-error, update function props to string for customer_id
      const subscriptionId = event.data.object.subscription;

      const subscription: Stripe.Subscription = await RetrieveSubscription(subscriptionId);
      const org_id = event.data.object.metadata.org_id;

      const customer_id = subscription.customer as string;
      const statusSub = subscription.status as string;

      const dataSub: Prisma.SubscriptionCreateInput = {
        id: subscriptionId,
        price_id: subscription.items.data[0].price.id,
        status: statusSub,
        period_ends_at: new Date(subscription.current_period_end * 1000)
      };

      try {
        const sub = await prisma.subscription.create({ data: dataSub });
        console.log(sub);
      } catch (e) {
        console.log(e);
      }

      console.log('Stripe Subscription Created');

      const dataOrg: Prisma.OrganizationUpdateInput = {
        customer_id,
        subscription: { connect: { id: subscription.id } }
      };

      try {
        await prisma.organization.update({
          where: {
            id: org_id
          },
          data: dataOrg
        });
      } catch (e) {
        console.log(e);
      }

      console.log('Stripe Customer Created');
      break;
    }
    case WebhookEvents.customer_subscription_updated: {
      // Incorrect infered type, need to override.
      const subscriptionUpdate = event.data.object as unknown as Stripe.Subscription;

      const dataSub: Prisma.SubscriptionUpdateInput = {
        id: subscriptionUpdate.id,
        price_id: subscriptionUpdate.items.data[0].price.id,
        status: subscriptionUpdate.status,
        period_ends_at: new Date(subscriptionUpdate.current_period_end * 1000)
      };

      try {
        await prisma.subscription.update({
          where: {
            id: subscriptionUpdate.id
          },
          data: dataSub
        });
      } catch (err) {
        console.log(err);
      }
      console.log('Stripe Subscription Updated');
      break;
    }
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
      throw `Unhandled Event Type ${event.type}`;
  }
};
