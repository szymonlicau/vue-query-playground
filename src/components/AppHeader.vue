<script setup lang="ts">
import { NavigationItems, RouteName } from '@/constants/router';
import { useCategories } from '@/composables/api/categories';

import Spinner from '@/components/Spinner.vue';

const { data: categories, isLoading } = useCategories();
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__app-items">
        <router-link
          v-for="route in NavigationItems"
          class="header__link"
          :key="route"
          :to="{ name: route }"
        >
          {{ route }}
        </router-link>
      </div>


      <div class="header__api-items"
        v-if="isLoading || categories?.length"
      >
        <Spinner
          v-if="isLoading"
          white
        />

        <template v-else>
          <router-link
            v-for="category in categories"
            :to="{ name: RouteName.Category, params: { slug: category.slug } }"
            :key="category.slug"
            class="header__link"
          >
            {{ category.name }}
          </router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--primary-color);
  padding: 2.4rem 1.6rem;
  position: sticky;
  top: 0;
  color: var(--white-color);

  &__nav {
    display: flex;
    flex-flow: column;

    @include lg {
      align-items: center;
      flex-flow: row;
    }
  }

  &__app-items,
  &__api-items {
    display: flex;
    gap: 1.6rem;
    align-items: center;
  }

  &__api-items {
    flex-wrap: wrap;
    margin-block-start: 1.6rem;
    padding-block-start: 1.6rem;
    border-top: 0.2rem solid var(--white-color);

    @include lg {
      margin-block-start: 0;
      padding-block-start: 0;
      border-top: none;
      margin-inline-start: auto;
    }
  }

  &__link {
    color: inherit;
    text-decoration: none;
    padding: 0.4rem 0;
    border-top: 0.3rem solid transparent;
    border-bottom: 0.3rem solid transparent;
    transition: all 0.1s linear;

    &:hover,
    &.router-link-active {
      font-weight: bold;
    }

    &.router-link-active {
      border-bottom-color: var(--white-color);
    }
  }
}
</style>
