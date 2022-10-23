<script setup lang="ts">
import { ref } from 'vue';
import { useTodos, useAddTodo } from '@/composables/api/todos';

import SpinnerWrapper from '@/components/SpinnerWrapper.vue';
import TodoItem from '@/components/TodoItem.vue';

const { data: todos, isLoading: todosLoading } = useTodos();

const content = ref('');

const { mutateAsync, isLoading } = useAddTodo();

const addNewTodo = async () => {
  await mutateAsync({
    todo: content.value,
    completed: false
  });

  content.value = '';
};
</script>

<template>
  <h1> Todos </h1>

  <SpinnerWrapper v-if="todosLoading" />

  <template v-else>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />

    <form
      class="todo-form"
      @submit.prevent="addNewTodo"
    >
      <input
        v-model="content"
        class="todo-form__content"
        type="text"
        placeholder="Enter a task description"
        required
      />

      <button
        type="submit"
        :disabled="isLoading"
      >
        Add
      </button>
    </form>
  </template>
</template>

<style scoped lang="scss">
.todo-form {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  max-width: 64rem;

  &__content {
    width: 100%;
  }
}
</style>
