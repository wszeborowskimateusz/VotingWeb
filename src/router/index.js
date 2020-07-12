import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/components/pages/Login.vue';
import StartingPage from '@/components/pages/StartingPage.vue';
import SessionsList from '@/components/pages/SessionsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: StartingPage,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/sessions',
    component: SessionsList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
