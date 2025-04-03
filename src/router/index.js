import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatorView from '../views/CreatorView.vue'
import PresetsView from '@/views/PresetsView.vue'
import LoadoutsView from '@/views/LoadoutsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/creator',
      name: 'creator',
      component: CreatorView
    },
    {
      path: '/presets',
      name: "presets",
      component: PresetsView
    },
    {
      path: '/loadouts',
      name: "loadouts",
      component: LoadoutsView
    }
  ],
})

export default router
