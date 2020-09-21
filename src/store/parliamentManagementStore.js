import parliamentManagementService from '@/services/parliamentManagementService';
import toasts from '@/utils/toasts';
import i18n from '../i18n';

const getDefaultState = () => ({
  isLoading: false,
  sessions: null,
  isActionPerforming: false,
});

const parlaimentState = getDefaultState();

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
    } else if (error.errorCode === 'BEFORE_VOTING') {
      toasts.errorToast(
        i18n.tc('errorMessages.parliamentManagement.notBeforeVoting'),
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
  } else if (error.httpCode === 437 && error.errorCode === 'IN_PROGRESS') {
    toasts.errorToast(
      i18n.tc('errorMessages.parliamentManagement.alreadyOneInProgress'),
    );
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
      if (
        actionName === 'Ready' ||
        actionName === 'Start' ||
        actionName === 'Resume'
      ) {
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
  readySession(args, sessionId) {
    handleAction(args, sessionId, parliamentManagementService.readySession, 'Ready');
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
  downloadSession(args, downloadArgs) {
    handleAction(
      args,
      downloadArgs,
      parliamentManagementService.downloadSession,
      'Download',
    );
  },
  uploadSession(args, uploadArgs) {
    handleAction(
      args,
      uploadArgs,
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
  resetState({ commit }) {
    commit('resetState');
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
  resetState(state) {
    Object.assign(state, getDefaultState());
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
