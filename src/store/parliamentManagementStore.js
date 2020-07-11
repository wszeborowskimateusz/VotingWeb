import parliamentManagementService from '@/services/parliamentManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const parlaimentState = { isLoading: false, sessions: null };

const actions = {
  loadSessions({ commit }) {
    commit('loading');
    parliamentManagementService.getSessionsList().then(
      (sessions) => commit('loadingSuccess', sessions),
      (error) => {
        toasts.errorToast(`${error}. ${i18n.tc('common.tryAgain')}`);
        commit('failed');
      },
    );
  },
  finishSession({ dispatch }) {
    // TODO: Maybe move user to some sessions list screen ?
    parliamentManagementService.finishSession().then(
      () => dispatch('loadSessions'),
      (error) => {
        toasts.errorToast(`${error}. ${i18n.tc('common.tryAgain')}`);
      },
    );
  },
  suspendSession({ dispatch }) {
    // TODO: Maybe move user to some sessions list screen ?
    parliamentManagementService.suspendSession().then(
      () => dispatch('loadSessions'),
      (error) => {
        toasts.errorToast(`${error}. ${i18n.tc('common.tryAgain')}`);
      },
    );
  },
  changeActiveSession({ dispatch }, sessionId) {
    // TODO: Maybe move user to some sessions list screen ?
    parliamentManagementService.setActiveSession(sessionId).then(
      () => dispatch('loadSessions'),
      (error) => {
        toasts.errorToast(`${error}. ${i18n.tc('common.tryAgain')}`);
      },
    );
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  loadingSuccess(state, sessions) {
    state.isLoading = false;
    state.sessions = sessions;
  },
  failed(state) {
    state.isLoading = false;
    state.sessions = null;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: parlaimentState,
  actions,
  mutations,
  getters: {
    activeSession() {
      return {
        name: 'Sesja testowa',
        date: Date.now(),
        place: 'Bieszkowice',
        electionLead: 'Mikołaj Peszko',
        status: 'IN_PROGRESS',
      };
      //   if (!state.sessions) {
      //     return null;
      //   }
      //   const active = state.sessions.filter((session) => session.isActive);

      //   return active.length > 0 ? active[0] : null;
    },
  },
};
