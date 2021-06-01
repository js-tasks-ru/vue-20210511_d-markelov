import VueRouter from 'vue-router';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';

export const routes = [
  {
    path: '/',
    component: () => import('../views/IndexPage'),
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: '/04-spa/05-AuthPages',
  routes,
});
