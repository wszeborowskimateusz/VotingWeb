import Vue from 'vue';
import Vuex from 'vuex';

import userAuthentication from './userAuthenticationStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userAuthentication,
  },
  getters: {
    userToken: () => localStorage.getItem('user-token'),
  },
});
