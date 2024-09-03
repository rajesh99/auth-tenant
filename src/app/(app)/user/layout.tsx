import { LayoutProps } from '@/lib/types/types';
import HeaderUser from './_PageSections/Header';
import routes from '@/lib/config/routes';
import { redirect } from 'next/navigation';
import { GetSession } from '@/lib/API/Services/auth/session';

export default async function UserLayout({ children }: LayoutProps) {
  const session = await GetSession();
  if (!session) redirect(routes.redirects.auth.requireAuth);

  return (
    <div>
      <HeaderUser />
      <main className="grid justify-center items-center">{children}</main>
    </div>
  );
}
