import { defaultClient } from '@/services/api/client';

export const getCategories = () => {
  return defaultClient.get<string[]>('/products/categories');
}
