import MyTodos from '../_PageSections/MyTodos';
import { GetTodosByUserId } from '@/lib/API/Database/todos/queries';

export default async function ListTodos({ params }) {
  const todos = await GetTodosByUserId({ org_id: params.orgId });

  return (
    <div>
      <MyTodos todos={todos} />
    </div>
  );
}
