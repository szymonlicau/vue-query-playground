import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

import { QueryName } from '@/constants/vueQuery';

import { getCategories } from '@/services/api/categories';

function titleize (input: string) {
  return `${input[0].toUpperCase()}${input.slice(1)}`
};

export const useCategories = () => {
  return useQuery(
    [ QueryName.Categories ], // cache key
    getCategories, // our axios API call
    {
      // 1 minute of stale time
      staleTime: 60_000,
      // What to return as a result; here we can also transform it
      select: (response) => {
        return response.data.slice(0, 5).map(category => {
          return {
            slug: category,
            name: titleize(category)
          };
        });
      }
    }
  );
};

export const useCategory = (categorySlug: Ref<string>) => {
  return useQuery(
    [ QueryName.Category, categorySlug ],
    // Same endpoint but we simulate it as separate
    // for demonstration purposes
    getCategories,
    {
      // 1 minute of stale time
      staleTime: 60_000,
      select: (response) => {
        const selectedCategory = response.data.find(c => c === categorySlug.value) || '';

        return {
          id: selectedCategory,
          name: titleize(selectedCategory)
        }
      }
    }
  );
};
