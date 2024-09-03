import { Separator } from '@/components/ui/Separator';
import { TodosNav } from './_PageSections/TodosNav';
import TodosHeader from './_PageSections/TodosHeader';
import routes from '@/lib/config/routes';
import { LayoutProps } from '@/lib/types/types';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="lg:max-w-lg">
      <div>
        <TodosHeader />
        <Separator className="my-6" />
        <TodosNav items={routes.routes_dashboard_subroutes.todos} />

        <div>{children}</div>
      </div>
    </div>
  );
}
