import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StartPage from '../views/StartPage.vue';
import MoviePage from '../views/MoviePage.vue';
import UserPage from '../views/UserPage.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Startpage',
    component: StartPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: StartPage,
    props: { defaultView: 'login' }
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
