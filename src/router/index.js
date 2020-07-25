import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/components/pages/Login.vue';
import StartingPage from '@/components/pages/StartingPage.vue';
import SessionsList from '@/components/pages/SessionsList.vue';
import AlreadyVotedPannel from '@/components/pages/AlreadyVotedPannel.vue';
import UserManagementPage from '@/components/pages/UserManagementPage.vue';

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
  {
    path: '/already-voted/:sessionId/:votingId',
    component: AlreadyVotedPannel,
  },
  {
    path: '/user-management',
    component: UserManagementPage,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
