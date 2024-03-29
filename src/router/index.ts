import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoList.vue')
    },
    {
      path: '/kanji',
      name: 'kanji',
      component: () => import('../views/KanjiView.vue')
    },
    {
      path: '/shorturl',
      name: 'shorturl',

      component: () => import('../views/ShortLinkView.vue')
    },
    {
      path: '/ref_test',
      name: 'ref_test',
      component: () => import('../views/RefView.vue')
    },
    {
      path: '/dragtest',
      name: 'dragtest',
      component: () => import('../views/DraggableView.vue')
    },
    {
      path: '/tenk',
      name: 'tenk',
      component: () => import('../views/TenkView.vue')
    }
  ]
})

export default router
