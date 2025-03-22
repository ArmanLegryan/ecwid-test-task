import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/products/:productId',
      name: 'ProductDetails',
      component: ProductDetailsView,
    },
  ],
})

export default router
