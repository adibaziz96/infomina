import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Members from '../views/member/Members.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { path: '', name: 'Login', component: Login },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'members', name: 'Members', component: Members },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) next('/login')
  else next()
})

export default router
