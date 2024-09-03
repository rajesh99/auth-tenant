'use client';

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DeleteTodo } from '@/lib/API/Database/todos/mutations';
import { Button, buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import config from '@/lib/config/api';
import { Todo } from '@prisma/client';
import routes from '@/lib/config/routes';
interface TodoCardProps {
  todo: Todo;
}

interface MyTodosProps {
  todos: Todo[];
}

const TodoCard = ({ todo }: TodoCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { id, title, description } = todo;
  const org_id = pathname.split('/')[2];
  const todosEditPath = '/todos/edit/';

  const href = `${routes.redirects.dashboard.dashboardBase}${org_id}${todosEditPath}${id}`;

  const Delete = async () => {
    const todo_id = id;
    try {
      await DeleteTodo({ id: todo_id });
    } catch (err) {
      toast.error(config.errorMessageGeneral);
      throw err;
    }

    toast.success('Todo Deleted');
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={href}
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'mr-6')}
        >
          Edit
        </Link>
        <Button onClick={Delete} variant="destructive">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

const MyTodos = ({ todos }: MyTodosProps) => {
  return (
    <div>
      {todos?.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
      {todos.length === 0 && <div>No Todos Found</div>}
    </div>
  );
};

export default MyTodos;
