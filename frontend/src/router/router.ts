import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StartPage from '../views/StartPage.vue';
import MoviePage from '../views/MoviePage.vue';
import UserPage from '../views/UserPage.vue';

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
  },
  { path: '/movies',
    name: 'MoviePage',
    component: MoviePage
  },
  { path: '/users',
    name: 'UserPage',
    component: UserPage
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
