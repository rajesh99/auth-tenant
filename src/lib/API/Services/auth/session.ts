import 'server-only';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import routes from '@/lib/config/routes';

export const GetSession = async () => {
  const session = await auth();

  return session;
};

export const RequireSession = async () => {
  const session = await auth();

  if (!session) redirect(routes.redirects.auth.requireAuth);
};
