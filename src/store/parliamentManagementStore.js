import parliamentManagementService from '@/services/parliamentManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const parlaimentState = {
  isLoading: false,
  sessions: null,
  isActionPerforming: false,
};

function handleActionError(action, commit) {
  commit('stopAction');
  toasts.errorToast(i18n.tc(`validation.failedTo${action}Session`));
}

function handleAction({ commit, dispatch }, sessionId, action, actionName) {
  commit('actionPerforming');
  action(sessionId).then(
    () => dispatch('loadSessions'),
    () => {
      handleActionError(actionName, commit);
    },
  );
}

const actions = {
  async loadSessions({ commit }) {
    commit('loading');
    return parliamentManagementService.getSessionsList().then(
      (sessions) => commit('loadingSuccess', sessions),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
        commit('failed');
      },
    );
  },
  finishSession(args, sessionId) {
    handleAction(
      args,
      sessionId,
      parliamentManagementService.finishSession,
      'Finish',
    );
  },
  suspendSession(args, sessionId) {
    handleAction(
      args,
      sessionId,
      parliamentManagementService.suspendSession,
      'Suspend',
    );
  },
  startSession(args, sessionId) {
    handleAction(
      args,
      sessionId,
      parliamentManagementService.startSession,
      'Start',
    );
  },
  resumeSession(args, sessionId) {
    handleAction(
      args,
      sessionId,
      parliamentManagementService.resumeSession,
      'Resume',
    );
  },
  removeSession(args, sessionId) {
    handleAction(
      args,
      sessionId,
      parliamentManagementService.removeSession,
      'Remove',
    );
  },
  downloadSession(args, sessionId) {
    // TODO: Make the file autodownload
    handleAction(
      args,
      sessionId,
      parliamentManagementService.downloadSession,
      'Download',
    );
  },
  uploadSession(args, sessionFile) {
    handleAction(
      args,
      sessionFile,
      parliamentManagementService.uploadSession,
      'Upload',
    );
  },
  changeActiveSession({ dispatch }, sessionId) {
    parliamentManagementService.setActiveSession(sessionId).then(
      () => dispatch('loadSessions'),
      () => {
        toasts.errorToast(i18n.tc('common.somethingWentWrong'));
      },
    );
  },
};

/* eslint-disable no-param-reassign */
const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  actionPerforming(state) {
    state.isActionPerforming = true;
  },
  stopAction(state) {
    state.isActionPerforming = false;
  },
  loadingSuccess(state, sessions) {
    state.isLoading = false;
    state.sessions = sessions;
    state.isActionPerforming = false;
  },
  failed(state) {
    state.isLoading = false;
    state.sessions = null;
    state.isActionPerforming = false;
  },
};
/* eslint-enable no-param-reassign */

export default {
  namespaced: true,
  state: parlaimentState,
  actions,
  mutations,
  getters: {
    activeSession(state) {
      if (!state.sessions || state.sessions == null) {
        return null;
      }
      const active = state.sessions.filter((session) => session.isActive);

      return active.length > 0 ? active[0] : null;
    },
  },
};
