import Stripe from 'stripe';

const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);

export default stripe;

// uncommment if using lemon, remove otherwise
//import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

//lemonSqueezySetup({
//  apiKey: process.env.LEMONSQUEEZY_API_KEY,
//  onError(error) {
//    console.log(error);
//  }
//});
