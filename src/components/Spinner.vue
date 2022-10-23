<script lang="ts">
export type Props = {
  size?: number;
  white?: boolean;
};
</script>

<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  size: 24,
  white: false
});
</script>

<template>
  <div
    :class="[
      'spinner',
      {
        'spinner--white': white
      }
    ]"
  />
</template>

<style scoped lang="scss">
@keyframes spin {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(720deg);
  }
}

.spinner {
  --size: calc(0.1rem * v-bind(size));
  --color: var(--primary-color-shade);

  display: inline-block;
  width: var(--size);
  height: var(--size);
  border-radius: 999rem;
  border: calc(var(--size) / 8) solid var(--color);
  border-left-color: transparent;
  animation: spin 0.8s infinite;

  &--white {
    --color: var(--white-color);
  }
}
</style>
