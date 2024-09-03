//'use server';

//import { getCustomer } from '@lemonsqueezy/lemonsqueezy.js';
//import '@/lib/API/Services/init/payments';

//interface SubscriptionPropsI {
//  payments_id: string;
//}

//export const GetBillingUrl = async ({ payments_id }: SubscriptionPropsI): Promise<string> => {
//  const id = payments_id;
//  const { error, data } = await getCustomer(id);
//  if (error) throw error;

//  const resUrl = data.data.attributes.urls.customer_portal;

//  return resUrl;
//};
