import { defaultClient } from "./client";
import type { Product } from '@/types/products';

export const getProductsForCategory = (categorySlug: string) => {
  return defaultClient.get<{ products: Product[] }>(`/products/category/${categorySlug}`);
}
