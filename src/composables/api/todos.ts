import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QueryName } from '@/constants/vueQuery';

import {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo
} from '@/services/api/todos';

export const useTodos = () => {
  return useQuery(
    [ QueryName.Todos ],
    () => getTodos(),
    {
      staleTime: 60_000,
      select: (response) => response.data.todos
    }
  );
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    addTodo,
    {
      onSuccess () {
        // Refetch them after adding successfully
        queryClient.invalidateQueries([ QueryName.Todos ]);
      }
    }
  );
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    updateTodo,
    {
      onSuccess () {
        // Refetch them after adding successfully
        queryClient.invalidateQueries([ QueryName.Todos ]);
      }
    }
  );
};

export const useRemoveTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    removeTodo,
    {
      onSuccess () {
        // Refetch them after adding successfully
        queryClient.invalidateQueries([ QueryName.Todos ]);
      }
    }
  );
};
