import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StartPage from '../views/StartPage.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Startpage',
    component: StartPage,
    props: { defaultView: 'login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: StartPage,
    props: { defaultView: 'login' }
  },
  {
    path: '/register',
    name: 'Register',
    component: StartPage,
    props: { defaultView: 'register' }
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
