import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import createCache from 'vuex-cache';

import userAuthentication from './userAuthenticationStore';
import localeStore from './localeStore';
import parliamentPreparation from './parliamentPreparationStore';
import parliamentManagement from './parliamentManagementStore';
import votingsManagement from './votingsManagementStore';
import membersManagement from './membersManagementStore';
import tokenUtils from '../utils/tokenUtils';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userAuthentication,
    localeStore,
    parliamentPreparation,
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
    createCache(),
  ],
});
