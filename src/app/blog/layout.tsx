import { Header } from '../(marketing)/_PageSections/Header';
import { LayoutProps } from '@/lib/types/types';
import Footer from '@/components/Footer';

export default async function MarketingLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main className="mx-4 lg:grid justify-center gap-6 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
