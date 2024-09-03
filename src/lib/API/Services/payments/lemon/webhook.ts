//import prisma, { Prisma } from '../init/prisma';

//import { type Subscription } from '@lemonsqueezy/lemonsqueezy.js';

//export enum WebhookEventsE {
//  SUBSCRIPTION_CREATED = 'subscription_created',
//  SUBSCRIPTION_UPDATED = 'subscription_updated'
//}

//type SubscriptionEventNames =
//  | WebhookEventsE.SUBSCRIPTION_CREATED
//  | WebhookEventsE.SUBSCRIPTION_UPDATED;

//export type WebhookPayload = {
//  meta: {
//    event_name: SubscriptionEventNames;
//    custom_data?: { org_id: string };
//  };
//  data: Subscription['data'];
//};

//export const WebhookEventHandler = async (event: WebhookPayload) => {
//  // Handle the event
//  switch (event.meta.event_name) {
//    case WebhookEventsE.SUBSCRIPTION_CREATED: {
//      const org_id = event.meta.custom_data.org_id;
//      const subscription_id = event.data.id.toString();

//      const dataSub: Prisma.SubscriptionCreateInput = {
//        id: subscription_id,
//        price_id: event.data.attributes.variant_id.toString(),
//        status: event.data.attributes.status,
//        period_ends_at: new Date(event.data.attributes.billing_anchor * 1000)
//      };

//      try {
//        const sub = await prisma.subscription.create({ data: dataSub });
//        console.log(sub);
//      } catch (e) {
//        console.log(e);
//      }

//      console.log('Subscription Created');

//      const dataOrg: Prisma.OrganizationUpdateInput = {
//        customer_id: String(event.data.attributes.customer_id),
//        subscription: { connect: { id: subscription_id } }
//      };

//      try {
//        await prisma.organization.update({
//          where: {
//            id: org_id
//          },
//          data: dataOrg
//        });
//      } catch (e) {
//        console.log(e);
//      }
//      console.log('Customer Created');
//      break;
//    }
//    case WebhookEventsE.SUBSCRIPTION_UPDATED: {
//      const id = event.data.id.toString();

//      const dataSub: Prisma.SubscriptionUpdateInput = {
//        id,
//        price_id: event.data.attributes.variant_id.toString(),
//        status: event.data.attributes.status,
//        period_ends_at: new Date(event.data.attributes.billing_anchor * 1000)
//      };

//      try {
//        await prisma.subscription.update({
//          where: {
//            id
//          },
//          data: dataSub
//        });
//      } catch (err) {
//        console.log(err);
//      }
//      console.log('Subscription Updated');
//      break;
//    }
//    default:
//      // Unexpected event type
//      console.log(`Unhandled event type ${event.meta.event_name}.`);
//  }
//};
