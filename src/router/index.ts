import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import LayoutSite from '@/layouts/LayoutSite.vue'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutSystem from '@/layouts/LayoutSystem.vue'

import Home from '@/pages/site/Home.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Dashboard from '@/pages/system/Dashboard.vue'
import MyAccount from '@/pages/system/MyAccount.vue'
import Settings from '@/pages/system/Settings.vue'
import Patients from '@/pages/system/Patients.vue'
import PatientRecord from '@/components/system/patient/PatientRecord.vue'

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
    path: '/auth',
    component: LayoutAuth,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/system',
    component: LayoutSystem,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'minha-conta',
        name: 'myAccount',
        component: MyAccount
      },
      {
        path: 'configuracoes',
        name: 'settings',
        component: Settings
      },
      {
        path: 'pacientes',
        name: 'patients',
        component: Patients
      },
      {
        path: 'pacientes/:id',
        name: 'patientRecord',
        component: PatientRecord,
        props: true
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
