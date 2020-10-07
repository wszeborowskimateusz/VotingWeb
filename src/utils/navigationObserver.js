import tokenUtils from './tokenUtils';
import toasts from './toasts';
import i18n from '../i18n';

export default {
  checkForWrongToken: (store, to, _, next) => {
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
  },
};
