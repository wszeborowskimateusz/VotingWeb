import globalDatabaseService from '@/services/globalDatabaseService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const actions = {
  /* eslint-disable implicit-arrow-linebreak */
  /* eslint-disable function-paren-newline */
  saveSessionToGlobal({ dispatch }, sessionId) {
    globalDatabaseService
      .saveSessionToGlobal(sessionId)
      .then(() => {
        dispatch('parliamentManagement/loadSessions', null, { root: true });
      })
      .catch(() =>
        toasts.errorToast(i18n.tc('common.somethingWentWrong')),
      );
  },
};

export default {
  namespaced: true,
  state: {},
  actions,
  mutations: {},
};
