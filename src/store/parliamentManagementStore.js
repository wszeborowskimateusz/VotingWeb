import parliamentManagementService from '@/services/parliamentManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const parlaimentState = {
  isLoading: false,
  sessions: null,
  isActionPerforming: false,
};

function handleActionError(action, commit, error) {
  if (error.httpCode === 404 && error.errorCode === 'NO_SESSION') {
    toasts.errorToast(i18n.tc('errorMessages.parliamentManagement.noSession'));
  } else if (error.httpCode === 435) {
    if (error.errorCode === 'IN_PROGRESS') {
      toasts.errorToast(
        i18n.tc('errorMessages.parliamentManagement.notInProgress'),
      );
    } else if (error.errorCode === 'IN_PREPARATION') {
      toasts.errorToast(
        i18n.tc('errorMessages.parliamentManagement.notInPreparation'),
      );
    } else if (error.errorCode === 'SUSPENDED') {
      toasts.errorToast(
        i18n.tc('errorMessages.parliamentManagement.notSuspended'),
      );
    } else if (error.errorCode === 'FINISHED') {
      toasts.errorToast(
        i18n.tc('errorMessages.parliamentManagement.notFinished'),
      );
    }
  } else if (error.httpCode === 412) {
    toasts.errorToast(
      i18n.tc('errorMessages.parliamentManagement.fileValidation'),
    );
  } else {
    toasts.errorToast(i18n.tc(`validation.failedTo${action}Session`));
  }
  commit('stopAction');
}

function handleAction({ commit, dispatch }, sessionId, action, actionName) {
  commit('actionPerforming');
  action(sessionId).then(
    () => {
      if (actionName === 'Start' || actionName === 'Resume') {
        dispatch('changeActiveSession', sessionId);
      }
      dispatch('loadSessions');
    },
    (error) => {
      handleActionError(actionName, commit, error);
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
