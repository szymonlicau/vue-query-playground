import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

import { QueryName } from '@/constants/vueQuery';
import { getProductsForCategory } from '@/services/api/products';

export const useProducts = (categorySlug: Ref<string>, enabled: Ref<boolean>) => {
  return useQuery(
    [ QueryName.Products, categorySlug ],
    () => getProductsForCategory(categorySlug.value),
    {
      enabled,
      staleTime: 60_000,
      select: (response) => response.data.products
    }
  );
};
