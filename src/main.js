import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import toasts from '@/utils/toasts';
import VModal from 'vue-js-modal';
import 'vuetify/dist/vuetify.min.css';
import i18n from './i18n';
import tokenUtils from './utils/tokenUtils';
import vuetify from './plugins/vuetify';
import commonComponents from './plugins/commonComponents';

require('bootstrap');

Vue.config.productionTip = false;

function checkForWrongToken(to, _, next) {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  // See if there is a JWT in local storage
  const loggedIn = tokenUtils.getToken();

  if (!loggedIn && store.state.userAuthentication.status.loggedIn) {
    store.dispatch('userAuthentication/logout', null, { root: true });
    toasts.errorToast(i18n.tc('login.invalidToken'));
    return next('/login');
  }

  if (authRequired && !loggedIn) {
    if (to.path !== '/') {
      toasts.errorToast(i18n.tc('login.authenticationRequired'));
    }

    return next('/login');
  }

  if (loggedIn && to.path === '/login') {
    return next('/');
  }

  return next();
}

// Prevent accessing restricted pages if not logged in
router.beforeEach((to, from, next) => {
  checkForWrongToken(to, from, next);
});

Vue.use(VModal);
commonComponents.register();


new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
