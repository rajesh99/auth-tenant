//'use server';

//import { type NewCheckout, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';

//import { GetUser } from '../../Database/user/queries';
//import { GetOrg } from '../../Database/org/queries';
//import configuration from '@/lib/config/site';
//import routes from '@/lib/config/routes';

//import '@/lib/API/Services/init/payments';

//interface createCheckoutProps {
//  price_id: string;
//  org_id: string;
//}

//export const createCheckoutSession = async ({
//  price_id,
//  org_id
//}: createCheckoutProps): Promise<string> => {
//  const storeId = process.env.NEXT_PUBLIC_LEMON_STORE_ID;
//  const variantId = price_id;

//  const user = await GetUser();
//  const email = user.email;
//  const org = await GetOrg({ id: org_id });

//  if (user.id !== org.owner_user_id) {
//    throw 'Unauthorized Operation';
//  }

//  const origin = configuration.url;

//  const attributes: NewCheckout = {
//    checkoutData: {
//      email,
//      custom: {
//        org_id
//      }
//    },
//    productOptions: {
//      redirectUrl: `${origin}/${routes.redirects.user.toUserDashboard}`
//    }
//  };

//  const { error, data } = await createCheckout(storeId, variantId, attributes);
//  if (error) throw error;

//  return data.data.attributes.url;
//};
