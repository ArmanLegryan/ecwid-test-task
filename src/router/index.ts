import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import CardView from '@/views/CardView.vue'
import CategoriesView from '@/views/CategoriesView.vue'

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
    {
      path: '/card',
      name: 'Card',
      component: CardView,
    },
    {
      path: '/categories/:categoryId',
      name: 'Categories',
      component: CategoriesView,
    },
  ],
})

export default router
