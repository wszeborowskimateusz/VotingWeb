import parliamentPreparationService from '@/services/parliamentPreparationService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const preparationState = {
  isLoading: false,
  passwordsFile: null,
};

const actions = {
  setParliamentDetails({ commit }, { session, userFile }) {
    commit('loading');
    parliamentPreparationService.setParliamentDetails(session, userFile).then(
      () => commit('loadingFinished'),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('loadingFinished');
      },
    );
  },
  editParliamentDetails({ commit }, session) {
    commit('loading');
    parliamentPreparationService.editParliamentDetails(session).then(
      () => commit('loadingFinished'),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('loadingFinished');
      },
    );
  },
  getPasswordsList({ commit }) {
    commit('loading');
    //TODO: Make the file autodownload
    parliamentPreparationService.generatePasswords().then(
      (response) => commit('passwordsFileLoaded', response),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('loadingFinished');
      },
    );
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  loadingFinished(state) {
    state.isLoading = false;
  },
  passwordsFileLoaded(state, file) {
    state.passwordsFile = file;
    state.isLoading = false;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: preparationState,
  actions,
  mutations,
};
