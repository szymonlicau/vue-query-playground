<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Todo } from '@/types/todos';

import { useUpdateTodo, useRemoveTodo } from '@/composables/api/todos';

const props = defineProps<{
  todo: Todo
}>();

const { mutateAsync: mutateUpdate, isLoading: updateLoading } = useUpdateTodo();
const { mutateAsync: mutateRemove, isLoading: removeLoading } = useRemoveTodo();

const apiLoading = computed(() => {
  return updateLoading.value || removeLoading.value;
});

// Keep data local due to API not actually updating
const content = ref(props.todo.todo);
const completed = ref(props.todo.completed);

const updateChecked = async () => {
  if (apiLoading.value) {
    return;
  }

  completed.value = !completed.value;

  await mutateUpdate({
    id: props.todo.id,
    data: {
      completed: completed.value
    }
  });
};

const updateContent = (newContent: string) => {
  if (apiLoading.value) {
    return;
  }

  return mutateUpdate({
    id: props.todo.id,
    data: {
      todo: newContent
    }
  });
};

const removeTodo = () => {
  if (apiLoading.value) {
    return;
  }

  return mutateRemove(props.todo.id);
};

const editingContent = ref(false);

const startEditing = () => {
  editingContent.value = true;
};

const finishEditing = async () => {
  await updateContent(content.value);

  editingContent.value = false;
};
</script>

<template>
  <div
    :class="[
      'todo',
      {
        'todo--completed': completed
      }
    ]"
  >
    <input
      class="todo__checkbox"
      type="checkbox"
      :checked="completed"
      :disabled="apiLoading"
      @change="updateChecked"
    />

    <form
      v-if="editingContent"
      class="todo__form"
      @submit.prevent="finishEditing"
    >
      <input
        v-model="content"
        class="todo__content"
        type="text"
        placeholder="Enter a task description"
        required
      />

      <button
        type="submit"
        :disabled="apiLoading"
      >
        Save
      </button>
    </form>
    <span
      v-else
      class="todo__content todo__content-preview"
      @click="startEditing"
    >
      {{ content }}
    </span>

    <button
      :disabled="apiLoading"
      @click="removeTodo"
    >
      Remove
    </button>
  </div>
</template>

<style scoped lang="scss">
.todo {
  display: flex;
  gap: 1.6rem;
  align-items: center;
  max-width: 64rem;

  & + & {
    margin-top: 1.6rem;
  }

  &__content {
    width: 100%;
  }

  &--completed &__content-preview {
    text-decoration: line-through;
  }

  &__form {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
  }
}
</style>
