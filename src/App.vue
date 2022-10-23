<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
  <div class="app">
    <AppHeader />

    <main class="app__wrapper">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;
  max-width: 128rem;
  margin: 0 auto;
  display: grid;
  grid-template-rows: min-content 1fr min-content;

  &__wrapper {
    padding: 0 1.6rem;
  }
}
</style>
