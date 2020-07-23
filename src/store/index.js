import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import userAuthentication from './userAuthenticationStore';
import localeStore from './localeStore';
import parliamentManagement from './parliamentManagementStore';
import votingsManagement from './votingsManagementStore';
import membersManagement from './membersManagementStore';
import tokenUtils from '../utils/tokenUtils';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userAuthentication,
    localeStore,
    parliamentManagement,
    votingsManagement,
    membersManagement,
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
