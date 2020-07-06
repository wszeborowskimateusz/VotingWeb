import userService from '@/services/userAuthenticationService';
import router from '@/router';
import toasts from '@/utils/toasts';


function onLoginSuccess(commit) {
  commit('loginSuccess');
  router.push('/');
}

const userToken = JSON.parse(localStorage.getItem('user-token'));

const userState = userToken
  ? { status: { loggedIn: true } }
  : { status: {} };

const actions = {
  login({ commit }, { username, password }) {
    commit('loginInProgress');
    userService.login(username, password)
      .then(
        () => onLoginSuccess(commit),
        (error) => {
          toasts.errorToast(`${error}. Spróbuj ponownie.`);
          commit('loginFailure', error);
        },
      );
  },
  logout({ commit }) {
    userService.logout();
    toasts.successToast('Pomyślnie wylogowano się');
    commit('logout');
    router.push('/');
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
