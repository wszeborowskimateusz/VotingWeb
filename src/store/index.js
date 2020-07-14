import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import userAuthentication from './userAuthenticationStore';
import localeStore from './localeStore';
import parliamentManagement from './parliamentManagementStore';
import tokenUtils from '../utils/tokenUtils';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userAuthentication,
    localeStore,
    parliamentManagement,
  },
  getters: {
    userToken: () => tokenUtils.getToken(),
  },
  plugins: [
    createPersistedState({
      paths: ['localeStore'],
    }),
  ],
});
