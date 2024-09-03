'use client';

import Link from 'next/link';

import routes from '@/lib/config/routes';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils/helpers';

export default function TeamSwitcher() {
  return (
    <div>
      <Link
        href={routes.redirects.user.toUserDashboard}
        className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'mr-6')}
      >
        User Dashboard
      </Link>
    </div>
  );
}
