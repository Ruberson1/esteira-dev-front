import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authMiddleware from "@/middleware/authMiddleware";

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: authMiddleware,
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView')
  },
  {
    path: '/register-confirmation',
    name: 'register-confirmation',
    component: () => import(/* webpackChunkName: "register-confirmation" */ '../views/RegisterConfirmationView')
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UserView')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "history" */ '../views/HistoryView')
  },
  {
    path: '/bugs',
    name: 'bugs',
    component: () => import(/* webpackChunkName: "bugs" */ '../views/BugView')
  },
  {
    path: '/pull',
    name: 'pull',
    component: () => import(/* webpackChunkName: "pull" */ '../views/PullView')
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "tasks" */ '../views/TaskView')
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import(/* webpackChunkName: "unauthorized" */ '../views/UnathorizedView')
  },
  {
    path: '/social',
    name: 'social',
    component: () => import(/* webpackChunkName: "social" */ '../views/SocialView')
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const token = sessionStorage.getItem('token');

router.beforeEach((to, from, next) => {
  // Verifica se o usuário está autenticado e se a rota atual é diferente da página de login
  if (!token
      && to.name !== 'login'
      && to.name !== 'social'
      && to.name !== 'not-found'
      && to.name !== 'register-confirmation'
  ) {
    // Se o usuário não estiver autenticado, redirecione-o para a página de login
    next({ name: 'login' });
  } else {
    // Caso contrário, permita o acesso à rota
    next();
  }
});

export default router
