import parliamentPreparationService from '@/services/parliamentPreparationService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const getDefaultState = () => ({
  isLoading: false,
  passwordsFile: null,
});

const preparationState = getDefaultState();

const actions = {
  setParliamentDetails({ commit, dispatch }, { session, userFile }) {
    commit('loading');
    return parliamentPreparationService
      .setParliamentDetails(session, userFile)
      .then(
        () => {
          commit('loadingFinished');
          dispatch('parliamentManagement/loadSessions', null, { root: true });
        },
        (error) => {
          if (error.httpCode === 412) {
            if (error.errorCode === 'DATA_INCOMPLETE') {
              toasts.errorToast(
                i18n.tc('errorMessages.preparation.dataIncomplete'),
              );
            } else if (error.errorCode === 'INVALID_FORMAT') {
              toasts.errorToast(
                i18n.tc('errorMessages.preparation.invalidFormat'),
              );
            } else {
              toasts.errorToast(i18n.tc('common.somethingWentWrong'));
            }
          } else {
            toasts.errorToast(i18n.tc('common.somethingWentWrong'));
          }
          commit('loadingFinished');
          return Promise.reject();
        },
      );
  },
  editParliamentDetails({ commit, dispatch }, session) {
    commit('loading');
    return parliamentPreparationService.editParliamentDetails(session).then(
      () => {
        commit('loadingFinished');
        dispatch('parliamentManagement/loadSessions', null, { root: true });
        dispatch('membersManagement/loadMembers', {}, { root: true });
      },
      (error) => {
        if (error.httpCode === 404 && error.errorCode === 'NO_SESSION') {
          toasts.errorToast(i18n.tc('errorMessages.preparation.noSession'));
        } else {
          toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        }
        commit('loadingFinished');
        return Promise.reject();
      },
    );
  },
  getPasswordsList({ commit }, sessionId) {
    commit('loading');
    // TODO: Make the file autodownload
    return parliamentPreparationService.generatePasswords(sessionId).then(
      (response) => commit('passwordsFileLoaded', response),
      (error) => {
        if (error.httpCode === 412) {
          toasts.errorToast(
            i18n.tc('errorMessages.preparation.noUserFileLoaded'),
          );
        } else {
          toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        }
        commit('loadingFinished');
      },
    );
  },
  resetState({ commit }) {
    commit('resetState');
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
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: preparationState,
  actions,
  mutations,
};
