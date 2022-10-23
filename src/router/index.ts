import { createRouter, createWebHistory } from 'vue-router';

import { RouteName } from '@/constants/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Home,
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/category/:slug',
      name: RouteName.Category,
      component: () => import('@/pages/CategoryPage.vue'),
      props: true
    },
    {
      path: '/todos',
      name: RouteName.Todos,
      component: () => import('@/pages/TodosPage.vue')
    }
  ],
  scrollBehavior () {
    return {
      el: '#app',
      top: 0
    }
  }
});

export default router;
