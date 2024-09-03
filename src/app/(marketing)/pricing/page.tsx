'use client';

import { useState } from 'react';
import configuration from '@/lib/config/dashboard';

import { Icons } from '@/components/Icons';
import { Switch } from '@/components/ui/Switch';
import { ProductI } from '@/lib/types/types';
import { IntervalE } from '@/lib/types/enums';
import { cn } from '@/lib/utils/helpers';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { Separator } from '@/components/ui/Separator';
import PriceCard from '../_PageSections/PriceCard';

const MainCard = () => {
  const { products } = configuration;
  const product: ProductI = products[0];

  const { name, description, features, plans } = product;
  const { price, interval } = plans[0];

  return (
    <section className="flex flex-col py-8 mx-4 md:max-w-[64rem] md:py-12 lg:mb-16">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] mb-8">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Industry Leading Pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all the features for your project.
        </p>
      </div>
      <Separator />
      <div className="font-heading text-3xl mt-8 mb-4 md:text-4xl">Our Most Popular Plan:</div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">What&apos;s included in the {name} plan</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Icons.Check className="mr-2" size={20} color="green" /> {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h3 className="text-7xl font-bold">${price}</h3>
            <p className="text-sm font-medium text-muted-foreground">Billed {interval}</p>
          </div>
          <Link href="/auth/signup" className={cn(buttonVariants({ size: 'lg' }))}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="max-w-[85%] leading-normal text-slate-500 my-4">{description}</div>
    </section>
  );
};

const Pricing = () => {
  const [timeInterval, setTimeInterval] = useState(IntervalE.MONTHLY);

  const { products } = configuration;

  const basic: ProductI = products[0];
  const premium: ProductI = products[1];

  const changeTimeInterval = () => {
    const intervalSwitch =
      timeInterval === IntervalE.MONTHLY ? IntervalE.YEARLY : IntervalE.MONTHLY;
    setTimeInterval(intervalSwitch);
  };

  return (
    <div className="mb-10">
      <MainCard />

      <div className="">
        <div className="font-heading text-3xl mt-8 mb-16 text-center underline underline-offset-8 md:text-4xl">
          All Plans
        </div>
        <div className="flex justify-center mb-12">
          <div className="text-sm font-bold mr-2">Monthly</div>
          <Switch onClick={changeTimeInterval} />
          <div className="text-sm font-bold ml-3">Yearly</div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex justify-center">
            <PriceCard product={basic} timeInterval={timeInterval} />
          </div>
          <div className="flex justify-center">
            <PriceCard product={premium} timeInterval={timeInterval} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
