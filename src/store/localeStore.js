import i18n, { selectedLocale } from '../i18n';

export default {
  namespaced: true,
  state: {
    locale: selectedLocale,
  },
  mutations: {
    updateLocale(state, newLocale) {
      state.locale = newLocale;
    },
  },
  actions: {
    changeLocale({ commit }, newLocale) {
      console.log('CHANGING THE LOCALE');
      i18n.locale = newLocale;
      commit('updateLocale', newLocale);
    },
  },
};
