// @ts-ignore
import HomeView from '@/views/HomeView.vue'
import EditView from '@/views/EditView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView,
    },
  ],
})

export default router
