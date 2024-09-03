import { GetTodoById } from '@/lib/API/Database/todos/queries';
import TodosEditForm from '../../_PageSections/TodoEditform';

export default async function EditTodo({ params }) {
  const todo = await GetTodoById(params.id);

  return (
    <div>
      <TodosEditForm todo={todo} />
    </div>
  );
}
