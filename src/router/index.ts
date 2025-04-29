import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import LayoutSite from '@/layouts/LayoutSite.vue'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutSistema from '@/layouts/LayoutSystem.vue'

import Home from '@/pages/site/Home.vue'
import Login from '@/pages/auth/Login.vue'
import Dashboard from '@/pages/system/Dashboard.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutSite,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: LayoutAuth,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/sistema',
    component: LayoutSistema,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
