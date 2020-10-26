import globalDatabaseService from '@/services/globalDatabaseService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const actions = {
  /* eslint-disable implicit-arrow-linebreak */
  /* eslint-disable function-paren-newline */
  saveSessionToGlobal(_, sessionId) {
    globalDatabaseService
      .saveSessionToGlobal(sessionId)
      .catchError(() =>
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
