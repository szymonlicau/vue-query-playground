<script setup lang="ts">
import { NavigationItems, RouteName } from '@/constants/router';
import { useCategories } from '@/composables/api/categories';

import Spinner from '@/components/Spinner.vue';

const { data: categories, isLoading } = useCategories();
</script>

<template>
  <footer class="footer">
    <nav class="footer__nav">
      <section class="footer__section">
        <div class="footer__section-title">
          App routes
        </div>

        <router-link
          v-for="route in NavigationItems"
          class="footer__link"
          :key="route"
          :to="{ name: route }"
        >
          {{ route }}
        </router-link>
      </section>

      <section
        v-if="isLoading || categories?.length"
        class="footer__section"
      >
        <Spinner
          v-if="isLoading"
          white
        />

        <template v-else>
          <div class="footer__section-title">
            Categories
          </div>

          <router-link
            v-for="category in categories"
            :key="category.slug"
            :to="{ name: RouteName.Category, params: { slug: category.slug } }"
            class="footer__link"
          >
            {{ category.name }}
          </router-link>
        </template>
      </section>
    </nav>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: var(--primary-color);
  padding: 4rem 1.6rem;
  color: var(--white-color);

  &__nav {
    --columns: 1;

    display: grid;
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
    grid-gap: 1.6rem;

    @include lg {
      --columns: 2;
    }
  }

  &__section {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }

  &__section-title {
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
  }

  &__link {
    color: inherit;
    display: inline-block;
    text-decoration: none;

    &:hover,
    &.router-link-active {
      font-weight: bold;
    }

    & + & {
      margin-block-start: 0.8rem;
    }
  }
}
</style>
