import userService from '@/services/userAuthenticationService';
import router from '@/router';
import toasts from '@/utils/toasts';
import i18n from '../i18n';
import tokenUtils from '../utils/tokenUtils';

function onLoginSuccess(commit) {
  commit('loginSuccess');
  router.push('/');
}

const userToken = JSON.parse(tokenUtils.getToken());

const userState = userToken ? { status: { loggedIn: true } } : { status: {} };

const actions = {
  login({ commit }, { username, password }) {
    commit('loginInProgress');
    userService.login(username, password).then(
      () => onLoginSuccess(commit),
      () => {
        toasts.errorToast(
          `${i18n.t('login.loginFailed')}. ${i18n.t('common.tryAgain')}`,
        );
        commit('loginFailure');
      },
    );
  },
  logout({ commit }) {
    userService.logout();
    commit('logout');
    router.push('/login');
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  loginSuccess(state) {
    state.status = { loggedIn: true };
  },
  loginInProgress(state) {
    state.status = { loginInProgress: true };
  },
  loginFailure(state) {
    state.status = {};
  },
  logout(state) {
    state.status = {};
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: userState,
  actions,
  mutations,
};
