import { GetAllTodos } from '@/lib/API/Database/todos/queries';
import TodosList from '../_PageSections/TodosList';

export default async function ListTodos({ params }) {
  const todos = await GetAllTodos({ org_id: params.orgId });

  return (
    <div>
      <TodosList todos={todos} />
    </div>
  );
}
