import { PrismaDBError } from '@/lib/utils/error';
import { GetUser } from '../user/queries';
import prisma from '../../Services/init/prisma';
import { Todo } from '@prisma/client';

interface GetOrgTodosI {
  org_id: string;
}

export const GetTodosByUserId = async ({ org_id }: GetOrgTodosI): Promise<Todo[]> => {
  const user = await GetUser();
  const user_id = user?.id;

  try {
    const todos = await prisma.todo.findMany({
      where: {
        AND: {
          user_id: {
            equals: user_id
          },
          org_id: {
            equals: org_id
          }
        }
      }
    });

    return todos;
  } catch (err) {
    PrismaDBError(err);
  }
};

export const GetTodoById = async (id: string): Promise<Todo> => {
  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id
      }
    });

    return todo;
  } catch (err) {
    PrismaDBError(err);
  }
};

export const GetAllTodos = async ({ org_id }: GetOrgTodosI): Promise<Todo[]> => {
  try {
    const todos = await prisma.todo.findMany({
      where: { org_id },
      take: 10
    });

    return todos;
  } catch (err) {
    PrismaDBError(err);
  }
};
