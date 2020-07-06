import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import toasts from '@/utils/toasts';
import i18n from './i18n';

require('bootstrap');

Vue.config.productionTip = false;

function checkForWrongToken(to, _, next) {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);

  // See if there is a JWT in local storage
  const loggedIn = localStorage.getItem('user');

  if (!loggedIn && store.state.userAuthentication.status.loggedIn) {
    store.dispatch('users/logout', null, { root: true });
    toasts.errorToast('Twój token jest nieprawidłowy, dla bezpieczeństwa wylogowano cię z aplikacji');
    return next('/login');
  }

  if (authRequired && !loggedIn) {
    toasts.errorToast('Aby dostać się na tę stronę musisz się zalogować');
    return next('/login');
  }

  if (loggedIn && (to.path === '/login' || to.path === '/register')) {
    return next('/');
  }

  return next();
}

// Prevent accessing restricted pages if not logged in
router.beforeEach((to, from, next) => {
  checkForWrongToken(to, from, next);
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
