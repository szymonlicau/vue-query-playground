<script setup lang="ts">
import { computed, toRefs } from 'vue';
import SpinnerWrapper from '@/components/SpinnerWrapper.vue';

import { useCategory } from '@/composables/api/categories';
import { useProducts } from '@/composables/api/products';

const props = defineProps<{
  slug: string;
}>();

const { slug } = toRefs(props);

const { data: category, isLoading: categoryLoading } = useCategory(slug);

const productsEnabled = computed(() => !categoryLoading.value);

const { data: products, isLoading: productsLoading } = useProducts(
  slug,
  productsEnabled
);

const isLoading = computed(() => {
  return categoryLoading.value || productsLoading.value;
});
</script>

<template>
  <SpinnerWrapper v-if="isLoading" />

  <template v-else-if="category">
    <h1> {{ category.name }} </h1>

    <div class="products">
      <div
        v-for="product in products"
        :key="product.id"
        class="product"
      >
        <img
          class="product__image"
          :alt="`${product.title} image`"
          :src="product.thumbnail"
        />

        <div class="product__info">
          <div class="product__title">
            {{ product.title }} - ${{ product.price }}
          </div>

          <p class="product__description">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
.products {
  --columns: 1;

  display: grid;
  padding-bottom: 2.4rem;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  grid-gap: 1.6rem;

  @include md {
    --columns: 2;
  }

  @include lg {
    --columns: 3;
  }
}

.product {
  border-radius: 0.8rem;
  overflow: hidden;
  border: 0.1rem solid var(--border-color);
  box-shadow: 0 0 0.8rem rgba(black, 0.2);

  &__image {
    display: block;
    width: 100%;
    height: 24rem;
    object-fit: contain;
  }

  &__info {
    padding: 1.6rem;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: bold;
  }

  &__description {
    margin: 0.8rem 0 0;
  }
}
</style>
