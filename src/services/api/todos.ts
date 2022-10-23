import { defaultClient } from '@/services/api/client';
import type { Todo } from '@/types/todos';

export const getTodos = (userId = 5) => {
  return defaultClient.get<{ todos: Todo[] }>(`/todos/user/${userId}`);
};

export const addTodo = (params: Omit<Partial<Todo>, 'id' | 'userId'>, userId = 5) => {
  return defaultClient.post<Todo>('/todos/add', {
    ...params,
    userId
  });
};

export const updateTodo = (
  params: { id: string | number; data: Omit<Partial<Todo>, 'id'> }
) => {
  return defaultClient.put(`/todos/${params.id}`, {
    ...params.data
  });
};

export const removeTodo = (todoId: number | string) => {
  return defaultClient.delete(`/todos/${todoId}`);
};
