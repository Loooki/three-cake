import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/three1',
    name: 'Three1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Three1.vue')
  },
  {
    path: '/texture',
    name: 'Texture',
    component: () => import(/* webpackChunkName: "about" */ '../views/Texture.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  },
  {
    path: '/cake',
    name: 'Cake',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cake.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
