import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { WebhookEventHandler } from '@/lib/API/Services/payments/webhook';
import type { NextRequest } from 'next/server';

import stripe from '@/lib/API/Services/init/payments';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature');
  const webhookSecret = process.env.WEBHOOK_SECRET;

  if (!sig || !webhookSecret) return;
  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  try {
    await WebhookEventHandler(event);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// uncomment for Lemon
//import crypto from 'crypto';

//export async function POST(req: NextRequest) {
//  console.log('Starting...');

//  const webhookSecret = process.env.WEBHOOK_SECRET;
//  const body = await req.text();
//  const hmac = crypto.createHmac('sha256', webhookSecret);
//  const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf8');
//  const signature = Buffer.from(headers().get('X-Signature') || '', 'utf8');

//  if (!crypto.timingSafeEqual(digest, signature)) {
//    throw new Error('Invalid signature.');
//  }

//  const payload = JSON.parse(body);

//  try {
//    await WebhookEventHandler(payload);
//    return NextResponse.json({ received: true }, { status: 200 });
//  } catch (err) {
//    return NextResponse.json({ error: err.message }, { status: 500 });
//  }
//}
