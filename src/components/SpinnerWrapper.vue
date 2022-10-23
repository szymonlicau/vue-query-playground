<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';
import { Props } from '@/components/Spinner.vue';

withDefaults(defineProps<{
  size?: number;
  white?: boolean;
}>(), {
  size: 64,
  white: false
});
</script>

<template>
  <div class="spinner-wrapper">
    <Spinner
      :size="size"
      :white="white"
    />
  </div>
</template>

<style scoped lang="scss">
.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24rem;
}
</style>
